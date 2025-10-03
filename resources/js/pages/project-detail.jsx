import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Share2, Download, ChevronLeft, ChevronRight, X, User, Building, Ruler, Clock, Award, Target, FileText, Instagram, Twitter, Linkedin } from "lucide-react"
import { Head, Link } from '@inertiajs/react';
import logo from "../../assets/images/A1.png"

export default function ProjectDetail({ project, relatedProjects = [] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)

    const allImages = [
        project.image_path,
        ...(project.gallery_images || [])
    ].filter(Boolean)

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }

    const openGallery = (index) => {
        setCurrentImageIndex(index)
        setIsGalleryOpen(true)
    }

    return (
        <>
            <Head title={`${project.title} - A1 atelier`} />
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-[#dadada] backdrop-blur-sm border-b border-gray-100 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <img src={logo}
                                        className='w-[55px] aspect-square object-cover'
                                        alt="" />
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-8">
                                    <Link href="/projects" className="text-black px-3 py-2 text-sm font-medium border-b-2 border-black">
                                        Projets
                                    </Link>
                                    <Link href="/about" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors">
                                        À propos
                                    </Link>
                                    <Link href="/contact" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors">
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>


                {/* Hero Image */}
                <section className="relative h-screen">
                    <img
                        src={project.image_path}
                        alt={project.title}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => openGallery(0)}
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-white">
                                <Badge
                                    variant="secondary"
                                    className="text-white border-white/30 mb-4 font-medium"
                                    style={{ backgroundColor: project.category?.color || '#a3845b' }}
                                >
                                    {project.category?.name || project.category || 'Sans catégorie'}
                                </Badge>
                                <h1 className="text-5xl md:text-7xl font-light mb-4 leading-tight">
                                    {project.title.split(" ").slice(0, -1).join(" ")}
                                    <span className="block font-bold">{project.title.split(" ").slice(-1)}</span>
                                </h1>
                                <div className="flex items-center text-white/80 text-lg mb-4">
                                    {project.location && (
                                        <>
                                            <MapPin className="h-5 w-5 mr-2" />
                                            <span>{project.location}</span>
                                            <span className="mx-4">•</span>
                                        </>
                                    )}
                                    {(project.start_year && project.end_year) || project.year ? (
                                        <>
                                            <Calendar className="h-5 w-5 mr-2" />
                                            {project.start_year && project.end_year ? (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-2xl font-bold tracking-wider">
                                                        {project.start_year}
                                                    </span>
                                                    <span>-</span>
                                                    <span className="text-2xl font-bold tracking-wider">
                                                        {project.end_year}
                                                    </span>
                                                </div>
                                            ) : project.year ? (
                                                <span>{project.year}</span>
                                            ) : null}
                                        </>
                                    ) : null}
                                </div>

                                {/* Achievement Status in header */}
                                {project.achievement_status && (
                                    <div className="text-white/90 text-sm font-medium tracking-wider mb-2">
                                        {project.achievement_status}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project Details */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl font-light mb-6 text-black">Aperçu du projet</h2>
                                <div className="prose prose-lg max-w-none">
                                    <div className="text-lg text-black leading-relaxed whitespace-pre-wrap">
                                        {project.description}
                                    </div>
                                </div>

                                {/* Project Specifications */}
                                <div className="mt-12">
                                    <h3 className="text-2xl font-light mb-6 text-black">Spécifications du projet</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {project.client && (
                                            <div className="flex items-start space-x-3">
                                                <User className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Client</h4>
                                                    <p className="text-black">{project.client}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.area && (
                                            <div className="flex items-start space-x-3">
                                                <Ruler className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Surface totale</h4>
                                                    <p className="text-black">{project.area}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.duration && (
                                            <div className="flex items-start space-x-3">
                                                <Clock className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Durée du projet</h4>
                                                    <p className="text-black">{project.duration}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.budget && (
                                            <div className="flex items-start space-x-3">
                                                <Target className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Fourchette budgétaire</h4>
                                                    <p className="text-black">{project.budget}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.team && (
                                            <div className="flex items-start space-x-3">
                                                <Building className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Équipe du projet</h4>
                                                    <p className="text-black">{project.team}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.awards && (
                                            <div className="flex items-start space-x-3">
                                                <Award className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Distinctions & récompenses</h4>
                                                    <p className="text-black">{project.awards}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Image Gallery */}
                                {allImages.length > 1 && (
                                    <div className="mt-12">
                                        <h3 className="text-2xl font-light mb-6 text-black">Galerie du projet</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {allImages.slice(1).map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`${project.title} - Image ${index + 2}`}
                                                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                                    onClick={() => openGallery(index + 1)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                                    <h3 className="text-xl font-semibold text-black mb-6">Informations du projet</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Catégorie</label>
                                            <Badge
                                                className="text-white font-medium"
                                                style={{ backgroundColor: project.category?.color || '#a3845b' }}
                                            >
                                                {project.category?.name || project.category || 'Sans catégorie'}
                                            </Badge>
                                        </div>

                                        {project.location && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Localisation</label>
                                                <p className="text-black">{project.location}</p>
                                            </div>
                                        )}

                                        {project.year && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Année</label>
                                                <p className="text-black">{project.year}</p>
                                            </div>
                                        )}

                                        {/* Project Timeline */}
                                        {(project.start_year || project.end_year) && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Période du projet</label>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-2xl font-bold text-black tracking-wider">
                                                        {project.start_year || '----'}
                                                    </span>
                                                    <span className="text-xl text-black">-</span>
                                                    <span className="text-2xl font-bold text-black tracking-wider">
                                                        {project.end_year || '----'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    {project.start_year && (
                                                        <div className="text-xs text-gray-600 tracking-widest">
                                                            {project.start_year.split('').join(' ')}
                                                        </div>
                                                    )}
                                                    {project.start_year && project.end_year && (
                                                        <span className="text-xs text-gray-600">-</span>
                                                    )}
                                                    {project.end_year && (
                                                        <div className="text-xs text-gray-600 tracking-widest">
                                                            {project.end_year.split('').join(' ')}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Achievement Status */}
                                        {project.achievement_status && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Statut d’achèvement</label>
                                                <div className="text-lg font-bold text-black tracking-wider">
                                                    {project.achievement_status}
                                                </div>
                                                <div className="text-xs text-gray-600 tracking-widest mt-1">
                                                    {project.achievement_status.split('').join(' ')}
                                                </div>
                                            </div>
                                        )}

                                        {/* Surface Area */}
                                        {project.surface_area && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Surface</label>
                                                <div className="text-lg font-bold text-black">
                                                    {project.surface_area}
                                                </div>
                                            </div>
                                        )}

                                        {/* Client */}
                                        {project.client_name && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Maîtrise d'Ouvrage</label>
                                                <div className="text-sm font-medium text-black">
                                                    {project.client_name}
                                                </div>
                                            </div>
                                        )}

                                        {/* Project Cost */}
                                        {project.project_cost && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Montant des Travaux</label>
                                                <div className="text-lg font-bold text-black">
                                                    {project.project_cost}
                                                </div>
                                            </div>
                                        )}

                                        {/* Duration */}
                                        {project.duration_months && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Durée</label>
                                                <div className="text-sm text-black">
                                                    {project.duration_months} mois
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Statut</label>
                                            <Badge className={
                                                project.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    project.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }>
                                                {project.status}
                                            </Badge>
                                        </div>

                                        {project.architect && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Architecte principal</label>
                                                <p className="text-black">{project.architect}</p>
                                            </div>
                                        )}

                                        {project.contractor && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Entrepreneur</label>
                                                <p className="text-black">{project.contractor}</p>
                                            </div>
                                        )}

                                        {project.completion_date && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Date d’achèvement</label>
                                                <p className="text-black">{project.completion_date}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <div className="flex space-x-3">
                                            <Button className="flex-1 bg-black hover:bg-gray-800 text-white">
                                                <Share2 className="h-4 w-4 mr-2" />
                                                Partager
                                            </Button>
                                            <a href={project.pdf_path} download>
                                                <Button
                                                    variant="outline"
                                                    className="flex-1 text-black border-black hover:bg-black hover:text-white"
                                                >
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    Télécharger le PDF
                                                </Button>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Link href="/contact">
                                            <Button className="w-full bg-black hover:bg-gray-800 text-white">
                                                Démarrer votre projet
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <section className="py-24 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-light mb-12 text-black text-center">Projets liés</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProjects.map((relatedProject) => (
                                    <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`}>
                                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl h-full  transition-shadow">
                                            <img
                                                src={relatedProject.image_path}
                                                alt={relatedProject.title}
                                                className="w-full h-64 object-cover"
                                            />
                                            <div className="p-6">
                                                <Badge
                                                    variant="secondary"
                                                    className="text-white font-medium mb-3"
                                                    style={{ backgroundColor: relatedProject.category?.color || '#a3845b' }}
                                                >
                                                    {relatedProject.category?.name || relatedProject.category || 'Sans catégorie'}
                                                </Badge>
                                                <h3 className="text-xl font-semibold text-black mb-2">{relatedProject.title}</h3>
                                                <div className="flex items-center text-black text-sm mb-3">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    <span>{relatedProject.location}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{relatedProject.year}</span>
                                                </div>
                                                <p className="text-black text-sm leading-relaxed line-clamp-5">{relatedProject.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery Modal */}
                {isGalleryOpen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                            <button
                                onClick={() => setIsGalleryOpen(false)}
                                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                            >
                                <X className="h-8 w-8" />
                            </button>

                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                            >
                                <ChevronLeft className="h-12 w-12" />
                            </button>

                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                            >
                                <ChevronRight className="h-12 w-12" />
                            </button>

                            <img
                                src={allImages[currentImageIndex]}
                                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain"
                            />

                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                                {currentImageIndex + 1} / {allImages.length}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                  <footer className="bg-gray-900 text-white py-16">
                                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                           <div className="md:col-span-2">
                                               <Link href="/" className="flex items-center space-x-2 mb-4">
                                                   {/* Logo Design */}
                                                   <img src={logo}
                                                       className='w-[55px] aspect-square object-cover'
                                                       alt="" />
                                               </Link>
                                               <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                                                   Creating architectural masterpieces that blend innovation, sustainability, and timeless design for over
                                                   two decades.
                                               </p>
                                               <div className="flex space-x-4">
                                                   <Link
                                                       href="#"
                                                       className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                                   >
                                                       <Instagram className="h-5 w-5" />
                                                   </Link>
                                                   <Link
                                                       href="#"
                                                       className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                                   >
                                                       <Twitter className="h-5 w-5" />
                                                   </Link>
                                                   <Link
                                                       href="#"
                                                       className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                                   >
                                                       <Linkedin className="h-5 w-5" />
                                                   </Link>
                                               </div>
                                           </div>

                                           <div>
                                               <h3 className="text-lg font-semibold mb-4">Services</h3>
                                               <ul className="space-y-2 text-gray-300">
                                                   <li>
                                                       <Link href="#" className="hover:text-white transition-colors">
                                                           Architectural Design
                                                       </Link>
                                                   </li>
                                                   <li>
                                                       <Link href="#" className="hover:text-white transition-colors">
                                                           Urban Planning
                                                       </Link>
                                                   </li>
                                                   <li>
                                                       <Link href="#" className="hover:text-white transition-colors">
                                                           Interior Design
                                                       </Link>
                                                   </li>
                                                   <li>
                                                       <Link href="#" className="hover:text-white transition-colors">
                                                           Consultation
                                                       </Link>
                                                   </li>
                                               </ul>
                                           </div>

                                           <div>
                                               <h3 className="text-lg font-semibold mb-4">Company</h3>
                                               <ul className="space-y-2 text-gray-300">
                                                   <li>
                                                       <Link href="/about" className="hover:text-white transition-colors">
                                                           About Us
                                                       </Link>
                                                   </li>
                                                   <li>
                                                       <Link href="#" className="hover:text-white transition-colors">
                                                           Our Team
                                                       </Link>
                                                   </li>
                                                   <li>
                                                       <Link href="#" className="hover:text-white transition-colors">
                                                           Careers
                                                       </Link>
                                                   </li>
                                                   <li>
                                                       <Link href="#" className="hover:text-white transition-colors">
                                                           News
                                                       </Link>
                                                   </li>
                                               </ul>
                                           </div>
                                       </div>

                                       <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                                           <p className="text-gray-400 text-sm">© {new Date().getFullYear()} A1 atelier. Tous droits réservés.</p>
                                           <div className="flex space-x-6 mt-4 md:mt-0">
                                               <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                                   Privacy Policy
                                               </Link>
                                               <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                                   Terms of Service
                                               </Link>
                                           </div>
                                       </div>
                                   </div>
                               </footer>
            </div>
        </>
    )
}
