import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Share2, Download, ChevronLeft, ChevronRight, X, User, Building, Ruler, Clock, Award, Target } from "lucide-react"
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
            <Head title={`${project.title} - ARCH Studio`} />
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
                                        Projects
                                    </Link>
                                    <Link href="/about" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors">
                                        About
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
                                    {project.category?.name || project.category || 'Uncategorized'}
                                </Badge>
                                <h1 className="text-5xl md:text-7xl font-light mb-4 leading-tight">
                                    {project.title.split(" ").slice(0, -1).join(" ")}
                                    <span className="block font-bold">{project.title.split(" ").slice(-1)}</span>
                                </h1>
                                <div className="flex items-center text-white/80 text-lg mb-4">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span>{project.location}</span>
                                    <span className="mx-4">•</span>
                                    <Calendar className="h-5 w-5 mr-2" />
                                    <span>{project.year}</span>
                                </div>
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
                                <h2 className="text-3xl font-light mb-6 text-black">Project Overview</h2>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-lg text-black leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                    <div className="text-black leading-relaxed whitespace-pre-wrap">
                                        {project.details}
                                    </div>
                                </div>

                                {/* Project Specifications */}
                                <div className="mt-12">
                                    <h3 className="text-2xl font-light mb-6 text-black">Project Specifications</h3>
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
                                                    <h4 className="font-medium text-black">Total Area</h4>
                                                    <p className="text-black">{project.area}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.duration && (
                                            <div className="flex items-start space-x-3">
                                                <Clock className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Project Duration</h4>
                                                    <p className="text-black">{project.duration}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.budget && (
                                            <div className="flex items-start space-x-3">
                                                <Target className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Budget Range</h4>
                                                    <p className="text-black">{project.budget}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.team && (
                                            <div className="flex items-start space-x-3">
                                                <Building className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Project Team</h4>
                                                    <p className="text-black">{project.team}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.awards && (
                                            <div className="flex items-start space-x-3">
                                                <Award className="h-5 w-5 text-black mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-black">Awards & Recognition</h4>
                                                    <p className="text-black">{project.awards}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Image Gallery */}
                                {allImages.length > 1 && (
                                    <div className="mt-12">
                                        <h3 className="text-2xl font-light mb-6 text-black">Project Gallery</h3>
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
                                    <h3 className="text-xl font-semibold text-black mb-6">Project Information</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Category</label>
                                            <Badge
                                                className="text-white font-medium"
                                                style={{ backgroundColor: project.category?.color || '#a3845b' }}
                                            >
                                                {project.category?.name || project.category || 'Uncategorized'}
                                            </Badge>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Location</label>
                                            <p className="text-black">{project.location}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Year</label>
                                            <p className="text-black">{project.year}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Status</label>
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
                                                <label className="block text-sm font-medium text-black mb-1">Lead Architect</label>
                                                <p className="text-black">{project.architect}</p>
                                            </div>
                                        )}

                                        {project.contractor && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Contractor</label>
                                                <p className="text-black">{project.contractor}</p>
                                            </div>
                                        )}

                                        {project.completion_date && (
                                            <div>
                                                <label className="block text-sm font-medium text-black mb-1">Completion Date</label>
                                                <p className="text-black">{project.completion_date}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <div className="flex space-x-3">
                                            <Button className="flex-1 bg-black hover:bg-gray-800 text-white">
                                                <Share2 className="h-4 w-4 mr-2" />
                                                Share
                                            </Button>
                                            <Button variant="outline" className="flex-1 text-black border-black hover:bg-black hover:text-white">
                                                <Download className="h-4 w-4 mr-2" />
                                                Download PDF
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Link href="/contact">
                                            <Button className="w-full bg-black hover:bg-gray-800 text-white">
                                                Start Your Project
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
                            <h2 className="text-3xl font-light mb-12 text-black text-center">Related Projects</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProjects.map((relatedProject) => (
                                    <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`}>
                                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
                                                    {relatedProject.category?.name || relatedProject.category || 'Uncategorized'}
                                                </Badge>
                                                <h3 className="text-xl font-semibold text-black mb-2">{relatedProject.title}</h3>
                                                <div className="flex items-center text-black text-sm mb-3">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    <span>{relatedProject.location}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{relatedProject.year}</span>
                                                </div>
                                                <p className="text-black text-sm leading-relaxed">{relatedProject.description}</p>
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
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-white transform rotate-45"></div>
                                        <div className="absolute top-1 left-1 w-6 h-6 bg-gray-900 transform rotate-45"></div>
                                        <div className="absolute top-2 left-2 w-4 h-4 bg-white transform rotate-45"></div>
                                    </div>
                                    <span className="text-3xl font-bold tracking-wider">ARCH</span>
                                </Link>
                                <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                                    Creating architectural masterpieces that blend innovation, sustainability, and timeless design for over two decades.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                                    <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                                    <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                                    <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>+1 (555) 123-4567</li>
                                    <li>hello@archstudio.com</li>
                                    <li>123 Design Street<br />New York, NY 10001</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ARCH Studio. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
