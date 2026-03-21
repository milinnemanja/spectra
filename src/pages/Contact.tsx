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
    <section className="py-32 bg-white dark:bg-[#212121] text-primary dark:text-white min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-playfair mb-8">{t.title}</h2>
            <p className="text-xl opacity-70 dark:opacity-90 mb-12 font-spline max-w-lg">
              {t.description}
            </p>
            
            <div className="space-y-10">
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-white/20 transition-colors">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-50 dark:opacity-60 mb-1">{t.phone}</p>
                  <p className="text-2xl font-host">+381 63 14 54 081</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-white/20 transition-colors">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-50 dark:opacity-60 mb-1">{t.email}</p>
                  <p className="text-2xl font-host">nikolaspurgin17@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-white/20 transition-colors">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-50 dark:opacity-60 mb-1">{t.location}</p>
                  <p className="text-2xl font-host">{t.locValue}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 dark:bg-white/5 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm border border-primary/10 dark:border-white/10 shadow-xl dark:shadow-2xl"
          >
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest opacity-60 dark:opacity-70 font-host">{t.labelName}</label>
                  <input type="text" className="w-full bg-white dark:bg-white/10 border border-primary/20 dark:border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary dark:focus:border-white transition-colors text-primary dark:text-white" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest opacity-60 dark:opacity-70 font-host">{t.labelEmail}</label>
                  <input type="email" className="w-full bg-white dark:bg-white/10 border border-primary/20 dark:border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary dark:focus:border-white transition-colors text-primary dark:text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest opacity-60 dark:opacity-70 font-host">{t.labelType}</label>
                <select className="w-full bg-white dark:bg-white/10 border border-primary/20 dark:border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary dark:focus:border-white transition-colors appearance-none text-primary dark:text-white">
                  {t.types.map(type => (
                    <option key={type} className="bg-white dark:bg-[#212121]">{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest opacity-60 dark:opacity-70 font-host">{t.labelMessage}</label>
                <textarea rows={5} className="w-full bg-white dark:bg-white/10 border border-primary/20 dark:border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary dark:focus:border-white transition-colors resize-none text-primary dark:text-white"></textarea>
              </div>
              <button className="w-full py-5 bg-primary dark:bg-white text-white dark:text-primary rounded-2xl font-host uppercase tracking-widest hover:bg-primary/90 dark:hover:bg-opacity-90 transition-all font-bold shadow-lg">
                {t.btnSend}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
