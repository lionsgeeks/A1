import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Instagram, Twitter, Linkedin, Award, Users, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Chen",
      role: "Principal Architect",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      bio: "With over 15 years of experience, Sarah leads our design vision with a focus on sustainable architecture.",
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Designer",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      bio: "Michael specializes in urban planning and has contributed to major city development projects worldwide.",
    },
    {
      name: "Emily Watson",
      role: "Project Manager",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      bio: "Emily ensures every project is delivered on time and exceeds client expectations through meticulous planning.",
    },
    {
      name: "David Kim",
      role: "Sustainability Consultant",
      image: "https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556",
      bio: "David brings expertise in green building technologies and environmental impact assessment.",
    },
  ]

  const milestones = [
    {
      year: "2003",
      event: "ARCH Studio Founded",
      description: "Started with a vision to create sustainable architecture",
    },
    { year: "2008", event: "First Major Award", description: "Received the Regional Architecture Excellence Award" },
    { year: "2012", event: "International Expansion", description: "Opened offices in San Francisco and Chicago" },
    { year: "2018", event: "100th Project Milestone", description: "Celebrated completing our 100th major project" },
    { year: "2021", event: "Sustainability Leadership", description: "Became carbon-neutral certified firm" },
    { year: "2024", event: "Innovation Lab Launch", description: "Opened our research and development facility" },
  ]

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
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Projects
                </Link>
                <Link href="/about" className="text-gray-900 px-3 py-2 text-sm font-medium border-b-2 border-gray-900">
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
            alt="About ARCH Studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            About
            <span className="block font-bold">ARCH</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Two decades of architectural excellence, innovation, and sustainable design
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                Our
                <span className="block font-bold">Story</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2003, ARCH Studio began with a simple yet ambitious vision: to create architectural spaces
                that not only serve their functional purpose but also inspire and elevate the human experience.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Over the past two decades, we have grown from a small team of passionate architects to an
                internationally recognized firm, completing over 150 projects across residential, commercial, and
                cultural sectors.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our commitment to sustainable design and innovative solutions has earned us numerous awards and, more
                importantly, the trust of clients who share our vision for a better built environment.
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
              <Image
                src="https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556"
                alt="ARCH Studio Office"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
              Our
              <span className="block font-bold">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the talented professionals who bring our architectural visions to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
              Our
              <span className="block font-bold">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped our growth and success over the years
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive for the highest standards in every project, ensuring exceptional quality and attention to
                detail.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in the power of teamwork, working closely with clients and partners to achieve shared goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We embrace new technologies and creative solutions to push the boundaries of architectural design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to Work
            <span className="block font-bold">Together?</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your architectural vision to life with our expertise and passion.
          </p>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg">
            Start a Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
