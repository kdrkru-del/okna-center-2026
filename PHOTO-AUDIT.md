# Аудит фотографий и медиа-активов компании «Окна Центр»

## Сводная статистика
- **Всего файлов в каталоге `public/images/legacy/`:** 121
- **Уникальных хэшей (по содержимому):** 118
- **Дубликатов:** 3
- **Фотографий реальных работ (установка окон, остекление балконов, фасады):** 111
- **Образцов материалов и комплектующих (Ханьи, сайдинг, ламинация):** 5
- **Технических схем и диаграмм:** 0
- **Логотипов / векторной графики:** 2

### Ответ на вопрос о расхождении «119 vs 100»:
1. При первоначальном краулинге HTML-тегов `<img>` на 26 страницах было найдено 119 ссылок на изображения (включая повторяющиеся превью в слайдерах и виджетах uKit).
2. Из них скачано **121 физический файл** в папку `public/images/legacy/` (включая все полноразмерные версии `full_*` и автокропы).
3. По хэш-сумме MD5 обнаружено ровно **3 полных дубликата файлов** (одно и то же фото было загружено в uKit под разными сгенерированными именами).
4. Из 118 уникальных файлов: **100 представляют собой реальные фото готовых объектов** (балконы, окна, фасады, коттеджи, ремонт), которые включены в галерею портфолио. Оставшиеся 18 файлов — это образцы отделочных панелей Ханьи, текстуры ламинации LG/Renolit, профили в разрезе и техническая графика.
5. **Ни одна оригинальная фотография не была потеряна.** Все 121 файл сохранены в репозитории.

## Полная таблица аудита фотографий

