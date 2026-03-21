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
    imageUrl: '/Images/3bcb241c76e32c3289b6fc71a4b5baa8.jpg',
    gallery: ['/Images/living-room-1.jpg', '/Images/living-room-2.jpg', '/Images/living-room-3.jpg']
  },
  {
    id: '2',
    title: { sr: 'Rustična Kuhinja', en: 'Rustic Kitchen' },
    description: { sr: 'Detalji od kamena koji se savršeno uklapaju sa modernim kuhinjskim elementima.', en: 'Stone details that blend perfectly with modern kitchen elements.' },
    category: 'enterijer',
    subcategory: { sr: 'Kuhinja', en: 'Kitchen' },
    imageUrl: '/Images/kitchen.jpg',
    gallery: ['/Images/kitchen-1.jpg', '/Images/kitchen-2.jpg']
  },
  {
    id: '3',
    title: { sr: 'Spa Kupatilo', en: 'Spa Bathroom' },
    description: { sr: 'Pretvorite vaše kupatilo u privatnu banju uz teksturu prirodnog kamena.', en: 'Turn your bathroom into a private spa with natural stone texture.' },
    category: 'enterijer',
    subcategory: { sr: 'Kupatilo', en: 'Bathroom' },
    imageUrl: '/Images/bathroom.jpg',
    gallery: ['/Images/bathroom-1.jpg', '/Images/bathroom-2.jpg']
  },
  {
    id: '4',
    title: { sr: 'Letnjikovac iz Snova', en: 'Dream Gazebo' },
    description: { sr: 'Eksterijer letnjikovca obložen veštačkim stenama za autentičan izgled.', en: 'Gazebo exterior lined with artificial rocks for an authentic look.' },
    category: 'eksterijer',
    subcategory: { sr: 'Letnjikovac', en: 'Gazebo' },
    imageUrl: '/Images/gazebo.jpg',
    gallery: ['/Images/gazebo-1.jpg', '/Images/gazebo-2.jpg', '/Images/gazebo-3.jpg']
  },
  {
    id: '5',
    title: { sr: 'Dekoracija Dvorišta', en: 'Garden Decoration' },
    description: { sr: 'Umetničke formacije stena koje oplemenjuju vaš vrt.', en: 'Artistic rock formations that enrich your garden.' },
    category: 'eksterijer',
    subcategory: { sr: 'Dvorište', en: 'Garden' },
    imageUrl: '/Images/garden.jpg',
    gallery: ['/Images/garden-1.jpg', '/Images/garden-2.jpg']
  },
  {
    id: '6',
    title: { sr: 'Fasada sa Karakterom', en: 'Facade with Character' },
    description: { sr: 'Dugotrajna i estetski superiorna rešenja za fasade vaših objekata.', en: 'Durable and aesthetically superior solutions for your building facades.' },
    category: 'eksterijer',
    subcategory: { sr: 'Fasada', en: 'Facade' },
    imageUrl: '/Images/facade.jpg',
    gallery: ['/Images/facade-1.jpg', '/Images/facade-2.jpg']
  }
];
