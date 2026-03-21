export type Language = 'sr' | 'en';
export type Category = 'enterijer' | 'eksterijer';

export interface Project {
  id: string;
  title: { sr: string; en: string };
  description: { sr: string; en: string };
  category: Category;
  subcategory: { sr: string; en: string };
  imageUrl: string;
  gallery: string[];
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: { sr: 'Moderni Dnevni Boravak', en: 'Modern Living Room' },
    description: { sr: 'Zid od veštačke stene u dnevnoj sobi koji pruža toplinu i luksuz.', en: 'Artificial stone wall in the living room providing warmth and luxury.' },
    category: 'enterijer',
    subcategory: { sr: 'Dnevna Soba', en: 'Living Room' },
    imageUrl: '/Images/dnevnamain.png',
    gallery: ['/Images/dnevna1.jpg', '/Images/dnevna2.jpg', '/Images/dnevna3.jpg', '/Images/dnevna4.jpg']
  },
  {
    id: '2',
    title: { sr: 'Rustična Kuhinja', en: 'Rustic Kitchen' },
    description: { sr: 'Detalji od kamena koji se savršeno uklapaju sa modernim kuhinjskim elementima.', en: 'Stone details that blend perfectly with modern kitchen elements.' },
    category: 'enterijer',
    subcategory: { sr: 'Kuhinja', en: 'Kitchen' },
    imageUrl: '/Images/kuhinjamain.jpg',
    gallery: ['/Images/kuhinja1.jpg', '/Images/kuhinja2.jpg', '/Images/kuhinja3.jpg', '/Images/kuhinja4.jpg', '/Images/kuhinja6.jpg'  ]
  },
  {
    id: '3',
    title: { sr: 'Spa Kupatilo', en: 'Spa Bathroom' },
    description: { sr: 'Pretvorite vaše kupatilo u privatnu banju uz teksturu prirodnog kamena.', en: 'Turn your bathroom into a private spa with natural stone texture.' },
    category: 'enterijer',
    subcategory: { sr: 'Kupatilo', en: 'Bathroom' },
    imageUrl: '/Images/kupatilomain.jpg',
    gallery: ['/Images/kupatilo.png', '/Images/kupatilo1.jpg', '/Images/kupatilo2.jpg', '/Images/kupatilo4.jpg', '/Images/kupatilo3.jpg']
  },
  {
    id: '5',
    title: { sr: 'Dekoracija Dvorišta', en: 'Garden Decoration' },
    description: { sr: 'Umetničke formacije stena koje oplemenjuju vaš vrt.', en: 'Artistic rock formations that enrich your garden.' },
    category: 'eksterijer',
    subcategory: { sr: 'Dvorište', en: 'Garden' },
    imageUrl: '/Images/dvoristemain.jpg',
    gallery: ['/Images/dvoriste1.jpg', '/Images/dvoriste2.jpg', '/Images/dvoriste3.jpg', '/Images/dvoriste4.jpg', ]
  },
  {
    id: '6',
    title: { sr: 'Fasada sa Karakterom', en: 'Facade with Character' },
    description: { sr: 'Dugotrajna i estetski superiorna rešenja za fasade vaših objekata.', en: 'Durable and aesthetically superior solutions for your building facades.' },
    category: 'eksterijer',
    subcategory: { sr: 'Fasada', en: 'Facade' },
    imageUrl: '/Images/fasadamain.jpg',
    gallery: ['/Images/fasada1.jpg', '/Images/fasada2.jpg', '/Images/fasada3.jpg', '/Images/fasada4.jpg', '/Images/fasada5.jpg']
  }
];
