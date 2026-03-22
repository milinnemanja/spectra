import React from 'react';
import { motion } from 'motion/react';
import { Language, Project } from '../types';
import { translations } from '../translations';
import { ProjectCard } from '../components/ProjectCard';

interface CatalogProps {
  lang: Language;
  projects: Project[];
}

export const Catalog: React.FC<CatalogProps> = ({ lang, projects }) => {
  const t = translations[lang].catalog;

  const interiors = projects.filter(p => p.category === 'enterijer');
  const exteriors = projects.filter(p => p.category === 'eksterijer');

  return (
    <section className="py-32 min-h-screen bg-surface-light dark:bg-muted-dark/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-playfair mb-6">{t.title}</h2>
            <p className="max-w-2xl mx-auto opacity-60 text-lg font-spline">
              {t.description}
            </p>
          </motion.div>
        </div>

        {/* Interiors Section */}
        <div className="mb-32">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-12">
            <h3 className="text-3xl md:text-4xl font-playfair">{t.interior}</h3>
            <div className="h-px w-full bg-primary/10 hidden sm:block" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interiors.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </div>

        {/* Exteriors Section */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-12">
            <h3 className="text-3xl md:text-4xl font-playfair">{t.exterior}</h3>
            <div className="h-px w-full bg-primary/10 hidden sm:block" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exteriors.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
