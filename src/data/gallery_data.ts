// Галерея реальных выполненных объектов компании «Окна Центр»
export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'windows' | 'balconies' | 'finishing' | 'facades' | 'repairs' | 'materials';
  location: string;
}

export const galleryCategories = [
  { id: 'all', label: 'Все работы' },
  { id: 'windows', label: 'Пластиковые окна' },
  { id: 'balconies', label: 'Балконы и лоджии' },
  { id: 'finishing', label: 'Отделка и утепление' },
  { id: 'facades', label: 'Алюминий и фасады' },
  { id: 'repairs', label: 'Ремонт окон' },
  { id: 'materials', label: 'Материалы' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    "id": "full_PRpT44QF",
    "src": "/images/legacy/full_PRpT44QF.png",
    "title": "Утепление и внутренняя отделка лоджии во Владивостоке — компания «Окна Центр»",
    "category": "finishing",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_ewAHqpCF",
    "src": "/images/legacy/full_ewAHqpCF.jpg",
    "title": "Продажа и доставка окон без установки.",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "Ns8vYDcL",
    "src": "/images/legacy/Ns8vYDcL.jpg",
    "title": "Установка окон ,остекление лоджий и балконов",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_7sqeCo56",
    "src": "/images/legacy/full_7sqeCo56.jpg",
    "title": "Окна под дерево(ламинированые)",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "Al2fspIs",
    "src": "/images/legacy/Al2fspIs.jpg",
    "title": "Алюминиевые окна",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "62a6b0f7601b893511e85b92207d2237",
    "src": "/images/legacy/62a6b0f7601b893511e85b92207d2237.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "bb29ad933dc6eaae626635edcf31d0a3",
    "src": "/images/legacy/bb29ad933dc6eaae626635edcf31d0a3.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "5d62a55290edb5a644e685a8eff0b6a0",
    "src": "/images/legacy/5d62a55290edb5a644e685a8eff0b6a0.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "6ee31abf7022c6bd8a05b535a0fdbceb",
    "src": "/images/legacy/6ee31abf7022c6bd8a05b535a0fdbceb.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "5e955f858dcac7bd4ac1fcf5fb28dc96",
    "src": "/images/legacy/5e955f858dcac7bd4ac1fcf5fb28dc96.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "670d18c69dd29e4036c09b9e6de54e25",
    "src": "/images/legacy/670d18c69dd29e4036c09b9e6de54e25.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "07b0dc69dcbda8a26d09c747cc2eb8c1",
    "src": "/images/legacy/07b0dc69dcbda8a26d09c747cc2eb8c1.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "99dbfc657bbb2cc5d99b82775283034b",
    "src": "/images/legacy/99dbfc657bbb2cc5d99b82775283034b.png",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "ba1f999e3924015f317561925f062d84",
    "src": "/images/legacy/ba1f999e3924015f317561925f062d84.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "fcb89289c37f743430c7df17674a69db",
    "src": "/images/legacy/fcb89289c37f743430c7df17674a69db.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_LNbRAzwr",
    "src": "/images/legacy/full_LNbRAzwr.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "9d37462bb826eb4e978ecb443d6931a8",
    "src": "/images/legacy/9d37462bb826eb4e978ecb443d6931a8.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "deb568c8c0de700a839625e9d21a1dac",
    "src": "/images/legacy/deb568c8c0de700a839625e9d21a1dac.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "4e9864818496da13fc2a00f80cab08d5",
    "src": "/images/legacy/4e9864818496da13fc2a00f80cab08d5.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "29a6764291109061736d7bdc6e7f721d",
    "src": "/images/legacy/29a6764291109061736d7bdc6e7f721d.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_6l64jnEm",
    "src": "/images/legacy/full_6l64jnEm.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_Bx5dmJ34",
    "src": "/images/legacy/full_Bx5dmJ34.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_tGXkptbc",
    "src": "/images/legacy/full_tGXkptbc.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "1250b8bf7ed7358b942278719faab6d5",
    "src": "/images/legacy/1250b8bf7ed7358b942278719faab6d5.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "909824d3674fec397df45f352efcd27a",
    "src": "/images/legacy/909824d3674fec397df45f352efcd27a.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "847c7f1f106f69c5bc24465f9b20bef3",
    "src": "/images/legacy/847c7f1f106f69c5bc24465f9b20bef3.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "b100bb11e3db0f0f4c3bdfe2d1ac9a08",
    "src": "/images/legacy/b100bb11e3db0f0f4c3bdfe2d1ac9a08.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "fbe2f688a51def14d6a7f620bfa8480f",
    "src": "/images/legacy/fbe2f688a51def14d6a7f620bfa8480f.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "465abbe7c70345d3a9baf7cc758f2ad9",
    "src": "/images/legacy/465abbe7c70345d3a9baf7cc758f2ad9.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "7572a65a5821c2fc33ca30a7abf94824",
    "src": "/images/legacy/7572a65a5821c2fc33ca30a7abf94824.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "fa88e5ce2640e3d853524a7973ba151a",
    "src": "/images/legacy/fa88e5ce2640e3d853524a7973ba151a.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "3d8fb82694b5c96b3091bed0a9e05b60",
    "src": "/images/legacy/3d8fb82694b5c96b3091bed0a9e05b60.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "5b4bcb9b6fed188c26eb07b00198edc6",
    "src": "/images/legacy/5b4bcb9b6fed188c26eb07b00198edc6.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "a1cc92771b8211de061c1034906b88fc",
    "src": "/images/legacy/a1cc92771b8211de061c1034906b88fc.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "7dba6f0be5058fae4ae8bb0f43b6aa67",
    "src": "/images/legacy/7dba6f0be5058fae4ae8bb0f43b6aa67.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "8a5eaf9e54230a487b7b6d054d07a6f0",
    "src": "/images/legacy/8a5eaf9e54230a487b7b6d054d07a6f0.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "bc27c75e17dbf6fddfca54aa15041ac3",
    "src": "/images/legacy/bc27c75e17dbf6fddfca54aa15041ac3.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "4584baf08d4d0c3367ff109454676224",
    "src": "/images/legacy/4584baf08d4d0c3367ff109454676224.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "478c0dc97e37141614c8a0796b88c17b",
    "src": "/images/legacy/478c0dc97e37141614c8a0796b88c17b.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "1dfc145b98c74e9896680cc9ec397d6b",
    "src": "/images/legacy/1dfc145b98c74e9896680cc9ec397d6b.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "c3a84d78bc8efa995a25b97481f9e47a",
    "src": "/images/legacy/c3a84d78bc8efa995a25b97481f9e47a.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "e81f4bb067a78cd9738aa774363538ae",
    "src": "/images/legacy/e81f4bb067a78cd9738aa774363538ae.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "2a64735301341e2bcc1ff10380187519",
    "src": "/images/legacy/2a64735301341e2bcc1ff10380187519.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "68140a2c3eb8c772fc55fb4063e6886f",
    "src": "/images/legacy/68140a2c3eb8c772fc55fb4063e6886f.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "5c2fb27469d1b06fc8d7e96a296e945b",
    "src": "/images/legacy/5c2fb27469d1b06fc8d7e96a296e945b.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "fcffed1f7890bdef6255edf48204a41e",
    "src": "/images/legacy/fcffed1f7890bdef6255edf48204a41e.jpg",
    "title": "Отделочные фасадные материалы во Владивостоке — компания «Окна Центр»",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "b6863894b0fe7c7f6b123b378d29d52c",
    "src": "/images/legacy/b6863894b0fe7c7f6b123b378d29d52c.jpg",
    "title": "Пенопласт ПСБС                             Является современным утеплителем, кот",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "710981c6630ca8d729836b82b170bf83",
    "src": "/images/legacy/710981c6630ca8d729836b82b170bf83.jpg",
    "title": "Изопинк                               Плиты изопинк обладают низким коэффициенто",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "cd9d9ac1c0340f5d631f5252da08fa25",
    "src": "/images/legacy/cd9d9ac1c0340f5d631f5252da08fa25.jpg",
    "title": "Наверное, все знают, что такое минеральная вата – это утеплитель, основой которо",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "e272318b06818f3f256dc301912ed027",
    "src": "/images/legacy/e272318b06818f3f256dc301912ed027.jpg",
    "title": "Панели мдф                                                   ­Словосочетание МДФ",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "49d6fda5234f00ba8013574d4c808d06",
    "src": "/images/legacy/49d6fda5234f00ba8013574d4c808d06.jpg",
    "title": "Пластиковые панели ПВХ – отличный материал для отделки стен и потолков. Основные",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "ef03b9561fddcafaf4657793ca76d6f0",
    "src": "/images/legacy/ef03b9561fddcafaf4657793ca76d6f0.jpg",
    "title": "­Виниловый (пластиковый) сайдинг – представляет собой панель из ПВХ, основное на",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "e2a1410ba6597ca740d16822a98d1bd4",
    "src": "/images/legacy/e2a1410ba6597ca740d16822a98d1bd4.jpg",
    "title": "Фасадные композитные облицовочные панели торговой марки \"ханьи\" представляют соб",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "36c9e0b66c561160ca46ea78ed441f28",
    "src": "/images/legacy/36c9e0b66c561160ca46ea78ed441f28.jpg",
    "title": "Отделочные фасадные материалы во Владивостоке — компания «Окна Центр»",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "35218ffa5e344962ba98662a961efbcb",
    "src": "/images/legacy/35218ffa5e344962ba98662a961efbcb.png",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "db7eeb03b34b1d5a8cb1d52243b0e21f",
    "src": "/images/legacy/db7eeb03b34b1d5a8cb1d52243b0e21f.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "0750ae929d693ff1338e75ba5bb3a0c7",
    "src": "/images/legacy/0750ae929d693ff1338e75ba5bb3a0c7.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "47c6748fcff7594469286ac152d35f29",
    "src": "/images/legacy/47c6748fcff7594469286ac152d35f29.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "2548e887046d383917d5f9257db03de7",
    "src": "/images/legacy/2548e887046d383917d5f9257db03de7.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "825326a09165343c1dd3be3f2b6ec387",
    "src": "/images/legacy/825326a09165343c1dd3be3f2b6ec387.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "e5962becc20e99773c441e7d9e904a49",
    "src": "/images/legacy/e5962becc20e99773c441e7d9e904a49.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "62cc56ebf6c72a8af6fffba45d4eb408",
    "src": "/images/legacy/62cc56ebf6c72a8af6fffba45d4eb408.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "a520945140f656caf5c8752cb9a70e02",
    "src": "/images/legacy/a520945140f656caf5c8752cb9a70e02.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "caf2dfed6d7ecb13f86025d2639b7b9f",
    "src": "/images/legacy/caf2dfed6d7ecb13f86025d2639b7b9f.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "9016ec6d8113c6bbe3a412fc5ca8d248",
    "src": "/images/legacy/9016ec6d8113c6bbe3a412fc5ca8d248.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "9957144a8d5ea0d19caed4c9b07ec169",
    "src": "/images/legacy/9957144a8d5ea0d19caed4c9b07ec169.bmp",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "50d16a8beaaa9a96dcb481450f558129",
    "src": "/images/legacy/50d16a8beaaa9a96dcb481450f558129.bmp",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "d9d8b46482a9062cefce7f34f19f7e4c",
    "src": "/images/legacy/d9d8b46482a9062cefce7f34f19f7e4c.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "76a8fc6188eeb3ab4ffd8716840a897d",
    "src": "/images/legacy/76a8fc6188eeb3ab4ffd8716840a897d.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "bfc6e5150df44920b5b67fbc4411c1bb",
    "src": "/images/legacy/bfc6e5150df44920b5b67fbc4411c1bb.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "3f4d7f43e03ccec3c7ac05f930b3d171",
    "src": "/images/legacy/3f4d7f43e03ccec3c7ac05f930b3d171.png",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_O0EwUZQh",
    "src": "/images/legacy/full_O0EwUZQh.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_m9mZ1RW5",
    "src": "/images/legacy/full_m9mZ1RW5.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_YFiXhAvx",
    "src": "/images/legacy/full_YFiXhAvx.jpg",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_6tXcBN5Z",
    "src": "/images/legacy/full_6tXcBN5Z.png",
    "title": "Ремонт и обслуживание окон во Владивостоке — компания «Окна Центр»",
    "category": "repairs",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "aa09cc7e70d16cfdac3ec4e583b4b82c",
    "src": "/images/legacy/aa09cc7e70d16cfdac3ec4e583b4b82c.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "3c1480b5d86aee1ce6ab354a7d8578e7",
    "src": "/images/legacy/3c1480b5d86aee1ce6ab354a7d8578e7.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "902a3a762c9c5b0ff018c7d2a1724c8b",
    "src": "/images/legacy/902a3a762c9c5b0ff018c7d2a1724c8b.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "07b7f6dda749e74c8de3c56964a867c5",
    "src": "/images/legacy/07b7f6dda749e74c8de3c56964a867c5.jpg",
    "title": "Остекление балкона под ключ во Владивостоке — компания «Окна Центр»",
    "category": "balconies",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "f270d6f307895b915815537be47eacf2",
    "src": "/images/legacy/f270d6f307895b915815537be47eacf2.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "c44c7b20233a0758bccf76081caededd",
    "src": "/images/legacy/c44c7b20233a0758bccf76081caededd.png",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "4fa464e8acb40b581b6ce25f7ae2cbbc",
    "src": "/images/legacy/4fa464e8acb40b581b6ce25f7ae2cbbc.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "9bf786c0e60e99f3bfdffe86ecf1dc09",
    "src": "/images/legacy/9bf786c0e60e99f3bfdffe86ecf1dc09.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "24944a510b2fc9015cce8e90fe862a29",
    "src": "/images/legacy/24944a510b2fc9015cce8e90fe862a29.jpg",
    "title": "Утепление и внутренняя отделка лоджии во Владивостоке — компания «Окна Центр»",
    "category": "finishing",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "54a23164a3970dd0f09d0e561ea53674",
    "src": "/images/legacy/54a23164a3970dd0f09d0e561ea53674.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "cd2059016189486814b819afeee8fe3c",
    "src": "/images/legacy/cd2059016189486814b819afeee8fe3c.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "e2b3bb36e79c1f2c1599ede31a508e27",
    "src": "/images/legacy/e2b3bb36e79c1f2c1599ede31a508e27.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "c6eb11d211d27a72c608503a3d31636b",
    "src": "/images/legacy/c6eb11d211d27a72c608503a3d31636b.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "4ba37885cb51fd3f76c969ae74f75ed6",
    "src": "/images/legacy/4ba37885cb51fd3f76c969ae74f75ed6.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "e99a9e4ffa25406d9a8cad81d4b5beb3",
    "src": "/images/legacy/e99a9e4ffa25406d9a8cad81d4b5beb3.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_MvfdYNR5",
    "src": "/images/legacy/full_MvfdYNR5.jpg",
    "title": "Утепление и внутренняя отделка лоджии во Владивостоке — компания «Окна Центр»",
    "category": "finishing",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "c2f5538fc26b2cf2f4615bde2d239d64",
    "src": "/images/legacy/c2f5538fc26b2cf2f4615bde2d239d64.jpg",
    "title": "Утепление и внутренняя отделка лоджии во Владивостоке — компания «Окна Центр»",
    "category": "finishing",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_Zmez3ZYG",
    "src": "/images/legacy/full_Zmez3ZYG.jpg",
    "title": "Утепление и внутренняя отделка лоджии во Владивостоке — компания «Окна Центр»",
    "category": "finishing",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_dqNbEp3C",
    "src": "/images/legacy/full_dqNbEp3C.jpg",
    "title": "Утепление и внутренняя отделка лоджии во Владивостоке — компания «Окна Центр»",
    "category": "finishing",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "full_R2WWIKwY",
    "src": "/images/legacy/full_R2WWIKwY.jpg",
    "title": "Утепление и внутренняя отделка лоджии во Владивостоке — компания «Окна Центр»",
    "category": "finishing",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "da75041d222e6478c201139680297585",
    "src": "/images/legacy/da75041d222e6478c201139680297585.jpg",
    "title": "Отделочные фасадные материалы во Владивостоке — компания «Окна Центр»",
    "category": "materials",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "8dfab624d3be3abdf4bd567d33074e74",
    "src": "/images/legacy/8dfab624d3be3abdf4bd567d33074e74.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "9a0f1bcf4793bbba54ee52cfd2caaf37",
    "src": "/images/legacy/9a0f1bcf4793bbba54ee52cfd2caaf37.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "b7a611534eea789133edc565a9a83e9a",
    "src": "/images/legacy/b7a611534eea789133edc565a9a83e9a.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  },
  {
    "id": "e4c8f8f5e9d29ccea4e4cbef9097489d",
    "src": "/images/legacy/e4c8f8f5e9d29ccea4e4cbef9097489d.jpg",
    "title": "Пластиковые окна от производителя во Владивостоке — компания «Окна Центр»",
    "category": "windows",
    "location": "Владивосток / Приморский край"
  }
];
