/**
 * Helper to resolve static asset paths both for production root deployment (окнацентр.рф)
 * and GitHub Pages preview deployment (/okna-center-2026).
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('data:')
  ) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
