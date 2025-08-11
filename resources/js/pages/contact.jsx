import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import { Head, Link, useForm } from '@inertiajs/react'
import { useModal } from '@/components/ui/modal'
import logo from "../../assets/images/A1.png"

export default function Contact() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    budget: '',
    message: ''
  })

  const { showSuccess, ModalComponent } = useModal()

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/contact', {
      onSuccess: () => {
        reset()
        showSuccess(
          'Message Sent Successfully!',
          'Thank you for your message! We will get back to you soon.'
        )
      }
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Call us during business hours"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@archstudio.com", "projects@archstudio.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Design Street", "New York, NY 10001"],
      description: "Visit us for consultations"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "Closed on Sundays"
    }
  ]

  const projectTypes = [
    "Residential Design",
    "Commercial Architecture",
    "Interior Design",
    "Urban Planning",
    "Renovation",
    "Consultation",
    "Other"
  ]

  const budgetRanges = [
    "Under $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "$250,000 - $500,000",
    "$500,000 - $1,000,000",
    "Over $1,000,000"
  ]

  return (
    <>
      <Head title="Contact Us - ARCH Studio" />
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
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              Let's Create
              <span className="block font-bold">Together</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
              Ready to bring your architectural vision to life? We're here to help you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                Get In
                <span className="block font-bold">Touch</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Multiple ways to reach us. Choose what works best for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                  Start Your
                  <span className="block font-bold">Project</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Tell us about your project and we'll get back to you with a detailed proposal and timeline.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        id="project_type"
                        name="project_type"
                        required
                        value={data.project_type}
                        onChange={(e) => setData('project_type', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.project_type && <p className="text-red-600 text-sm mt-1">{errors.project_type}</p>}
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={data.budget}
                        onChange={(e) => setData('budget', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={data.message}
                      onChange={(e) => setData('message', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={processing}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg font-medium tracking-wide transition-all duration-300"
                  >
                    {processing ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>

              {/* Office Image and Info */}
              <div>
                <div className="relative mb-8">
                  <img
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=700&fit=crop"
                    alt="Our Office"
                    className="w-full h-96 object-cover rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Visit Our Studio</h3>
                    <p className="text-gray-200">Experience our design process firsthand</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose ARCH Studio?</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>20+ years of architectural excellence</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>150+ successful projects completed</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Award-winning sustainable design approach</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Collaborative design process</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Full-service architectural solutions</span>
                      </li>
                    </ul>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                Frequently Asked
                <span className="block font-bold">Questions</span>
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our services and process
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "What is your typical project timeline?",
                  answer: "Project timelines vary depending on scope and complexity. Residential projects typically take 3-6 months for design and 6-12 months for construction. Commercial projects may take 6-18 months or more. We'll provide a detailed timeline during our initial consultation."
                },
                {
                  question: "Do you handle both design and construction?",
                  answer: "We specialize in architectural design and work with trusted construction partners. We can recommend qualified contractors and provide construction oversight to ensure your project is built according to our designs."
                },
                {
                  question: "What are your fees for architectural services?",
                  answer: "Our fees vary based on project scope, complexity, and services required. We typically charge a percentage of construction cost or an hourly rate for smaller projects. We'll provide a detailed proposal after our initial consultation."
                },
                {
                  question: "Do you work on projects outside of New York?",
                  answer: "Yes, we work on projects throughout the United States and internationally. For projects outside our local area, we coordinate with local professionals and may require additional travel expenses."
                },
                {
                  question: "How do you incorporate sustainability into your designs?",
                  answer: "Sustainability is core to our design philosophy. We incorporate energy-efficient systems, sustainable materials, passive design strategies, and green building certifications like LEED when appropriate."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center space-x-3 mb-6">
                  <img src={logo}
                    className='w-[50px] aspect-square object-cover'
                    alt="ARCH Studio" />
                  <span className="text-3xl font-light tracking-wider text-primary-300">ARCH</span>
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

      {/* Modal Component */}
      <ModalComponent />
    </>
  )
}
