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

export default function ArchitecturalWebsite({ featuredProjects = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  // Use CRUD-managed projects for the carousel
  const highlights = featuredProjects.length > 0 ? featuredProjects.map(project => ({
    id: project.id,
    image: project.image_path,
    title: project.title,
    subtitle: `${project.category} • ${project.location} • ${project.year}`,
    category: project.category,
    location: project.location,
    year: project.year,
    description: project.description
  })) : [
    // Fallback data if no projects are available
    {
      id: 1,
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      title: "Featured Project",
      subtitle: "Architecture • Location • 2024",
      category: "Architecture",
      location: "Location",
      year: "2024",
      description: "Add projects from the admin panel to showcase your work here."
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
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1)
    }, 3500) // Slightly faster for better flow

    return () => clearInterval(interval)
  }, [])

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

  const projects = [
    {
      id: 1,
      title: "Modern Residential Complex",
      category: "Residential",
      location: "New York, NY",
      year: "2024",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A contemporary residential development featuring sustainable design principles and innovative living spaces.",
    },
    {
      id: 2,
      title: "Corporate Headquarters",
      category: "Commercial",
      location: "San Francisco, CA",
      year: "2023",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A striking office building that redefines the modern workplace with flexible spaces and natural light.",
    },
    {
      id: 3,
      title: "Cultural Arts Center",
      category: "Cultural",
      location: "Chicago, IL",
      year: "2023",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description: "An iconic cultural landmark that brings together community spaces and artistic expression.",
    },
    {
      id: 4,
      title: "Sustainable Housing Project",
      category: "Residential",
      location: "Portland, OR",
      year: "2024",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description: "Eco-friendly housing development showcasing renewable energy and green building technologies.",
    },
    {
      id: 5,
      title: "Urban Mixed-Use Development",
      category: "Mixed-Use",
      location: "Austin, TX",
      year: "2023",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A vibrant mixed-use complex combining retail, office, and residential spaces in the heart of the city.",
    },
    {
      id: 6,
      title: "Educational Campus",
      category: "Educational",
      location: "Boston, MA",
      year: "2024",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A modern educational facility designed to inspire learning through innovative architectural solutions.",
    },
  ]

  return (
    <>
      <Head title="ARCH Studio - Designing the Future" />
      <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-primary-200/30 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <img src={logo}
                  className='w-[60px] aspect-square object-cover'
                  alt="ARCH Studio" />
                <span className="text-xl font-semibold text-secondary-950 tracking-wide">ARCH</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-10">
                <Link
                  href="/projects"
                  className="text-secondary-700 hover:text-primary-600 px-4 py-2 text-sm font-medium transition-all duration-300 tracking-wide uppercase"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="text-secondary-700 hover:text-primary-600 px-4 py-2 text-sm font-medium transition-all duration-300 tracking-wide uppercase"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-secondary-700 hover:text-primary-600 px-4 py-2 text-sm font-medium transition-all duration-300 tracking-wide uppercase"
                >
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
          <img
            src="https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary-950/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-extralight mb-8 leading-tight tracking-wide">
            Designing the
            <span className="block font-light text-primary-300">Future</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed text-gray-100">
            We create architectural masterpieces that blend innovation, sustainability, and timeless elegance
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-600 px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300">
              View Our Work
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-black hover:bg-white hover:text-secondary-950 px-10 py-4 text-lg font-medium tracking-wide backdrop-blur-sm transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-secondary-950 leading-tight">
                Crafting Spaces That
                <span className="block font-light text-primary-600">Inspire</span>
              </h2>
              <p className="text-lg text-secondary-700 mb-8 leading-relaxed">
                For over two decades, we have been at the forefront of architectural innovation, creating spaces that
                not only serve their purpose but elevate the human experience through thoughtful design.
              </p>
              <p className="text-lg text-secondary-700 mb-12 leading-relaxed">
                Our approach combines cutting-edge design with sustainable practices, ensuring that every project
                contributes positively to its environment and community while maintaining timeless elegance.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-light text-primary-600 mb-2">150+</div>
                  <div className="text-sm text-secondary-600 uppercase tracking-wide">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-primary-600 mb-2">25+</div>
                  <div className="text-sm text-secondary-600 uppercase tracking-wide">Awards Won</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-primary-600 mb-2">20+</div>
                  <div className="text-sm text-secondary-600 uppercase tracking-wide">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-secondary-950 leading-tight">
              Recent
              <span className="block font-light text-primary-600">Highlights</span>
            </h2>
          </div>

          <div className="carousel-container relative overflow-hidden rounded-3xl bg-transparent p-8">
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
                    <Link href={`/projects/${item.id}`} className="block">
                      <div className="relative overflow-hidden rounded-3xl aspect-[16/10] shadow-3xl transform transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03] group-hover:shadow-3xl">
                        {/* Image with overlay */}
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
                            <p className="text-lg text-gray-200 font-medium opacity-95 leading-relaxed">
                              {item.subtitle}
                            </p>

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

                        {/* View Project indicator */}
                        <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2">
                          <span className="text-white text-sm font-medium">View Project</span>
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
                          <p className="text-lg text-gray-200 font-medium opacity-95 leading-relaxed">
                            {item.subtitle}
                          </p>

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
      <section id="projects" className="py-16">
        <div className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
            Featured
            <span className="block font-bold">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of innovative architectural solutions that have transformed communities and redefined
            skylines.
          </p>
        </div>

        {/* Individual Project Sections */}
        {projects.map((project, index) => (
          <div key={project.id} className="relative h-screen flex items-center overflow-hidden mb-16">
            <div className="absolute inset-0 z-0">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className={`${index % 2 === 0 ? "text-left" : "text-right"}`}>
                <div className="max-w-2xl">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-6">
                    {project.category}
                  </Badge>
                  <h3 className="text-5xl md:text-7xl font-light mb-8 text-white leading-tight">
                    {project.title.split(" ").slice(0, -1).join(" ")}
                    <span className="block font-bold">{project.title.split(" ").slice(-1)}</span>
                  </h3>
                  <div className="flex items-center text-white/80 text-lg mb-8">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{project.location}</span>
                    <span className="mx-4">•</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gray-900 text-white">
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                Let's Create
                <span className="block font-bold">Something Amazing</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Ready to bring your architectural vision to life? We'd love to hear about your project and explore how
                we can help you create something extraordinary.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">hello@archstudio.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Office</div>
                    <div className="text-gray-600">123 Design Street, New York, NY 10001</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556"
                alt="Office Building"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                {/* Logo Design */}
                <div className="relative">
                  <div className="w-8 h-8 bg-white transform rotate-45"></div>
                  <div className="absolute top-1 left-1 w-6 h-6 bg-gray-900 transform rotate-45"></div>
                  <div className="absolute top-2 left-2 w-4 h-4 bg-white transform rotate-45"></div>
                </div>
                <span className="text-3xl font-bold tracking-wider">ARCH</span>
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
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ARCH Studio. All rights reserved.</p>
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
