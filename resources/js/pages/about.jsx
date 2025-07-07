import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Users, Award, Calendar, Target } from "lucide-react"
import { Head, Link } from '@inertiajs/react'

export default function About() {
  const team = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Principal Architect",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "With over 15 years of experience, Sarah leads our design vision and ensures every project meets the highest standards of innovation and sustainability."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Project Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Michael brings exceptional organizational skills and technical expertise to manage complex architectural projects from conception to completion."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Sustainability Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Emily ensures all our projects incorporate cutting-edge sustainable practices and green building technologies."
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "David's creative vision and attention to detail drive the aesthetic excellence that defines our architectural solutions."
    }
  ]

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We push the boundaries of architectural design, incorporating cutting-edge technologies and creative solutions."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in working closely with our clients, communities, and partners to create meaningful spaces."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards of quality and craftsmanship in every project we undertake."
    },
    {
      icon: Calendar,
      title: "Sustainability",
      description: "We're committed to creating environmentally responsible designs that benefit future generations."
    }
  ]

  const milestones = [
    { year: "2003", event: "ARCH Studio founded with a vision to transform architectural design" },
    { year: "2008", event: "Completed our first major commercial project - Downtown Business Center" },
    { year: "2012", event: "Received our first international architecture award for sustainable design" },
    { year: "2015", event: "Expanded operations to include urban planning and landscape architecture" },
    { year: "2018", event: "Reached milestone of 100 completed projects across residential and commercial sectors" },
    { year: "2021", event: "Launched our green building certification program" },
    { year: "2024", event: "Celebrating 20+ years of architectural excellence with 150+ completed projects" }
  ]

  return (
    <>
      <Head title="About Us - ARCH Studio" />
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
                  <Link href="/projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                    Projects
                  </Link>
                  <Link href="/about" className="text-gray-900 px-3 py-2 text-sm font-medium border-b-2 border-gray-900">
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
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
              alt="Our Studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              About
              <span className="block font-bold">ARCH Studio</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
              Two decades of architectural excellence, innovation, and sustainable design
            </p>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                  Our
                  <span className="block font-bold">Story</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded in 2003, ARCH Studio began with a simple yet ambitious vision: to create architectural
                  masterpieces that not only serve their functional purpose but also inspire and elevate the human experience.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Over the past two decades, we have grown from a small team of passionate architects to a
                  comprehensive design studio, completing over 150 projects across residential, commercial,
                  and cultural sectors.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our commitment to sustainable design, innovative solutions, and collaborative partnerships
                  has earned us recognition in the architectural community and the trust of clients worldwide.
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
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=700&fit=crop"
                  alt="Our Office"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                Our
                <span className="block font-bold">Values</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide our work and define our approach to architectural excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                Meet Our
                <span className="block font-bold">Team</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The talented professionals behind our architectural innovations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                Our
                <span className="block font-bold">Journey</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Key milestones in our architectural evolution
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{milestone.year}</div>
                      <p className="text-gray-600 leading-relaxed">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Ready to Work
              <span className="block font-bold">With Us?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your architectural vision and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg backdrop-blur-sm"
                >
                  View Our Work
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
