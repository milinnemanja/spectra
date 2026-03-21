import * as React from 'react';
const { useState, useEffect } = React;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, Leaf, Shield, Zap, Wind, Home as HomeIcon, Layout, PenTool, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { ProjectDetail } from './components/ProjectDetail';
import { Admin } from './components/Admin';
import { About } from './pages/About';
import { Catalog } from './pages/Catalog';
import { Contact } from './pages/Contact';
import { Project, Language, PROJECTS } from './types';
import { translations } from './translations';

const Home = ({ lang, siteSettings }: { lang: Language, siteSettings: any }) => {
  const t = translations[lang];

  const featureIcons = [Leaf, Shield, Zap, Wind];
  const serviceIcons = [HomeIcon, Layout, PenTool, RefreshCw];

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-lexend text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
              {t.hero.subtitle}
            </span>
            <h1 className="text-6xl md:text-8xl font-playfair mb-6 leading-tight">
              {t.hero.title} <br />
              <span className="italic text-primary">{t.hero.titleAccent}</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-80 font-spline mb-10">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/catalog" 
                className="px-8 py-4 bg-primary text-white rounded-full font-host uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
              >
                {t.hero.ctaCatalog} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 border border-primary text-primary rounded-full font-host uppercase tracking-widest hover:bg-primary/10 transition-all"
              >
                {t.hero.ctaContact}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
        >
          <div className="w-px h-12 bg-primary mx-auto" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-lexend text-primary text-xs uppercase tracking-[0.4em] mb-4 block">
                {t.features.subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl font-playfair mb-6 leading-tight">
                {t.features.title}
              </h2>
              <p className="text-lg opacity-70 font-spline mb-10 leading-relaxed">
                {t.features.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {t.features.items.map((item, index) => {
                  const Icon = featureIcons[index];
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-playfair text-xl mb-2">{item.title}</h3>
                        <p className="text-sm opacity-60 font-spline leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={siteSettings.featuresImageUrl} 
                alt="Rock Texture" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-lexend text-primary text-xs uppercase tracking-[0.4em] mb-4 block">
                {t.services.subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl font-playfair mb-6">
                {t.services.title}
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.services.items.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 bg-background rounded-3xl border border-primary/5 hover:border-primary/20 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-playfair text-2xl mb-4">{service.title}</h3>
                  <p className="opacity-60 font-spline leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('sr');
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [siteSettings, setSiteSettings] = useState<any>({
    featuresImageUrl: '/Images/features.jpg',
    aboutImageUrl: '/Images/about.jpg',
    ownerImageUrl: '/Images/owner.jpg',
    logoImageUrl: ''
  });
  const t = translations[lang];

  useEffect(() => {
    // Load local projects if they exist in localStorage
    const savedProjects = localStorage.getItem('spectra_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    const savedSettings = localStorage.getItem('spectra_settings');
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen selection:bg-primary selection:text-white">
        <ScrollToTop />
        <Navbar lang={lang} setLang={setLang} siteSettings={siteSettings} />

        <Routes>
          <Route path="/" element={<Home lang={lang} siteSettings={siteSettings} />} />
          <Route path="/about" element={<About lang={lang} siteSettings={siteSettings} />} />
          <Route path="/catalog" element={<Catalog lang={lang} projects={projects} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          <Route path="/project/:id" element={<ProjectDetail lang={lang} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        {/* Footer */}
        <footer className="py-12 bg-background border-t border-primary/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="font-lexend text-xl font-bold tracking-tighter text-primary">SPECTRA</span>
              </div>
              
              <div className="flex gap-8">
                <a href="#" className="opacity-60 hover:text-primary transition-colors"><Instagram size={20} /></a>
                <a href="#" className="opacity-60 hover:text-primary transition-colors"><Facebook size={20} /></a>
              </div>

              <p className="text-xs opacity-40 font-host uppercase tracking-widest">
                {t.footer.rights}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

