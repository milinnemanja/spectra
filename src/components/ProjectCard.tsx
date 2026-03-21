import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../translations';

interface ProjectCardProps {
  project: Project;
  lang: Language;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, lang }) => {
  const t = translations[lang].catalog;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted-dark/10"
    >
      <img
        src={project.imageUrl}
        alt={project.title[lang]}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/800/1000`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block font-host">
          {project.subcategory[lang]}
        </span>
        <h3 className="text-2xl font-playfair text-white mb-4">
          {project.title[lang]}
        </h3>
        <Link
          to={`/project/${project.id}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white font-host hover:text-primary transition-colors"
        >
          {t.viewProject} <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};
