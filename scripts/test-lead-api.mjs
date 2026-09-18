import http from 'http';
import app from '../lead-api/src/server.mjs';

const TEST_PORT = 3099;
let server;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: TEST_PORT,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data ? Buffer.byteLength(data) : 0,
          ...headers,
        },
      },
      (res) => {
        let resData = '';
        res.on('data', (chunk) => (resData += chunk));
        res.on('end', () => {
          try {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: JSON.parse(resData),
            });
          } catch {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: resData,
            });
          }
        });
      }
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('--- STARTING COMPREHENSIVE LEAD API TEST SUITE ---');
  console.log('====================================================');
  let failures = 0;

  // Save original env & fetch
  const originalToken = process.env.TELEGRAM_BOT_TOKEN;
  const originalChatId = process.env.TELEGRAM_CHAT_ID;
  const originalFetch = globalThis.fetch;

  // Ensure clean unconfigured state initially
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;

  await new Promise((resolve) => {
    server = app.listen(TEST_PORT, '127.0.0.1', () => {
      console.log(`[TEST SERVER] Listening on http://127.0.0.1:${TEST_PORT}\n`);
      resolve();
    });
  });

  try {
    // ----------------------------------------------------
    // TEST 1: Health check (Unconfigured)
    // ----------------------------------------------------
    console.log('[TEST 1] GET /api/health (Unconfigured state)');
    const health1 = await request('GET', '/api/health');
    if (health1.status === 200 && health1.body.ok === true && health1.body.delivery === 'not_configured') {
      console.log('  ✓ PASSED: Correctly returned delivery: "not_configured"');
    } else {
      console.error('  ✗ FAILED: Expected ok: true, delivery: "not_configured", got:', health1);
      failures++;
    }

    // ----------------------------------------------------
    // TEST 2: POST /api/lead without Telegram configuration -> HTTP 503
    // ----------------------------------------------------
    console.log('\n[TEST 2] POST /api/lead (Unconfigured state -> HTTP 503)');
    const unconfLead = await request('POST', '/api/lead', {
      name: 'Иван Тестовый',
      phone: '+7 (994) 010-03-00',
      comment: 'Нужен замер балкона',
      source: 'Lighthouse / Automated Test',
    }, { 'x-forwarded-for': '192.168.1.10' });

    if (
      unconfLead.status === 503 &&
      unconfLead.body.ok === false &&
      unconfLead.body.delivered === false &&
      unconfLead.body.code === 'DELIVERY_NOT_CONFIGURED' &&
      unconfLead.body.requestId
    ) {
      console.log('  ✓ PASSED: Correctly rejected with HTTP 503 DELIVERY_NOT_CONFIGURED and delivered: false');
    } else {
      console.error('  ✗ FAILED: Expected 503 DELIVERY_NOT_CONFIGURED, got:', unconfLead);
      failures++;
    }

    // ----------------------------------------------------
    // TEST 3: Validation Error (Missing / Invalid phone) -> HTTP 400
    // ----------------------------------------------------
    console.log('\n[TEST 3] POST /api/lead (Invalid phone < 10 digits -> HTTP 400)');
    const invalidPhone = await request('POST', '/api/lead', {
      name: 'Спамер',
      phone: '12345',
    }, { 'x-forwarded-for': '192.168.1.11' });

    if (
      invalidPhone.status === 400 &&
      invalidPhone.body.ok === false &&
      invalidPhone.body.delivered === false &&
      invalidPhone.body.code === 'VALIDATION_ERROR'
    ) {
      console.log('  ✓ PASSED: Correctly rejected with HTTP 400 VALIDATION_ERROR');
    } else {
      console.error('  ✗ FAILED: Expected 400 VALIDATION_ERROR, got:', invalidPhone);
      failures++;
    }

    // ----------------------------------------------------
    // TEST 4: Honeypot Triggered -> HTTP 200, delivered: false, status: 'ignored'
    // ----------------------------------------------------
    console.log('\n[TEST 4] POST /api/lead (Honeypot filled -> HTTP 200 delivered: false)');
    const honeypotLead = await request('POST', '/api/lead', {
      name: 'Bot Spammer',
      phone: '+7 (999) 111-22-33',
      website: 'http://spam-site.com',
    }, { 'x-forwarded-for': '192.168.1.12' });

    if (
      honeypotLead.status === 200 &&
      honeypotLead.body.ok === true &&
      honeypotLead.body.delivered === false &&
      honeypotLead.body.status === 'ignored'
    ) {
      console.log('  ✓ PASSED: Honeypot correctly absorbed spambot with delivered: false');
    } else {
      console.error('  ✗ FAILED: Honeypot expected delivered: false, status: "ignored", got:', honeypotLead);
      failures++;
    }

    // ----------------------------------------------------
    // TEST 5: Rate Limiting behind reverse proxy (Trust Proxy)
    // ----------------------------------------------------
    console.log('\n[TEST 5] Rate limiting (5 requests allowed, 6th blocked with HTTP 429)');
    const rateLimitIp = '192.168.1.20';
    let hitRateLimit = false;

    for (let i = 1; i <= 6; i++) {
      const res = await request('POST', '/api/lead', {
        name: `Rate Tester ${i}`,
        phone: '+7 999 000-00-0' + i,
      }, { 'x-forwarded-for': rateLimitIp });

      if (i <= 5) {
        // Since Telegram is not configured, status is 503 (not 429)
        if (res.status !== 503) {
          console.error(`  ✗ Unexpected status on request ${i}: expected 503, got ${res.status}`);
          failures++;
        }
      } else {
        if (res.status === 429 && res.body.code === 'RATE_LIMITED' && res.body.delivered === false) {
          console.log('  ✓ PASSED: 6th request blocked with HTTP 429 RATE_LIMITED');
          hitRateLimit = true;
        } else {
          console.error('  ✗ FAILED: 6th request was not rate limited:', res);
          failures++;
        }
      }
    }

    if (!hitRateLimit) {
      failures++;
    }

    // ----------------------------------------------------
    // TEST 6: Reverse Proxy Client IP Isolation
    // ----------------------------------------------------
    console.log('\n[TEST 6] Reverse proxy client IP isolation (Different IP is NOT rate limited)');
    const differentIpRes = await request('POST', '/api/lead', {
      name: 'New Client',
      phone: '+7 999 777-88-99',
    }, { 'x-forwarded-for': '192.168.1.21' });

    if (differentIpRes.status === 503) {
      console.log('  ✓ PASSED: Different IP not affected by previous IP rate limit');
    } else {
      console.error('  ✗ FAILED: Different IP unexpectedly blocked or failed:', differentIpRes);
      failures++;
    }

    // ----------------------------------------------------
    // TEST 7: Mock Telegram Delivery SUCCESS -> HTTP 200, delivered: true
    // ----------------------------------------------------
    console.log('\n[TEST 7] Telegram Delivery SUCCESS (Mock -> HTTP 200 delivered: true)');
    process.env.TELEGRAM_BOT_TOKEN = 'mock_bot_token_12345';
    process.env.TELEGRAM_CHAT_ID = '-1001234567890';

    let interceptedUrl = null;
    let interceptedBody = null;

    globalThis.fetch = async (url, options) => {
      interceptedUrl = url;
      interceptedBody = JSON.parse(options.body);
      return {
        ok: true,
        status: 200,
        json: async () => ({
          ok: true,
          result: {
            message_id: 99401,
            chat: { id: -1001234567890 },
          },
        }),
      };
    };

    // Health check now configured
    const healthConfigured = await request('GET', '/api/health');
    if (healthConfigured.status === 200 && healthConfigured.body.delivery === 'telegram') {
      console.log('  ✓ PASSED: Health check reports delivery: "telegram"');
    } else {
      console.error('  ✗ FAILED: Health check failed to report telegram:', healthConfigured);
      failures++;
    }

    const successfulLead = await request('POST', '/api/lead', {
      name: 'Константин',
      phone: '+7 (994) 010-03-00',
      city: 'Владивосток',
      service: 'Остекление балкона',
      comment: 'С выносом и отделкой',
      calculatorData: {
        type: 'Балкон П-образный',
        profile: 'KBE 70мм',
        dimensions: '3000 x 1400',
        estimate: 'от 85 000 ₽',
      },
    }, { 'x-forwarded-for': '192.168.1.30' });

    if (
      successfulLead.status === 200 &&
      successfulLead.body.ok === true &&
      successfulLead.body.delivered === true &&
      successfulLead.body.messageId === 99401 &&
      successfulLead.body.requestId
    ) {
      console.log('  ✓ PASSED: Lead API returned HTTP 200 delivered: true with messageId: 99401');
      if (
        interceptedUrl.includes('mock_bot_token_12345') &&
        interceptedBody.chat_id === '-1001234567890' &&
        interceptedBody.text.includes('Константин') &&
        interceptedBody.text.includes('Остекление балкона')
      ) {
        console.log('  ✓ PASSED: Telegram message payload verified with proper fields');
      } else {
        console.error('  ✗ FAILED: Telegram message payload invalid:', interceptedBody);
        failures++;
      }
    } else {
      console.error('  ✗ FAILED: Expected 200 delivered: true, got:', successfulLead);
      failures++;
    }

    // ----------------------------------------------------
    // TEST 8: Mock Telegram API Error (Bad token / chat) -> HTTP 502
    // ----------------------------------------------------
    console.log('\n[TEST 8] Telegram API Error (Mock rejection -> HTTP 502 DELIVERY_FAILED)');
    globalThis.fetch = async () => {
      return {
        ok: false,
        status: 400,
        json: async () => ({
          ok: false,
          error_code: 400,
          description: 'Bad Request: chat not found',
        }),
      };
    };

    const telegramErrorLead = await request('POST', '/api/lead', {
      name: 'Тест Ошибки',
      phone: '+7 (994) 010-03-00',
    }, { 'x-forwarded-for': '192.168.1.31' });

    if (
      telegramErrorLead.status === 502 &&
      telegramErrorLead.body.ok === false &&
      telegramErrorLead.body.delivered === false &&
      telegramErrorLead.body.code === 'DELIVERY_FAILED'
    ) {
      console.log('  ✓ PASSED: Correctly returned HTTP 502 DELIVERY_FAILED when Telegram API rejects message');
    } else {
      console.error('  ✗ FAILED: Expected 502 DELIVERY_FAILED, got:', telegramErrorLead);
      failures++;
    }

    // ----------------------------------------------------
    // TEST 9: Mock Telegram Network Error (Fetch throws) -> HTTP 502
    // ----------------------------------------------------
    console.log('\n[TEST 9] Telegram Network Timeout / Socket Error -> HTTP 502 DELIVERY_FAILED');
    globalThis.fetch = async () => {
      throw new Error('connect ETIMEDOUT 149.154.167.220:443');
    };

    const networkErrorLead = await request('POST', '/api/lead', {
      name: 'Тест Таймаута',
      phone: '+7 (994) 010-03-00',
    }, { 'x-forwarded-for': '192.168.1.32' });

    if (
      networkErrorLead.status === 502 &&
      networkErrorLead.body.ok === false &&
      networkErrorLead.body.delivered === false &&
      networkErrorLead.body.code === 'DELIVERY_FAILED'
    ) {
      console.log('  ✓ PASSED: Correctly returned HTTP 502 DELIVERY_FAILED on network exception');
    } else {
      console.error('  ✗ FAILED: Expected 502 DELIVERY_FAILED on network failure, got:', networkErrorLead);
      failures++;
    }

    // ----------------------------------------------------
    // SUMMARY
    // ----------------------------------------------------
    console.log('\n====================================================');
    if (failures === 0) {
      console.log('🎉 ALL 9 LEAD API INTEGRATION TESTS PASSED (0 FAILURES)!');
      console.log('====================================================');
      process.exit(0);
    } else {
      console.error(`💥 ${failures} TEST(S) FAILED!`);
      console.log('====================================================');
      process.exit(1);
    }
  } catch (err) {
    console.error('Unexpected test exception:', err);
    process.exit(1);
  } finally {
    // Restore original env & fetch
    if (originalToken) process.env.TELEGRAM_BOT_TOKEN = originalToken;
    else delete process.env.TELEGRAM_BOT_TOKEN;
    if (originalChatId) process.env.TELEGRAM_CHAT_ID = originalChatId;
    else delete process.env.TELEGRAM_CHAT_ID;
    globalThis.fetch = originalFetch;

    server.close();
  }
}

runTests();
