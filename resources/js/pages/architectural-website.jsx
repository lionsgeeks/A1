import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react"
import { Head, Link } from '@inertiajs/react'

export default function ArchitecturalWebsite() {
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
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                {/* Logo Design */}
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
                <Link
                  href="/projects"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
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
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            Designing the
            <span className="block font-bold">Future</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            We create architectural masterpieces that blend innovation, sustainability, and timeless design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg">
              View Our Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              className="bg-white/10 text-white hover:bg-white hover:text-black px-8 py-3 text-lg backdrop-blur-sm"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                Crafting Spaces That
                <span className="block font-bold">Inspire</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                For over two decades, we have been at the forefront of architectural innovation, creating spaces that
                not only serve their purpose but elevate the human experience.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our approach combines cutting-edge design with sustainable practices, ensuring that every project
                contributes positively to its environment and community.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
                  <div className="text-sm text-gray-600">Awards Won</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">20+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556"
                alt="Architectural Detail"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
              Recent
              <span className="block font-bold">Highlights</span>
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex space-x-6 animate-scroll">
              {[
                {
                  image:
                    "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
                  title: "Award-Winning Design",
                  subtitle: "International Architecture Prize 2024",
                },
                {
                  image:
                    "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
                  title: "Sustainable Innovation",
                  subtitle: "Green Building Certification",
                },
                {
                  image:
                    "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
                  title: "Community Impact",
                  subtitle: "Local Development Project",
                },
                {
                  image:
                    "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
                  title: "Modern Living",
                  subtitle: "Residential Excellence",
                },
                {
                  image:
                    "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
                  title: "Urban Planning",
                  subtitle: "City Center Revitalization",
                },
              ].map((item, index) => (
                <div key={index} className="flex-shrink-0 w-80">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-200">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  <Link href="#" className="hover:text-white transition-colors">
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
