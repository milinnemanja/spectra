import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutProps {
  lang: Language;
  siteSettings: any;
}

export const About: React.FC<AboutProps> = ({ lang, siteSettings }) => {
  const t = translations[lang].about;

  return (
    <section className="py-32 bg-surface-light dark:bg-muted-dark/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-playfair mb-8">
              {t.title} <br />
              <span className="text-primary">{t.titleAccent}</span>
            </h2>
            <div className="space-y-6 text-lg opacity-80 font-spline">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-lexend text-primary mb-1">10+</h4>
                <p className="text-sm uppercase tracking-widest opacity-60">{t.statsExp}</p>
              </div>
              <div>
                <h4 className="text-4xl font-lexend text-primary mb-1">500+</h4>
                <p className="text-sm uppercase tracking-widest opacity-60">{t.statsProjects}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={siteSettings.aboutImageUrl} 
                alt="Work in progress"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl text-white hidden lg:block shadow-xl">
              <p className="font-host uppercase tracking-widest text-sm">{t.quality}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Owner Section */}
      <div className="max-w-7xl mx-auto px-4 mt-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={siteSettings.ownerImageUrl} 
                alt={t.owner.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/owner/600/800'; }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <span className="font-lexend text-primary text-xs uppercase tracking-[0.4em] mb-4 block">
              {t.owner.title}
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair mb-6 leading-tight">
              {t.owner.name}
            </h2>
            <p className="text-lg opacity-70 font-spline mb-10 leading-relaxed italic">
              "{t.owner.description}"
            </p>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-playfair text-primary">{t.owner.designTitle}</h3>
              <p className="text-lg opacity-70 font-spline leading-relaxed">
                {t.owner.designText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
