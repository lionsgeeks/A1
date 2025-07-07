import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar, Filter, Grid, List } from "lucide-react"
import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid')

  const categories = ['All', 'Residential', 'Commercial', 'Cultural', 'Mixed-Use', 'Educational']

  const projects = [
    {
      id: 1,
      title: "Modern Residential Complex",
      category: "Residential",
      location: "New York, NY",
      year: "2024",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      description: "A contemporary residential development featuring sustainable design principles and innovative living spaces.",
      details: "This 150-unit residential complex showcases modern architectural design with emphasis on sustainability and community living. Features include green rooftops, energy-efficient systems, and shared community spaces."
    },
    {
      id: 2,
      title: "Corporate Headquarters",
      category: "Commercial",
      location: "San Francisco, CA",
      year: "2023",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      description: "A striking office building that redefines the modern workplace with flexible spaces and natural light.",
      details: "A 40-story corporate headquarters designed to promote collaboration and innovation. The building features flexible workspaces, abundant natural light, and state-of-the-art technology infrastructure."
    },
    {
      id: 3,
      title: "Cultural Arts Center",
      category: "Cultural",
      location: "Chicago, IL",
      year: "2023",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
      description: "An iconic cultural landmark that brings together community spaces and artistic expression.",
      details: "A multi-purpose cultural facility housing galleries, performance spaces, and educational facilities. The design emphasizes accessibility and community engagement while creating inspiring spaces for artistic expression."
    },
    {
      id: 4,
      title: "Sustainable Housing Project",
      category: "Residential",
      location: "Portland, OR",
      year: "2024",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      description: "Eco-friendly housing development showcasing renewable energy and green building technologies.",
      details: "A pioneering sustainable housing project featuring solar panels, rainwater harvesting, and passive heating/cooling systems. The development serves as a model for environmentally responsible residential design."
    },
    {
      id: 5,
      title: "Urban Mixed-Use Development",
      category: "Mixed-Use",
      location: "Austin, TX",
      year: "2023",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      description: "A vibrant mixed-use complex combining retail, office, and residential spaces in the heart of the city.",
      details: "This mixed-use development creates a vibrant urban community with ground-floor retail, office spaces, and residential units. The design promotes walkability and creates a sense of place in the urban environment."
    },
    {
      id: 6,
      title: "Educational Campus",
      category: "Educational",
      location: "Boston, MA",
      year: "2024",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
      description: "A modern educational facility designed to inspire learning through innovative architectural solutions.",
      details: "A state-of-the-art educational campus featuring flexible learning spaces, advanced technology integration, and sustainable design elements. The architecture supports various learning methodologies and promotes student collaboration."
    },
    {
      id: 7,
      title: "Luxury Resort Complex",
      category: "Commercial",
      location: "Miami, FL",
      year: "2022",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      description: "An exclusive resort destination that seamlessly blends luxury with natural surroundings.",
      details: "A luxury resort complex designed to harmonize with the coastal environment. Features include sustainable materials, energy-efficient systems, and spaces that maximize ocean views while respecting the natural landscape."
    },
    {
      id: 8,
      title: "Community Library",
      category: "Cultural",
      location: "Seattle, WA",
      year: "2022",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      description: "A contemporary library that serves as a community hub for learning and social interaction.",
      details: "A modern library design that reimagines the traditional library concept. Features include flexible spaces for various activities, advanced technology integration, and areas designed to foster community interaction and lifelong learning."
    }
  ]

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <>
      <Head title="Our Projects - ARCH Studio" />
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-900 transform rotate-45"></div>
                    <div className="absolute top-1 left-1 w-6 h-6 bg-white transform rotate-45"></div>
                    <div className="absolute top-2 left-2 w-4 h-4 bg-gray-900 transform rotate-45"></div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 tracking-wider">ARCH</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link href="/projects" className="text-gray-900 px-3 py-2 text-sm font-medium border-b-2 border-gray-900">
                    Projects
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
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
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=1080&fit=crop"
              alt="Our Projects"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              Our
              <span className="block font-bold">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
              Explore our portfolio of innovative architectural solutions that have transformed communities
            </p>
          </div>
        </section>

        {/* Filter and Controls Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid/List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {project.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{project.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{project.location}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>
                      <Button className="w-full bg-gray-900 hover:bg-gray-800">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                            {project.category}
                          </Badge>
                          <span className="text-sm text-gray-500">{project.year}</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{project.location}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">{project.details}</p>
                        <Button className="bg-gray-900 hover:bg-gray-800">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Have a Project
              <span className="block font-bold">In Mind?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your architectural vision and bring your ideas to life with our expertise and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg backdrop-blur-sm"
                >
                  Learn About Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

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
