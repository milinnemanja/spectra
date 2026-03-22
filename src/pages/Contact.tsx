import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = translations[lang].contact;

  return (
    <section className="py-32 bg-background text-white min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-playfair mb-6 text-white">{t.title}</h2>
            <p className="text-lg opacity-90 mb-10 font-spline max-w-md text-white/80">
              {t.description}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-0.5 text-white/50">{t.phone}</p>
                  <p className="text-xl font-host text-white">{t.phoneValue}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-0.5 text-white/50">{t.email}</p>
                  <p className="text-xl font-host text-white">{t.emailValue}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-0.5 text-white/50">{t.location}</p>
                  <p className="text-xl font-host text-white">{t.locValue}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-70 font-host text-white/70">{t.labelName}</label>
                  <input type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-70 font-host text-white/70">{t.labelEmail}</label>
                  <input type="email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-70 font-host text-white/70">{t.labelType}</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none text-sm text-white">
                  {t.types.map(type => (
                    <option key={type} className="bg-[#1a1b19]">{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-70 font-host text-white/70">{t.labelMessage}</label>
                <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none text-sm text-white"></textarea>
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-host uppercase tracking-widest hover:bg-primary/90 transition-all text-sm font-bold shadow-lg">
                {t.btnSend}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
