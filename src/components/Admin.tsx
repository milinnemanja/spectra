import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Save, Trash2, Edit3, LogOut, Plus, Image as ImageIcon, X, Upload, Loader2 } from 'lucide-react';
import { Project, Category, PROJECTS } from '../types';

export const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({
    featuresImageUrl: '/Images/features.jpg',
    aboutImageUrl: '/Images/about.jpg',
    ownerImageUrl: '/Images/owner.jpg',
    logoImageUrl: ''
  });
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const settingsFeaturesRef = useRef<HTMLInputElement>(null);
  const settingsAboutRef = useRef<HTMLInputElement>(null);
  const settingsOwnerRef = useRef<HTMLInputElement>(null);
  const settingsLogoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedLogin = localStorage.getItem('admin_logged_in');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }

    const savedProjects = localStorage.getItem('spectra_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(PROJECTS);
    }

    const savedSettings = localStorage.getItem('spectra_settings');
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSeedData = () => {
    if (projects.length > 0) {
      if (!window.confirm('Baza već sadrži projekte. Da li želite da resetujete na početne podatke?')) return;
    }
    setIsSeeding(true);
    setTimeout(() => {
      const seededProjects = PROJECTS.map(p => ({
        ...p,
        imageUrl: `/Images/${p.id}.jpg`, // Slike se nalaze u /Images/ folderu
        gallery: p.gallery.map((_, i) => `/Images/${p.id}-${i}.jpg`),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      setProjects(seededProjects);
      localStorage.setItem('spectra_projects', JSON.stringify(seededProjects));
      setIsSeeding(false);
      alert('Početni podaci su uspešno dodati.');
    }, 500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'nemanja' && password === 'nemanja023') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_logged_in', 'true');
    } else {
      alert('Pogrešno korisničko ime ili lozinka.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged_in');
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // S obzirom da nemamo backend, slike moraju biti ručno dodate u /public/Images folder
      // Ovde samo vraćamo putanju do slike u tom folderu
      return `/Images/${file.name}`;
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Greška pri obradi slike.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      const url = await handleFileUpload(file);
      if (url) {
        setEditingProject({ ...editingProject, imageUrl: url });
      }
    }
  };

  const handleSettingsImageChange = async (e: React.ChangeEvent<HTMLInputElement> | null, field: string) => {
    if (!e) {
      const newSettings = { ...siteSettings, [field]: '' };
      setSiteSettings(newSettings);
      localStorage.setItem('spectra_settings', JSON.stringify(newSettings));
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      const url = await handleFileUpload(file);
      if (url) {
        const newSettings = { ...siteSettings, [field]: url };
        setSiteSettings(newSettings);
        localStorage.setItem('spectra_settings', JSON.stringify(newSettings));
      }
    }
  };

  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && editingProject) {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await handleFileUpload(files[i]);
        if (url) urls.push(url);
      }
      setEditingProject({ 
        ...editingProject, 
        gallery: [...(editingProject.gallery || []), ...urls] 
      });
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedProjects;
    if (editingProject.id) {
      // Update existing
      updatedProjects = projects.map(p => p.id === editingProject.id ? { ...p, ...editingProject, updatedAt: new Date().toISOString() } : p);
    } else {
      // Create new
      const newProject = {
        ...editingProject,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Project;
      updatedProjects = [newProject, ...projects];
    }

    setProjects(updatedProjects);
    localStorage.setItem('spectra_projects', JSON.stringify(updatedProjects));
    setEditingProject(null);
    alert('Projekat je uspešno sačuvan.');
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj projekat?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('spectra_projects', JSON.stringify(updatedProjects));
    }
  };

  const handleAddNew = () => {
    setEditingProject({
      title: { sr: '', en: '' },
      description: { sr: '', en: '' },
      category: 'enterijer',
      subcategory: { sr: '', en: '' },
      imageUrl: '',
      gallery: [],
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-muted-dark/20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-background p-8 rounded-3xl shadow-2xl border border-primary/10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-playfair font-bold">Admin Panel</h1>
            <p className="text-sm opacity-50 font-host uppercase tracking-widest mt-2">Prijavite se na sistem</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest opacity-60 font-host">Korisničko ime</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest opacity-60 font-host">Lozinka</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl font-host uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
            >
              Prijavi se
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-surface-light dark:bg-muted-dark/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-playfair mb-2">Admin Panel</h1>
            <p className="text-sm opacity-50 font-host uppercase tracking-widest">Dashboard (nemanja)</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-full font-host uppercase tracking-widest text-xs transition-all ${activeTab === 'projects' ? 'bg-primary text-white' : 'bg-background border border-primary/20 text-primary hover:bg-primary/10'}`}
            >
              Projekti
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 rounded-full font-host uppercase tracking-widest text-xs transition-all ${activeTab === 'settings' ? 'bg-primary text-white' : 'bg-background border border-primary/20 text-primary hover:bg-primary/10'}`}
            >
              Podešavanja Sajta
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 border border-red-500/20 text-red-500 rounded-full font-host uppercase tracking-widest text-xs hover:bg-red-500/10 transition-all"
            >
              <LogOut size={16} /> Odjavi se
            </button>
          </div>
        </div>

        {activeTab === 'projects' ? (
          <>
            <div className="flex justify-end mb-8 gap-4">
              <button 
                onClick={handleSeedData}
                disabled={isSeeding}
                className="flex items-center gap-2 px-6 py-3 border border-primary/20 text-primary rounded-full font-host uppercase tracking-widest text-xs hover:bg-primary/10 transition-all disabled:opacity-50"
              >
                {isSeeding ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />} 
                Resetuj Podatke
              </button>
              <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-host uppercase tracking-widest text-xs hover:bg-primary/90 transition-all"
              >
                <Plus size={16} /> Dodaj Novi
              </button>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  className="bg-background p-6 rounded-2xl border border-primary/10 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-all shadow-sm"
                >
                  <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-muted-dark/10">
                    <img 
                      src={project.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/200/200`; }}
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-host uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="text-[10px] bg-surface-light dark:bg-muted-dark px-2 py-1 rounded-full font-host uppercase tracking-widest opacity-60">
                        {project.subcategory.sr}
                      </span>
                    </div>
                    <h3 className="text-xl font-playfair mb-1">{project.title.sr}</h3>
                    <p className="text-sm opacity-50 font-spline line-clamp-1">{project.description.sr}</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setEditingProject(project)}
                      className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-background p-8 rounded-3xl border border-primary/10 shadow-sm">
              <h2 className="text-2xl font-playfair mb-8">Podešavanja Slika na Sajtu</h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Logo Image */}
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest opacity-60 font-host">Logo (Opciono - ako je prazno koristi se tekst)</label>
                  <div className="h-20 rounded-2xl overflow-hidden bg-muted-dark/10 border border-primary/10 relative group flex items-center justify-center">
                    {siteSettings.logoImageUrl ? (
                      <img src={siteSettings.logoImageUrl} className="h-full w-auto object-contain" alt="Logo" />
                    ) : (
                      <span className="text-primary font-lexend text-xl font-bold">SPECTRA</span>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => settingsLogoRef.current?.click()}
                        disabled={isUploading}
                        className="px-6 py-3 bg-white text-primary rounded-full font-host uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                      >
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        Promeni Logo
                      </button>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={settingsLogoRef} 
                    onChange={(e) => handleSettingsImageChange(e, 'logoImageUrl')} 
                    className="hidden" 
                    accept="image/*" 
                  />
                  {siteSettings.logoImageUrl && (
                    <button
                      onClick={() => handleSettingsImageChange(null as any, 'logoImageUrl')}
                      className="text-xs text-red-500 hover:underline uppercase tracking-widest font-host"
                    >
                      Ukloni Logo (Koristi Tekst)
                    </button>
                  )}
                </div>

                {/* Features Image */}
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest opacity-60 font-host">Slika u sekciji "Karakteristike" (Početna)</label>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-muted-dark/10 border border-primary/10 relative group">
                    <img src={siteSettings.featuresImageUrl} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => settingsFeaturesRef.current?.click()}
                        disabled={isUploading}
                        className="px-6 py-3 bg-white text-primary rounded-full font-host uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                      >
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        Promeni Sliku
                      </button>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={settingsFeaturesRef} 
                    onChange={(e) => handleSettingsImageChange(e, 'featuresImageUrl')} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>

                {/* About Image */}
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest opacity-60 font-host">Slika na stranici "O nama"</label>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-muted-dark/10 border border-primary/10 relative group">
                    <img src={siteSettings.aboutImageUrl} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => settingsAboutRef.current?.click()}
                        disabled={isUploading}
                        className="px-6 py-3 bg-white text-primary rounded-full font-host uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                      >
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        Promeni Sliku
                      </button>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={settingsAboutRef} 
                    onChange={(e) => handleSettingsImageChange(e, 'aboutImageUrl')} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>

                {/* Owner Image */}
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest opacity-60 font-host">Slika vlasnika (Stranica "O nama")</label>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-muted-dark/10 border border-primary/10 relative group">
                    <img src={siteSettings.ownerImageUrl} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => settingsOwnerRef.current?.click()}
                        disabled={isUploading}
                        className="px-6 py-3 bg-white text-primary rounded-full font-host uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                      >
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        Promeni Sliku
                      </button>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={settingsOwnerRef} 
                    onChange={(e) => handleSettingsImageChange(e, 'ownerImageUrl')} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isUploading && setEditingProject(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-background rounded-3xl shadow-2xl border border-primary/10 overflow-hidden"
            >
              <div className="p-6 border-b border-primary/10 flex justify-between items-center">
                <h2 className="text-2xl font-playfair">{editingProject.id ? 'Izmeni Projekat' : 'Dodaj Novi Projekat'}</h2>
                <button 
                  disabled={isUploading}
                  onClick={() => setEditingProject(null)} 
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors disabled:opacity-50"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSaveProject} className="p-8 overflow-y-auto max-h-[70vh]">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* SR Content */}
                  <div className="space-y-6">
                    <h4 className="text-xs uppercase tracking-widest text-primary font-bold border-b border-primary/10 pb-2">Srpski Jezik</h4>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Naslov (SR)</label>
                      <input 
                        type="text" 
                        required
                        value={editingProject.title?.sr}
                        onChange={(e) => setEditingProject({...editingProject, title: {...editingProject.title!, sr: e.target.value}})}
                        className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Podkategorija (SR)</label>
                      <input 
                        type="text" 
                        required
                        value={editingProject.subcategory?.sr}
                        onChange={(e) => setEditingProject({...editingProject, subcategory: {...editingProject.subcategory!, sr: e.target.value}})}
                        className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Opis (SR)</label>
                      <textarea 
                        rows={4}
                        required
                        value={editingProject.description?.sr}
                        onChange={(e) => setEditingProject({...editingProject, description: {...editingProject.description!, sr: e.target.value}})}
                        className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none" 
                      />
                    </div>
                  </div>

                  {/* EN Content */}
                  <div className="space-y-6">
                    <h4 className="text-xs uppercase tracking-widest text-primary font-bold border-b border-primary/10 pb-2">English Language</h4>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Title (EN)</label>
                      <input 
                        type="text" 
                        required
                        value={editingProject.title?.en}
                        onChange={(e) => setEditingProject({...editingProject, title: {...editingProject.title!, en: e.target.value}})}
                        className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Subcategory (EN)</label>
                      <input 
                        type="text" 
                        required
                        value={editingProject.subcategory?.en}
                        onChange={(e) => setEditingProject({...editingProject, subcategory: {...editingProject.subcategory!, en: e.target.value}})}
                        className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Description (EN)</label>
                      <textarea 
                        rows={4}
                        required
                        value={editingProject.description?.en}
                        onChange={(e) => setEditingProject({...editingProject, description: {...editingProject.description!, en: e.target.value}})}
                        className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none" 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-8 pt-8 border-t border-primary/10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Kategorija</label>
                      <select 
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({...editingProject, category: e.target.value as Category})}
                        className="w-full bg-surface-light dark:bg-muted-dark/50 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                      >
                        <option value="enterijer">Enterijer</option>
                        <option value="eksterijer">Eksterijer</option>
                      </select>
                    </div>
                    
                    {/* Main Image Upload */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Glavna Slika</label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted-dark/10 flex-shrink-0">
                          {editingProject.imageUrl ? (
                            <img src={editingProject.imageUrl} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-20"><ImageIcon size={24} /></div>
                          )}
                        </div>
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="flex-1 py-3 border-2 border-dashed border-primary/20 rounded-xl hover:border-primary/50 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-host disabled:opacity-50"
                        >
                          {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                          Otpremi Sliku
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleMainImageChange} 
                          className="hidden" 
                          accept="image/*" 
                        />
                      </div>
                    </div>

                    {/* Gallery Upload */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50 font-host">Galerija</label>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {editingProject.gallery?.map((url, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                            <img src={url} className="w-full h-full object-cover" alt="" />
                            <button 
                              type="button"
                              onClick={() => setEditingProject({...editingProject, gallery: editingProject.gallery?.filter((_, i) => i !== idx)})}
                              className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button 
                          type="button"
                          onClick={() => galleryInputRef.current?.click()}
                          disabled={isUploading}
                          className="aspect-square border-2 border-dashed border-primary/20 rounded-lg hover:border-primary/50 transition-all flex items-center justify-center text-primary/40 disabled:opacity-50"
                        >
                          {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={20} />}
                        </button>
                      </div>
                      <input 
                        type="file" 
                        ref={galleryInputRef} 
                        onChange={handleGalleryImagesChange} 
                        className="hidden" 
                        multiple 
                        accept="image/*" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <button 
                      disabled={isUploading}
                      className="w-full py-4 bg-primary text-white rounded-xl font-host uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                      Sačuvaj Projekat
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