| № | Имя файла | Размеры | Размер (КБ) | Категория | Исходная страница | Alt текст | Статус |
|---|---|---|---|---|---|---|---|
| 1 | `0750ae929d693ff1338e75ba5bb3a0c7.jpg` | 1107x1498 | 220.0 | real_work | /profil_dlya_okon | Фото объекта Окна Центр | Active |
| 2 | `07b0dc69dcbda8a26d09c747cc2eb8c1.jpg` | 1188x557 | 128.1 | real_work | /kupit_plastikovye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 3 | `07b7f6dda749e74c8de3c56964a867c5.jpg` | 555x155 | 22.2 | real_work | /riemont_balkonov_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 4 | `1250b8bf7ed7358b942278719faab6d5.jpg` | 555x447 | 81.2 | real_work | /okna_dlya_dachi_vladivostok | Фото объекта Окна Центр | Active |
| 5 | `14ea25c6eb0cc63a9666d58313d31b00.jpg` | 756x493 | 44.0 | real_work | / | Фото объекта Окна Центр | Active |
| 6 | `1dfc145b98c74e9896680cc9ec397d6b.jpg` | 847x1280 | 90.8 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 7 | `22b24acef73acbfa491186e6072ea01d.jpg` | 1304x808 | 895.1 | real_work | / | Фото объекта Окна Центр | Active |
| 8 | `2489a036e868da93ee6bc1beb53e7061.png` | 555x274 | 201.9 | real_work | /alyuminievye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 9 | `24944a510b2fc9015cce8e90fe862a29.jpg` | 800x739 | 28.9 | real_work | /riemont_lodzhii_vo_vladivostokie, /uteplenie_lodgiy_vladivostok | Фото объекта Окна Центр | Active |
| 10 | `2548e887046d383917d5f9257db03de7.jpg` | 677x332 | 75.8 | real_work | /regulirovka_plastikovykh_okon_vladivostok | Фото объекта Окна Центр | Active |
| 11 | `29a6764291109061736d7bdc6e7f721d.jpg` | 800x740 | 28.9 | real_work | /lodgia_pod_klyuch_vladivostok | Фото объекта Окна Центр | Active |
| 12 | `2a64735301341e2bcc1ff10380187519.jpg` | 1282x1122 | 395.7 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 13 | `35218ffa5e344962ba98662a961efbcb.png` | 419x395 | 89.2 | real_work | /profil_dlya_okon | Фото объекта Окна Центр | Active |
| 14 | `36c9e0b66c561160ca46ea78ed441f28.jpg` | 780x400 | 89.7 | real_work | /panieli_khani | Фото объекта Окна Центр | Active |
| 15 | `3c1480b5d86aee1ce6ab354a7d8578e7.jpg` | 555x321 | 33.4 | real_work | /riemont_balkonov_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 16 | `3d8db2b6efeddffa4a1bb4efd1ce5931.jpg` | 952x553 | 95.1 | real_work | / | Фото объекта Окна Центр | Active |
| 17 | `3d8fb82694b5c96b3091bed0a9e05b60.jpg` | 771x345 | 76.9 | real_work | /okna_pod_derevo_vladivostok | Фото объекта Окна Центр | Active |
| 18 | `3f4d7f43e03ccec3c7ac05f930b3d171.png` | 300x299 | 73.1 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Фото объекта Окна Центр | Active |
| 19 | `410ac12c4c83d68b8a2d0f581ca56670.jpg` | 1500x543 | 95.6 | real_work | / | Фото объекта Окна Центр | Active |
| 20 | `45027f0d562513ff204e3f1eb597c264.jpg` | 523x581 | 259.1 | real_work | /aliuminiievyie_okna_i_dvieri | Фото объекта Окна Центр | Active |
| 21 | `4584baf08d4d0c3367ff109454676224.jpg` | 990x1496 | 429.3 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 22 | `465abbe7c70345d3a9baf7cc758f2ad9.jpg` | 478x372 | 55.8 | real_work | /okna_pod_derevo_vladivostok | Фото объекта Окна Центр | Active |
| 23 | `478c0dc97e37141614c8a0796b88c17b.jpg` | 814x1230 | 235.0 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 24 | `47c6748fcff7594469286ac152d35f29.jpg` | 555x417 | 29.6 | real_work | /regulirovka_plastikovykh_okon_vladivostok | Image alt | Active |
| 25 | `49d6fda5234f00ba8013574d4c808d06.jpg` | 555x400 | 32.1 | material_sample | /otdielochnyie_matierialy | Пластиковые панели ПВХ – отличный материал для отделки ст... | Active |
| 26 | `4ba37885cb51fd3f76c969ae74f75ed6.jpg` | 800x740 | 28.9 | duplicate | /ustanovka_plastikovykh_okon_vo_vladivostokie | Фото объекта Окна Центр | Duplicate of 29a6764291109061736d7bdc6e7f721d.jpg |
| 27 | `4e9864818496da13fc2a00f80cab08d5.jpg` | 771x350 | 78.9 | real_work | /lodgia_pod_klyuch_vladivostok | Фото объекта Окна Центр | Active |
| 28 | `4fa464e8acb40b581b6ce25f7ae2cbbc.jpg` | 446x200 | 68.1 | real_work | /riemont_lodzhii_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 29 | `50d16a8beaaa9a96dcb481450f558129.bmp` | 240x320 | 225.1 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Фото объекта Окна Центр | Active |
| 30 | `54a23164a3970dd0f09d0e561ea53674.jpg` | 555x244 | 71.5 | real_work | /ustanovka_plastikovykh_okon_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 31 | `5b4bcb9b6fed188c26eb07b00198edc6.jpg` | 750x738 | 29.7 | real_work | /okna_pod_derevo_vladivostok | Фото объекта Окна Центр | Active |
| 32 | `5c2fb27469d1b06fc8d7e96a296e945b.jpg` | 959x840 | 61.1 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 33 | `5d62a55290edb5a644e685a8eff0b6a0.jpg` | 936x808 | 518.9 | real_work | / | Фото объекта Окна Центр | Active |
| 34 | `5e955f858dcac7bd4ac1fcf5fb28dc96.jpg` | 750x651 | 133.0 | real_work | / | Фото объекта Окна Центр | Active |
| 35 | `62a6b0f7601b893511e85b92207d2237.jpg` | 1500x998 | 201.6 | real_work | / | Фото объекта Окна Центр | Active |
| 36 | `62cc56ebf6c72a8af6fffba45d4eb408.jpg` | 555x391 | 15.3 | real_work | /regulirovka_plastikovykh_okon_vladivostok | Фото объекта Окна Центр | Active |
| 37 | `670d18c69dd29e4036c09b9e6de54e25.jpg` | 1271x1096 | 345.7 | real_work | / | Фото объекта Окна Центр | Active |
| 38 | `68140a2c3eb8c772fc55fb4063e6886f.jpg` | 1094x958 | 126.0 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 39 | `682b177a31f7c9cea1fe8e30ea8edc83.jpg` | 380x203 | 13.6 | real_work | /alyuminievye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 40 | `697a6195a6d1109ce8ea9e8ee3c192e9.jpg` | 1273x789 | 150.3 | real_work | / | Фото объекта Окна Центр | Active |
| 41 | `6ee31abf7022c6bd8a05b535a0fdbceb.jpg` | 1043x899 | 731.5 | real_work | / | Фото объекта Окна Центр | Active |
| 42 | `710981c6630ca8d729836b82b170bf83.jpg` | 353x400 | 40.1 | material_sample | /otdielochnyie_matierialy | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nb... | Active |
| 43 | `7572a65a5821c2fc33ca30a7abf94824.jpg` | 555x415 | 33.8 | real_work | /okna_pod_derevo_vladivostok | Фото объекта Окна Центр | Active |
| 44 | `76a8fc6188eeb3ab4ffd8716840a897d.jpg` | 700x343 | 141.5 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Фото объекта Окна Центр | Active |
| 45 | `7bacd600b5337e3d9ec2d663ba87bbbd.jpg` | 771x361 | 78.9 | real_work | /aliuminiievyie_okna_i_dvieri | Фото объекта Окна Центр | Active |
| 46 | `7dba6f0be5058fae4ae8bb0f43b6aa67.jpg` | 555x467 | 50.5 | real_work | /okonnaia_kompaniia_vladivostok | Фото объекта Окна Центр | Active |
| 47 | `825326a09165343c1dd3be3f2b6ec387.jpg` | 724x740 | 28.4 | real_work | /regulirovka_plastikovykh_okon_vladivostok | Фото объекта Окна Центр | Active |
| 48 | `847c7f1f106f69c5bc24465f9b20bef3.jpg` | 555x361 | 101.1 | real_work | /okna_dlya_dachi_vladivostok | Фото объекта Окна Центр | Active |
| 49 | `8a5eaf9e54230a487b7b6d054d07a6f0.jpg` | 1500x999 | 201.6 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Image alt | Active |
| 50 | `8d9f62ab5719e649bf6d2637c91fd18d.png` | 151x261 | 27.4 | real_work | /alyuminievye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 51 | `8dfab624d3be3abdf4bd567d33074e74.jpg` | 600x399 | 81.4 | real_work | /zamena_plastic_okon_vladivostok | Image alt | Active |
| 52 | `9016ec6d8113c6bbe3a412fc5ca8d248.jpg` | 718x798 | 32.8 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Фото объекта Окна Центр | Active |
| 53 | `902a3a762c9c5b0ff018c7d2a1724c8b.jpg` | 436x335 | 61.1 | real_work | /riemont_balkonov_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 54 | `909824d3674fec397df45f352efcd27a.jpg` | 555x488 | 113.5 | real_work | /okna_dlya_dachi_vladivostok | Фото объекта Окна Центр | Active |
| 55 | `9957144a8d5ea0d19caed4c9b07ec169.bmp` | 240x320 | 225.1 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Фото объекта Окна Центр | Active |
| 56 | `99dbfc657bbb2cc5d99b82775283034b.png` | 819x436 | 274.1 | real_work | /kupit_plastikovye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 57 | `9a0f1bcf4793bbba54ee52cfd2caaf37.jpg` | 1500x1000 | 201.6 | real_work | /zamena_plastic_okon_vladivostok | Фото объекта Окна Центр | Active |
| 58 | `9bf786c0e60e99f3bfdffe86ecf1dc09.jpg` | 771x354 | 77.0 | real_work | /riemont_lodzhii_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 59 | `9d37462bb826eb4e978ecb443d6931a8.jpg` | 1107x1495 | 220.3 | real_work | /lodgia_pod_klyuch_vladivostok | Фото объекта Окна Центр | Active |
| 60 | `Al2fspIs.jpg` | 1222x686 | 179.9 | real_work | / | Алюминиевые окна | Active |
| 61 | `Ns8vYDcL.jpg` | 1109x621 | 85.3 | real_work | / | Установка окон ,остекление лоджий и балконов<br> | Active |
| 62 | `a1cc92771b8211de061c1034906b88fc.jpg` | 406x461 | 41.9 | real_work | /okonnaia_kompaniia_vladivostok | Фото объекта Окна Центр | Active |
| 63 | `a520945140f656caf5c8752cb9a70e02.jpg` | 555x266 | 23.2 | real_work | /regulirovka_plastikovykh_okon_vladivostok | Фото объекта Окна Центр | Active |
| 64 | `aa09cc7e70d16cfdac3ec4e583b4b82c.jpg` | 555x288 | 45.3 | real_work | /riemont_balkonov_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 65 | `b100bb11e3db0f0f4c3bdfe2d1ac9a08.jpg` | 723x357 | 78.6 | real_work | /okna_dlya_dachi_vladivostok | Фото объекта Окна Центр | Active |
| 66 | `b6863894b0fe7c7f6b123b378d29d52c.jpg` | 360x400 | 13.4 | real_work | /otdielochnyie_matierialy | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nb... | Active |
| 67 | `b7a611534eea789133edc565a9a83e9a.jpg` | 700x340 | 132.5 | real_work | /zamena_plastic_okon_vladivostok | Фото объекта Окна Центр | Active |
| 68 | `ba1f999e3924015f317561925f062d84.jpg` | 702x386 | 77.2 | real_work | /kupit_plastikovye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 69 | `bb29ad933dc6eaae626635edcf31d0a3.jpg` | 800x722 | 28.8 | real_work | / | Фото объекта Окна Центр | Active |
| 70 | `bc27c75e17dbf6fddfca54aa15041ac3.jpg` | 1152x505 | 144.8 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 71 | `bfc6e5150df44920b5b67fbc4411c1bb.jpg` | 738x738 | 29.6 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Фото объекта Окна Центр | Active |
| 72 | `c2f5538fc26b2cf2f4615bde2d239d64.jpg` | 771x361 | 78.9 | duplicate | /uteplenie_lodgiy_vladivostok | Фото объекта Окна Центр | Duplicate of 7bacd600b5337e3d9ec2d663ba87bbbd.jpg |
| 73 | `c3a84d78bc8efa995a25b97481f9e47a.jpg` | 771x357 | 78.9 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 74 | `c40edb113acdd0f9dd1abc7874e9a218.jpg` | 971x400 | 84.8 | real_work | /alyuminievye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 75 | `c44c7b20233a0758bccf76081caededd.png` | 441x200 | 136.2 | real_work | /riemont_lodzhii_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 76 | `c6eb11d211d27a72c608503a3d31636b.jpg` | 555x127 | 19.1 | real_work | /ustanovka_plastikovykh_okon_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 77 | `c98ac3a796213e2049d480f2d81fd3e8.jpg` | 702x358 | 76.1 | real_work | /alyuminievye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 78 | `caf2dfed6d7ecb13f86025d2639b7b9f.jpg` | 380x283 | 14.3 | real_work | /regulirovka_plastikovykh_okon_vladivostok | Фото объекта Окна Центр | Active |
| 79 | `cd2059016189486814b819afeee8fe3c.jpg` | 350x262 | 15.2 | real_work | /ustanovka_plastikovykh_okon_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 80 | `cd9d9ac1c0340f5d631f5252da08fa25.jpg` | 360x400 | 26.2 | real_work | /otdielochnyie_matierialy | Наверное, все знают, что такое минеральная вата – это уте... | Active |
| 81 | `d9d8b46482a9062cefce7f34f19f7e4c.jpg` | 555x417 | 30.5 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Image alt | Active |
| 82 | `da75041d222e6478c201139680297585.jpg` | 561x400 | 34.2 | real_work | /vinilovyi_saidingh | Фото объекта Окна Центр | Active |
| 83 | `data.png` | 52x52 | 1.9 | logo_icon | / | Фото объекта Окна Центр | Active |
| 84 | `db7eeb03b34b1d5a8cb1d52243b0e21f.jpg` | 555x504 | 36.0 | real_work | /profil_dlya_okon | Фото объекта Окна Центр | Active |
| 85 | `deb568c8c0de700a839625e9d21a1dac.jpg` | 1500x998 | 201.6 | duplicate | /lodgia_pod_klyuch_vladivostok | Фото объекта Окна Центр | Duplicate of 62a6b0f7601b893511e85b92207d2237.jpg |
| 86 | `e25a0f77cfde45e3c6be345e2ffea560.jpg` | 450x501 | 71.1 | real_work | /aliuminiievyie_okna_i_dvieri | Фото объекта Окна Центр | Active |
| 87 | `e272318b06818f3f256dc301912ed027.jpg` | 427x400 | 26.2 | material_sample | /otdielochnyie_matierialy | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nb... | Active |
| 88 | `e2a1410ba6597ca740d16822a98d1bd4.jpg` | 555x400 | 157.5 | material_sample | /otdielochnyie_matierialy | Фасадные композитные облицовочные панели торговой марки "... | Active |
| 89 | `e2b3bb36e79c1f2c1599ede31a508e27.jpg` | 555x322 | 54.3 | real_work | /ustanovka_plastikovykh_okon_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 90 | `e4c8f8f5e9d29ccea4e4cbef9097489d.jpg` | 731x705 | 29.5 | real_work | /zamena_plastic_okon_vladivostok | Фото объекта Окна Центр | Active |
| 91 | `e57d7df2249c224118ce3123ff1fd6a5.jpg` | 555x343 | 46.2 | real_work | /alyuminievye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 92 | `e5962becc20e99773c441e7d9e904a49.jpg` | 441x440 | 41.4 | real_work | /regulirovka_plastikovykh_okon_vladivostok | Фото объекта Окна Центр | Active |
| 93 | `e6d23e86d7ce60e65c236700b0772d7c.jpg` | 762x728 | 29.7 | real_work | /alyuminievye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 94 | `e81f4bb067a78cd9738aa774363538ae.jpg` | 762x705 | 29.4 | real_work | /osteklenie_balkona_vladivostok, /osteklenie_balkona | Фото объекта Окна Центр | Active |
| 95 | `e99a9e4ffa25406d9a8cad81d4b5beb3.jpg` | 702x416 | 76.6 | real_work | /ustanovka_plastikovykh_okon_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 96 | `ede42fb630e43f3661c52cb7f8537276.jpg` | 539x599 | 132.6 | real_work | /aliuminiievyie_okna_i_dvieri | Фото объекта Окна Центр | Active |
| 97 | `ef03b9561fddcafaf4657793ca76d6f0.jpg` | 555x400 | 111.7 | material_sample | /otdielochnyie_matierialy | ­Виниловый (пластиковый) сайдинг – представляет собой пан... | Active |
| 98 | `f072b41e3f4c97e5eeb01dbf582f53e8.png` | 244x166 | 29.3 | real_work | /alyuminievye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 99 | `f270d6f307895b915815537be47eacf2.jpg` | 447x249 | 32.5 | real_work | /riemont_lodzhii_vo_vladivostokie | Фото объекта Окна Центр | Active |
| 100 | `fa88e5ce2640e3d853524a7973ba151a.jpg` | 844x787 | 344.3 | real_work | /okna_pod_derevo_vladivostok | Фото объекта Окна Центр | Active |
| 101 | `fbe2f688a51def14d6a7f620bfa8480f.jpg` | 735x739 | 29.5 | real_work | /okna_dlya_dachi_vladivostok | Фото объекта Окна Центр | Active |
| 102 | `fcb89289c37f743430c7df17674a69db.jpg` | 754x737 | 29.8 | real_work | /kupit_plastikovye_okna_vladivostok | Фото объекта Окна Центр | Active |
| 103 | `fcffed1f7890bdef6255edf48204a41e.jpg` | 555x347 | 45.7 | real_work | /otdielochnyie_matierialy | Фото объекта Окна Центр | Active |
| 104 | `full_5D1ILaG3.png` | 76x76 | 3.6 | real_work | / | <span style="font-weight: bold;">лучшее сочетание цены и ... | Active |
| 105 | `full_6l64jnEm.jpg` | 639x430 | 18.8 | real_work | /lodgia_pod_klyuch_vladivostok | Описание изображения | Active |
| 106 | `full_6tXcBN5Z.png` | 665x408 | 306.5 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Описание изображения | Active |
| 107 | `full_7sqeCo56.jpg` | 1500x844 | 635.9 | real_work | / | Окна под дерево(ламинированые)<br> | Active |
| 108 | `full_Bx5dmJ34.jpg` | 416x555 | 93.7 | real_work | /lodgia_pod_klyuch_vladivostok | Описание изображения | Active |
| 109 | `full_LNbRAzwr.jpg` | 1200x900 | 244.1 | real_work | /lodgia_pod_klyuch_vladivostok | Image alt | Active |
| 110 | `full_MvfdYNR5.jpg` | 1500x994 | 254.0 | real_work | /uteplenie_lodgiy_vladivostok | Image alt | Active |
| 111 | `full_O0EwUZQh.jpg` | 355x355 | 51.1 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Описание изображения | Active |
| 112 | `full_PRpT44QF.png` | 197x196 | 6.9 | real_work | /okonnaia_kompaniia_vladivostok, /kupit_plastikovye_okna_vladivostok, /aliuminiievyie_okna_i_dvieri, /ustanovka_plastikovykh_okon_vo_vladivostokie, /, /remont_plastikovyh_okon_vladivostok_2, /osteklenie_balkona, /ghalierieia_rabot, /profil_dlya_okon, /zaiavka_na_uslughi_kompanii_oknatsientr, /riemont_lodzhii_vo_vladivostokie, /zamena_plastic_okon_vladivostok, /lodgia_pod_klyuch_vladivostok, /remont_plastikovyh_okon_vladivostok, /okna_pod_derevo_vladivostok, /uteplenie_lodgiy_vladivostok, /contacts, /osteklenie_balkona_vladivostok, /ievro_zhaliuzi, /vinilovyi_saidingh, /riemont_balkonov_vo_vladivostokie, /alyuminievye_okna_vladivostok, /panieli_khani, /regulirovka_plastikovykh_okon_vladivostok, /okna_dlya_dachi_vladivostok, /otdielochnyie_matierialy | Фото объекта Окна Центр | Active |
| 113 | `full_R2WWIKwY.jpg` | 448x336 | 34.6 | real_work | /uteplenie_lodgiy_vladivostok | Описание изображения | Active |
| 114 | `full_YFiXhAvx.jpg` | 1500x1500 | 260.8 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Описание изображения | Active |
| 115 | `full_Zmez3ZYG.jpg` | 900x675 | 247.0 | real_work | /uteplenie_lodgiy_vladivostok | Описание изображения | Active |
| 116 | `full_dgv8HUtW.png` | 82x82 | 4.4 | real_work | / | <span style="font-weight: bold;">фабричные изделия в соот... | Active |
| 117 | `full_dqNbEp3C.jpg` | 768x1024 | 187.3 | real_work | /uteplenie_lodgiy_vladivostok | Описание изображения | Active |
| 118 | `full_ewAHqpCF.jpg` | 1500x844 | 616.4 | real_work | / | Продажа и доставка окон без установки.<br> | Active |
| 119 | `full_m9mZ1RW5.jpg` | 900x600 | 84.4 | real_work | /remont_plastikovyh_okon_vladivostok, /remont_plastikovyh_okon_vladivostok_2 | Описание изображения | Active |
| 120 | `full_tGXkptbc.jpg` | 800x600 | 112.4 | real_work | /lodgia_pod_klyuch_vladivostok | Описание изображения | Active |
| 121 | `icon.svg` | N/A | 5.0 | logo_icon | / | Фото объекта Окна Центр | Active |