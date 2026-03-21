import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Project, Language, PROJECTS } from '../types';

interface ProjectDetailProps {
  lang: Language;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ lang }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedProjects = localStorage.getItem('spectra_projects');
    const allProjects = savedProjects ? JSON.parse(savedProjects) : PROJECTS;
    const found = allProjects.find((p: Project) => p.id === id);
    if (found) {
      setProject(found);
    } else {
      navigate('/catalog');
    }
  }, [id, navigate]);

  if (!project) return null;

  const allImages = [project.imageUrl, ...(project.gallery || [])];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <section className="py-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/catalog')}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-host mb-12 hover:text-primary transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Nazad na Katalog
        </button>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block font-host">
              {project.subcategory[lang]}
            </span>
            <h1 className="text-4xl md:text-6xl font-playfair mb-8 leading-tight">
              {project.title[lang]}
            </h1>
            <p className="text-lg opacity-70 font-spline leading-relaxed mb-12">
              {project.description[lang]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl relative group"
          >
            <img
              src={project.imageUrl}
              alt={project.title[lang]}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/1200/900`;
              }}
            />
            <button 
              onClick={() => {
                setSelectedImage(project.imageUrl);
                setCurrentIndex(0);
              }}
              className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
            >
              <Maximize2 size={32} />
            </button>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {project.gallery?.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
              onClick={() => {
                setSelectedImage(img);
                setCurrentIndex(index + 1);
              }}
            >
              <img
                src={img}
                alt={`${project.title[lang]} gallery ${index}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}-${index}/800/800`;
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Maximize2 size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full aspect-[4/3] z-10"
            >
              <img
                src={allImages[currentIndex]}
                alt="Lightbox"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/lightbox/1200/900`;
                }}
              />
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
              >
                <X size={32} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/50 font-host text-xs tracking-widest">
                {currentIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
