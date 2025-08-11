import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar, Filter, Grid, List } from "lucide-react"
import { Head, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import logo from "../../assets/images/A1.png"

export default function Projects({ projects, categories = [], selectedCategory = null }) {
  const [viewMode, setViewMode] = useState('grid')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayedProjects, setDisplayedProjects] = useState([])
console.log(projects);

  // Set initial category from URL parameter
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all')

  const filteredProjects = activeCategory === 'all'
    ? projects?.data || []
    : projects?.data?.filter(project => {
        // Handle both new relationship and old string format for backward compatibility
        const categoryName = project.category?.name || project.category;
        return categoryName === activeCategory;
      }) || []

  // Initialize displayed projects
  useEffect(() => {
    setDisplayedProjects(filteredProjects)
  }, [])

  const handleCategoryChange = (categorySlug) => {
    if (categorySlug === activeCategory) return // Don't animate if same category

    // Start transition
    setIsTransitioning(true)

    // Fade out current projects
    setTimeout(() => {
      setActiveCategory(categorySlug)
      // Update URL without page reload
      const url = categorySlug === 'all' ? '/projects' : `/projects?category=${categorySlug}`
      window.history.pushState({}, '', url)

      // Update displayed projects after fade out
      const newFilteredProjects = categorySlug === 'all'
        ? projects?.data || []
        : projects?.data?.filter(project => {
            const categoryName = project.category?.name || project.category;
            return categoryName === categorySlug;
          }) || []

      setDisplayedProjects(newFilteredProjects)

      // End transition and fade in new projects
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 200) // Fade out duration
  }

  return (
    <>
      <Head title="Our Projects - ARCH Studio" />
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

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="storage/projects/5c47e95d-33eb-4ffc-8ab3-b5b45d4eece6.JPG"
              alt="Our Projects"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-secondary-950/50" />
          </div>

          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-extralight mb-8 leading-tight tracking-wide">
              Our
              <span className="block font-light text-primary-300">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed text-gray-100">
              Explore our portfolio of innovative architectural solutions that have transformed communities and redefined spaces
            </p>
          </div>
        </section>

        {/* Filter and Controls Section */}
        <section className="py-16 bg-primary-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {/* All Categories Button */}
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 tracking-wide uppercase ${
                    activeCategory === 'all'
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-secondary-700 hover:bg-primary-100 hover:text-primary-700 shadow-sm'
                  }`}
                >
                  All Projects
                </button>

                {/* Category Buttons */}
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 tracking-wide uppercase relative ${
                      activeCategory === category.name
                        ? 'text-white shadow-lg'
                        : 'bg-white text-secondary-700 hover:bg-primary-100 hover:text-primary-700 shadow-sm'
                    }`}
                    style={{
                      backgroundColor: activeCategory === category.name ? category.color : undefined
                    }}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">
                      ({category.projects_count})
                    </span>
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary-600 text-white shadow-md' : 'text-secondary-600 hover:bg-primary-100'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-primary-600 text-white shadow-md' : 'text-secondary-600 hover:bg-primary-100'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid/List */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Header */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                {activeCategory === 'all'
                  ? 'All Projects'
                  : `${activeCategory} Projects`
                }
              </h2>
              <p className={`text-secondary-600 transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                {isTransitioning ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading projects...
                  </span>
                ) : displayedProjects.length === 0 ? (
                  'No projects found in this category'
                ) : (
                  `Showing ${displayedProjects.length} project${displayedProjects.length !== 1 ? 's' : ''}`
                )}
              </p>
            </div>
            {displayedProjects.length === 0 ? (
              <div className={`text-center py-16 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeCategory === 'all'
                      ? 'No projects have been added yet.'
                      : `No projects found in the "${activeCategory}" category.`
                    }
                  </p>
                  <Button
                    onClick={() => handleCategoryChange('all')}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    View All Projects
                  </Button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group transform ${
                      isTransitioning
                        ? 'opacity-0 scale-95 translate-y-4'
                        : 'opacity-100 scale-100 translate-y-0'
                    }`}
                    style={{
                      transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image_path || '/placeholder.svg'}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-secondary-950/20 group-hover:bg-secondary-950/10 transition-all duration-300"></div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          variant="secondary"
                          className="font-medium tracking-wide uppercase text-xs text-white"
                          style={{ backgroundColor: project.category?.color || '#a3845b' }}
                        >
                          {project.category?.name || 'Uncategorized'}
                        </Badge>
                        <span className="text-sm text-secondary-500 font-light">{project.year}</span>
                      </div>
                      <h3 className="text-xl font-light text-secondary-950 mb-3 leading-tight line-clamp-1">{project.title}</h3>
                      <div className="flex items-center text-secondary-600 text-sm mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                        <span className="font-light">{project.location}</span>
                      </div>
                      <p className="text-secondary-600 text-sm leading-relaxed mb-6 font-light line-clamp-3">{project.description}</p>
                      <Link href={`/projects/${project.id}`}>
                        <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium tracking-wide transition-all duration-300">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`space-y-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`bg-white rounded-lg h-full shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform ${
                      isTransitioning
                        ? 'opacity-0 scale-95 translate-y-4'
                        : 'opacity-100 scale-100 translate-y-0'
                    }`}
                    style={{
                      transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                    }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={project.image_path || '/placeholder.svg'}
                          alt={project.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            variant="secondary"
                            className="text-white font-medium"
                            style={{ backgroundColor: project.category?.color || '#a3845b' }}
                          >
                            {project.category?.name || project.category || 'Uncategorized'}
                          </Badge>
                          <span className="text-sm text-gray-500">{project.year}</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{project.location}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                        <Link href={`/projects/${project.id}`}>
                          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
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
