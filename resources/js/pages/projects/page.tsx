import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, MapPin, Calendar, Users, Square, Instagram, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Modern Residential Complex",
      category: "Residential",
      location: "New York, NY",
      year: "2024",
      client: "Urban Living Corp",
      area: "45,000 sq ft",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A contemporary residential development featuring sustainable design principles and innovative living spaces that redefine urban living.",
      pdfUrl: "/projects/modern-residential-complex.pdf",
      status: "Completed",
    },
    {
      id: 2,
      title: "Corporate Headquarters",
      category: "Commercial",
      location: "San Francisco, CA",
      year: "2023",
      client: "Tech Innovations Inc",
      area: "120,000 sq ft",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A striking office building that redefines the modern workplace with flexible spaces, natural light, and cutting-edge technology integration.",
      pdfUrl: "/projects/corporate-headquarters.pdf",
      status: "Completed",
    },
    {
      id: 3,
      title: "Cultural Arts Center",
      category: "Cultural",
      location: "Chicago, IL",
      year: "2023",
      client: "City of Chicago",
      area: "85,000 sq ft",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "An iconic cultural landmark that brings together community spaces and artistic expression in a harmonious architectural form.",
      pdfUrl: "/projects/cultural-arts-center.pdf",
      status: "Completed",
    },
    {
      id: 4,
      title: "Sustainable Housing Project",
      category: "Residential",
      location: "Portland, OR",
      year: "2024",
      client: "Green Living Development",
      area: "32,000 sq ft",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "Eco-friendly housing development showcasing renewable energy systems, green building technologies, and sustainable living practices.",
      pdfUrl: "/projects/sustainable-housing-project.pdf",
      status: "In Progress",
    },
    {
      id: 5,
      title: "Urban Mixed-Use Development",
      category: "Mixed-Use",
      location: "Austin, TX",
      year: "2023",
      client: "Austin Development Group",
      area: "200,000 sq ft",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A vibrant mixed-use complex combining retail, office, and residential spaces in the heart of the city's cultural district.",
      pdfUrl: "/projects/urban-mixed-use-development.pdf",
      status: "Completed",
    },
    {
      id: 6,
      title: "Educational Campus",
      category: "Educational",
      location: "Boston, MA",
      year: "2024",
      client: "Boston University",
      area: "150,000 sq ft",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A modern educational facility designed to inspire learning through innovative architectural solutions and collaborative spaces.",
      pdfUrl: "/projects/educational-campus.pdf",
      status: "In Progress",
    },
    {
      id: 7,
      title: "Luxury Resort & Spa",
      category: "Hospitality",
      location: "Miami, FL",
      year: "2022",
      client: "Oceanview Resorts",
      area: "75,000 sq ft",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A sophisticated resort complex that seamlessly blends luxury accommodations with natural coastal environments.",
      pdfUrl: "/projects/luxury-resort-spa.pdf",
      status: "Completed",
    },
    {
      id: 8,
      title: "Innovation Hub",
      category: "Commercial",
      location: "Seattle, WA",
      year: "2024",
      client: "Northwest Tech Alliance",
      area: "95,000 sq ft",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      description:
        "A collaborative workspace designed to foster innovation and creativity among tech startups and established companies.",
      pdfUrl: "/projects/innovation-hub.pdf",
      status: "In Progress",
    },
  ]

  const categories = ["All", "Residential", "Commercial", "Cultural", "Mixed-Use", "Educational", "Hospitality"]

  return (
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
                <Link
                  href="/projects"
                  className="text-gray-900 px-3 py-2 text-sm font-medium border-b-2 border-gray-900"
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
          <Image
            src="https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556"
            alt="ARCH Studio Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            Our
            <span className="block font-bold">Projects</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of innovative architectural solutions and download detailed project documentation
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={`px-6 py-2 ${
                  category === "All"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative aspect-[4/3]">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      {project.category}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`${
                        project.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {project.year}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {project.client}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Square className="h-4 w-4 mr-2" />
                      {project.area}
                    </div>
                  </div>

                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
            Let's discuss how we can bring your architectural vision to life with our expertise and innovative approach.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg">Start Your Project</Button>
          </Link>
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
  )
}
