import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react"
import { Head, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import logo from "../../assets/images/A1.png"

// Inject custom styles for enhanced carousel
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
    .carousel-container {
      perspective: 1200px;
      transform-style: preserve-3d;
    }

    .carousel-slide {
      backface-visibility: hidden;
      transform-style: preserve-3d;
      will-change: transform;
    }

    .shadow-3xl {
      box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    /* Smooth hardware acceleration */
    .carousel-container * {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    /* Ultra smooth transitions */
    .carousel-container .flex {
      transform-origin: center center;
    }

    /* Optimized hover effects */
    .carousel-slide:hover {
      transform: translateY(-4px) scale(1.02);
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Smooth image scaling */
    .carousel-slide img {
      transform-origin: center center;
      will-change: transform;
    }

    @keyframes smoothSlide {
      0% {
        opacity: 0.8;
        transform: translateX(20px) scale(0.98);
      }
      100% {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    .slide-in {
      animation: smoothSlide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Prevent layout shifts */
    .carousel-container {
      contain: layout style paint;
    }
  `
    if (!document.head.querySelector('style[data-carousel-styles]')) {
        styleSheet.setAttribute('data-carousel-styles', 'true')
        document.head.appendChild(styleSheet)
    }
}

export default function ArchitecturalWebsite({ featuredCategories = [], featuredProjects = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isCarouselPaused, setIsCarouselPaused] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(true)
    const carouselImages = [
        "storage/projects/4bfeb9ee-7e9e-4f7a-ba92-ea431d1c5e07.jpg",
        "storage/projects/5c47e95d-33eb-4ffc-8ab3-b5b45d4eece6.JPG",
        "storage/projects/c585f6a6-47de-4775-8701-583b6880cf4f.JPG",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [carouselImages.length]);
    // Use CRUD-managed categories for the carousel
    const highlights = featuredCategories.length > 0 ? featuredCategories.map(category => ({
        id: category.id,
        slug: category.slug,
        image: category.image_path ? `/${category.image_path}` : null, // Use actual category image
        title: category.name,
        subtitle: `${category.projects_count} projet${category.projects_count !== 1 ? 's' : ''}`,
        description: category.description || 'Découvrez nos projets architecturaux dans cette catégorie.',
        color: category.color,
        projectCount: category.projects_count,
        hasImage: !!category.image_path
    })) : [
        // Fallback data if no categories are available
        {
            id: 1,
            slug: 'architecture',
            image: null,
            title: "Architecture",
            subtitle: "0 projets",
            description: "Ajoutez des catégories depuis le panneau d'administration pour présenter votre travail ici.",
            color: "#a3845b",
            projectCount: 0,
            hasImage: false
        }
    ]

    // Create extended array for infinite loop effect
    const extendedHighlights = [
        ...highlights.slice(-2), // Last 2 items at the beginning
        ...highlights,
        ...highlights.slice(0, 2), // First 2 items at the end
    ]

    const slideWidth = 400 // Width of each slide including gap
    const gap = 32 // Gap between slides

    // Auto-slide effect with infinite loop - smoother timing
    useEffect(() => {
        if (isCarouselPaused) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => prev + 1)
        }, 2000)
        return () => clearInterval(interval)
    }, [isCarouselPaused])

    // Handle infinite loop reset - smoother transitions
    useEffect(() => {
        if (currentSlide === highlights.length + 2) {
            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentSlide(2)
                setTimeout(() => setIsTransitioning(true), 20) // Faster reset
            }, 600) // Wait for transition to complete
        } else if (currentSlide === -1) {
            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentSlide(highlights.length + 1)
                setTimeout(() => setIsTransitioning(true), 20)
            }, 600)
        }
    }, [currentSlide, highlights.length])

    const goToSlide = (index) => {
        setCurrentSlide(index + 2) // Offset by 2 because of the extended array
    }

    // Use dynamic featured projects from database
    const projects = featuredProjects.length > 0 ? featuredProjects : []

    return (
        <>
            <Head title="Atelier A1" />
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-[#dfdfdf] backdrop-blur-sm border-b border-gray-100 z-40">
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
                                    <Link href="/projects" className="text-black px-3 py-2 text-sm font-medium ">
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

                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {carouselImages.map((src, index) => (
                            <img
                                key={src}
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                                    }`}
                            />
                        ))}
                        <div className="absolute inset-0 bg-secondary-950/50" />
                    </div>

                    <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
                        <h1 className="text-2xl md:text-6xl font-extralight mb-8 leading-tight tracking-wide">
                            Façonner des espaces qui révèlent le territoire  <span className=" font-light text-primary-300">et inspirent ceux qui l’habitent.</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed text-gray-100">
                            Façonner des espaces qui
                            révèlent le territoire et inspirent
                            ceux qui l’habitent.                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/projects">
                                <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-600 px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300">
                                    Voir nos réalisations
                                    <ArrowRight className="ml-3 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white/30 text-black hover:bg-white hover:text-secondary-950 px-10 py-4 text-lg font-medium tracking-wide backdrop-blur-sm transition-all duration-300"
                                >
                                    Nous contacter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-24 bg-primary-50/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-secondary-950 leading-tight">
                                    Concevoir des espaces qui
                                    <span className="block font-light text-primary-600">inspirent</span>
                                </h2>
                                <p className="text-lg text-secondary-700 mb-8 leading-relaxed">
                                    Chaque projet est pensé comme une rencontre entre un lieu, un programme
                                    et une communauté. Notre démarche conjugue savoir-faire architectural,
                                    lecture fine du contexte et attention portée aux usages, pour donner
                                    naissance à des espaces à la fois ancrés et ouverts, fonctionnels et porteurs de
                                    sens.
                                </p>
                                {/* <p className="text-lg text-secondary-700 mb-12 leading-relaxed">
                                    Notre approche combine un design de pointe et des pratiques durables, garantissant que chaque projet contribue positivement à son environnement et à sa communauté tout en conservant une élégance intemporelle.

                                </p> */}
                                <div className="grid grid-cols-3 gap-4  ">
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary-600 mb-2">190+</div>
                                        <div className="text-sm text-secondary-600 uppercase tracking-wide">projets achevés</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary-600 mb-2">5+</div>
                                        <div className="text-sm text-secondary-600 uppercase tracking-wide">concours gagnés</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary-600 mb-2">15+</div>
                                        <div className="text-sm text-secondary-600 uppercase tracking-wide">années d’expériences
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="storage/projects/4bfeb9ee-7e9e-4f7a-ba92-ea431d1c5e07.jpg"
                                    alt="Architectural Detail"
                                    className="w-full h-auto rounded-lg shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/20 to-transparent rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Carousel Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-secondary-950 leading-tight">
                                Réalisations
                                <span className="block font-light text-primary-600">récentes</span>
                            </h2>
                        </div>

                        <div
                            className="carousel-container  relative overflow-hidden rounded-3xl bg-white p-8"
                            onMouseEnter={() => setIsCarouselPaused(true)}
                            onMouseLeave={() => setIsCarouselPaused(false)}
                        >
                            {/* Main carousel container */}
                            <div
                                className={`flex ${isTransitioning ? 'transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]' : ''}`}
                                style={{
                                    transform: `translateX(-${currentSlide * slideWidth}px)`,
                                    gap: `${gap}px`,
                                    willChange: 'transform'
                                }}
                            >
                                {extendedHighlights.map((item, index) => (
                                    <div
                                        key={`${item.title}-${index}`}
                                        className="flex-shrink-0 group cursor-pointer carousel-slide"
                                        style={{ width: `${slideWidth - gap}px` }}
                                    >
                                        {item.id ? (
                                            <Link href={`/projects?category=${encodeURIComponent(item.slug || item.title)}`}
                                                className="block">
                                                <div className="relative overflow-hidden rounded-3xl aspect-[16/10] shadow-3xl transform transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03] group-hover:shadow-3xl">
                                                    {/* Image or Color Background */}
                                                    {item.hasImage ? (
                                                        <>
                                                            <img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                                                            />
                                                            {/* Gradient overlays for depth with category color */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                                            <div
                                                                className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"
                                                                style={{
                                                                    background: `linear-gradient(to right, ${item.color}20, transparent, ${item.color}20)`
                                                                }}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Color-based background for categories without images */}
                                                            <div
                                                                className="w-full h-full transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${item.color}E6, ${item.color}B3, ${item.color}80)`
                                                                }}
                                                            />
                                                            {/* Decorative pattern overlay */}
                                                            <div className="absolute inset-0 opacity-20">
                                                                <div className="w-full h-full" style={{
                                                                    backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                                                                    backgroundSize: '60px 60px'
                                                                }}></div>
                                                            </div>
                                                            {/* Subtle gradient overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                        </>
                                                    )}

                                                    {/* Content */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                                        <div className="transform transition-all duration-700 group-hover:translate-y-[-12px]">
                                                            <h3 className="text-3xl font-bold mb-3 text-white leading-tight tracking-tight">
                                                                {item.title}
                                                            </h3>
                                                            {/* count removed */}

                                                            {/* Decorative line with category color */}
                                                            <div className="relative mt-6">
                                                                <div
                                                                    className="w-20 h-1 rounded-full transform transition-all duration-700 group-hover:w-32"
                                                                    style={{ backgroundColor: item.color }}
                                                                ></div>
                                                                <div
                                                                    className="absolute top-0 left-0 w-20 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                                                    style={{
                                                                        background: `linear-gradient(to right, ${item.color}80, ${item.color})`
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Hover overlay with category color */}
                                                    <div
                                                        className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100"
                                                        style={{
                                                            background: `linear-gradient(to top, ${item.color}20, transparent, transparent)`
                                                        }}
                                                    />

                                                    {/* Corner accent with category color */}
                                                    <div
                                                        className="absolute top-6 right-6 w-12 h-12 border-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:rotate-180"
                                                        style={{ borderColor: `${item.color}50` }}
                                                    ></div>

                                                    {/* View Category indicator */}
                                                    <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2">
                                                        <span className="text-white text-sm font-medium">Voir tous les projets</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="relative overflow-hidden rounded-3xl aspect-[16/10] shadow-3xl transform transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03] group-hover:shadow-3xl">
                                                {/* Fallback content for items without ID */}
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                                                />

                                                {/* Gradient overlays for depth */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                                                {/* Content */}
                                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                                    <div className="transform transition-all duration-700 group-hover:translate-y-[-12px]">
                                                        <h3 className="text-3xl font-bold mb-3 text-white leading-tight tracking-tight">
                                                            {item.title}
                                                        </h3>
                                                        {/* count removed */}

                                                        {/* Decorative line with animation */}
                                                        <div className="relative mt-6">
                                                            <div className="w-20 h-1 bg-primary-600 rounded-full transform transition-all duration-700 group-hover:w-32"></div>
                                                            <div className="absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Hover overlay with subtle animation */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100" />

                                                {/* Corner accent */}
                                                <div className="absolute top-6 right-6 w-12 h-12 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:rotate-180"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Enhanced indicators with better styling */}
                            {/* <div className="flex justify-center mt-16 space-x-4">
              {highlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`carousel-indicator relative transition-all duration-500 transform hover:scale-110 ${
                    index === ((currentSlide - 2 + highlights.length) % highlights.length)
                      ? 'w-12 h-4 bg-gradient-to-r from-primary-500 to-primary-700 shadow-lg'
                      : 'w-4 h-4 bg-gray-400 hover:bg-gray-500 shadow-md'
                  } rounded-full`}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </button>
              ))}
            </div> */}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-12">
                    <div className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                            Projets à la une
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Découvrez notre portefeuille de solutions architecturales innovantes qui ont transformé les communautés et redéfini les horizons.
                        </p>
                        {projects.length > 0 && (
                            <Link href="/projects">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                                >
                                    Voir tous les projets
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Individual Project Sections */}
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div key={project.id} className="relative h-screen flex items-center overflow-hidden mb-16">
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={project.image_path || "https://via.placeholder.com/1920x1080/a3845b/ffffff?text=Project+Image"}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            console.log('Image failed to load:', project.image_path);
                                            e.target.src = "https://via.placeholder.com/1920x1080/a3845b/ffffff?text=Project+Image";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>

                                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                    <div className={`${index % 2 === 0 ? "text-left" : "text-right"}`}>
                                        <div className="max-w-2xl">
                                            <div className="flex gap-2 flex-wrap mb-6">
                                                {(project.categories || (project.category ? [project.category] : [])).map((cat, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className="bg-white/20 text-white border-white/30"
                                                        style={{ backgroundColor: cat?.color ? `${cat.color}80` : 'rgba(163, 132, 91, 0.5)' }}
                                                    >
                                                        {cat?.name || 'Sans catégorie'}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-2xl md:text-4xl font-light mb-8 text-white leading-tight">
                                                {project.title.split(" ").slice(0, -1).join(" ")}
                                                <span className="block font-bold">{project.title.split(" ").slice(-1)}</span>
                                            </p>
                                            <div className="flex items-center text-white/80 text-lg mb-8">
                                                <MapPin className="h-5 w-5 mr-2" />
                                                <span>{project.location}</span>
                                                <span className="mx-4">•</span>
                                                <span>{project.year}</span>
                                            </div>
                                            <p className="text-white/90 text-lg mb-8 leading-relaxed">
                                                {project.description}
                                            </p>
                                            <Link href={`/projects/${project.id}`}>
                                                <Button
                                                    size="lg"
                                                    className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm"
                                                >
                                                    Voir le projet
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24 bg-gray-50 rounded-2xl mx-4">
                            <div className="max-w-2xl mx-auto px-4">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MapPin className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-3xl font-light text-gray-600 mb-4">Aucun projet à la une pour le moment</h3>
                                <p className="text-lg text-gray-500 mb-8">
                                    Notre portfolio est en cours de mise à jour. Revenez bientôt pour découvrir nos dernières innovations architecturales.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/contact">
                                        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                                            Discuter de votre projet
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/about">
                                        <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                                            En savoir plus sur nous
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
                {/* Contact Section */}
                <section id="contact" className="py-18">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                    Créons
                                    <span className="block font-bold">quelque chose d’extraordinaire</span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Prêt à donner vie à votre vision architecturale ? Nous serions ravis d’en discuter avec vous et d’explorer comment nous pouvons vous aider à créer quelque chose d’exceptionnel.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <Phone className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Téléphone</div>
                                            <div className="text-gray-600">+212 5 2247 49 91</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <Mail className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Email</div>
                                            <div className="text-gray-600">info@ateliera1.com </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <MapPin className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Adresse</div>
                                            <div className="text-gray-600">123 Design Street, New York, NY 10001</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="storage/projects/4bfeb9ee-7e9e-4f7a-ba92-ea431d1c5e07.jpg"
                                    alt="Office Building"
                                    className="w-full h-auto rounded-lg shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Newsletter Section */}
                {/* <section className="py-12 bg-gray-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Stay
                            <span className="block font-bold">Informed</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Subscribe to our newsletter and be the first to know about our latest projects, architectural insights, and
                            industry innovations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3">Subscribe</Button>
                        </div>

                        <p className="text-sm text-gray-400 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
                    </div>
                </section> */}


                {/* Footer */}
                <footer className="bg-gray-900 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <Link href="/" className="flex items-center space-x-2 mb-4">
                                    <img src={logo}
                                        className='w-[55px] bg-white aspect-square object-cover'
                                        alt="" />
                                </Link>
                                <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                                    Nous créons des chefs-d’œuvre architecturaux qui allient innovation, durabilité et élégance intemporelle depuis plus de deux décennies.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                                    <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
                                    <li><Link href="/projects" className="hover:text-white transition-colors">Projets</Link></li>
                                    <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Coordonnées</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>+212 5 2247 49 91</li>
                                    <li>info@ateliera1.com </li>
                                    <li>217 angle rue fraternité  et bd zerktouni 3 ème étage 20 000 Casablanca</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Atelier A1. Tous droits réservés.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
