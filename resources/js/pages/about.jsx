import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Users, Award, Calendar, Target } from "lucide-react"
import { Head, Link } from '@inertiajs/react'
import logo from "../../assets/images/A1.png"

export default function About({ milestones = [] }) {
    const team = [

        {
            id: 1,
            name: "Abderrahim KASSOU",
            role: "Architecte-urbaniste DPLG",
            image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face",
            bio: "Architecte-urbaniste DPLG (Paris-La Villette), également diplômé en anthropologie (Paris VIII) et en géographie-aménagement (Tours). Avec près de 20 ans de pratique libérale, il a réalisé des projets de logements, d’équipements culturels, d’aménagements touristiques et de réhabilitation patrimoniale. Ancien président de Casamémoire, il est engagé dans plusieurs associations (Forum Marocain des Alternatives, Architecture & Développement) et fut membre du Conseil National des Droits de l��Homme."
        },
        {
            id: 2,
            name: "Mustapha CHAKIB",
            role: "Architecte",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
            bio: "Architecte diplômé de l’ESA Paris, il a débuté sa carrière à la Direction de l’Urbanisme en tant que chef de service des plans d’aménagement de la zone Nord. Avec plus de 25 ans d’expérience, il exerce en libéral et a conduit de nombreux projets urbains d’envergure, alliant conception, supervision et gestion de dossiers complexes avec l’administration."
        },

    ]

    const values = [
        {
            icon: Target,
            title: "Innovation",
            description: "Nous repoussons les limites du design architectural en intégrant des technologies de pointe et des solutions créatives."
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "Nous croyons en une collaboration étroite avec nos clients, les communautés et nos partenaires pour créer des espaces porteurs de sens."
        },
        {
            icon: Award,
            title: "Excellence",
            description: "Nous maintenons les plus hauts standards de qualité et de savoir‑faire dans chacun de nos projets."
        },
        {
            icon: Calendar,
            title: "Durabilité",
            description: "Nous nous engageons à concevoir des projets respectueux de l’environnement, bénéfiques pour les générations futures."
        }
    ]



    return (
        <>
            <Head title="À propos - ARCH Studio" />
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-[#dfdfdf] backdrop-blur-sm border-b border-gray-100 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <Link href="/" className="flex items-center space-x-2">
                                        <img src={logo}
                                            className='w-[55px] aspect-square object-cover'
                                            alt="" />
                                    </Link>
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-8">
                                    <Link href="/projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                                        Projets
                                    </Link>
                                    <Link href="/about" className="text-gray-900 px-3 py-2 text-sm font-medium border-b-2 border-gray-900">
                                        À propos
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
                            alt="Notre studio"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                        <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                            À propos
                            <span className="block font-bold">ARCH Studio</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                            Deux décennies d’excellence architecturale, d’innovation et de design durable
                        </p>
                    </div>
                </section>

                {/* Company Story Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                    Notre
                                    <span className="block font-bold">histoire</span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Fondé en 2003, ARCH Studio est né d’une vision simple mais ambitieuse : créer des œuvres architecturales qui, au-delà de leur fonction, inspirent et élèvent l’expérience humaine.
                                </p>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Au cours des deux dernières décennies, nous sommes passés d’une petite équipe d’architectes passionnés à un studio de design complet, réalisant plus de 150 projets dans les secteurs résidentiel, commercial et culturel.
                                </p>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Notre engagement en faveur d’un design durable, de solutions innovantes et de partenariats collaboratifs nous a valu une reconnaissance dans la communauté architecturale et la confiance de clients à travers le monde.
                                </p>
                                <div className="grid grid-cols-3 gap-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
                                        <div className="text-sm text-gray-600">Projets réalisés</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
                                        <div className="text-sm text-gray-600">Distinctions obtenues</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-900 mb-2">20+</div>
                                        <div className="text-sm text-gray-600">Années d’expérience</div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=700&fit=crop"
                                    alt="Notre bureau"
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
                                Nos
                                <span className="block font-bold">valeurs</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Les principes qui guident notre travail et définissent notre approche de l’excellence architecturale
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
                                Notre
                                <span className="block font-bold">équipe</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Les professionnels talentueux à l’origine de nos innovations architecturales
                            </p>
                        </div>

                        <div className="flex item-center justify-center w-full gap-8">
                            {team.map((member) => (
                                <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl w-[25%] transition-shadow">
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
                                Notre
                                <span className="block font-bold">parcours</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Les étapes clés de notre évolution architecturale
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>

                            {milestones.length > 0 ? milestones.map((milestone, index) => (
                                <div key={milestone.id} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <div className="text-2xl font-bold text-gray-900 mb-2">{milestone.year}</div>
                                            <div className="text-lg font-semibold text-gray-800 mb-2">{milestone.title}</div>
                                            <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full border-4 border-white"></div>
                                </div>
                            )) : (
                                <div className="text-center py-12">
                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">Aucune étape disponible pour le moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-gray-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Prêt à travailler
                            <span className="block font-bold">avec nous ?</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Discutons de votre vision architecturale et créons ensemble quelque chose d’exceptionnel.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg">
                                    Nous contacter
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/projects">
                                <Button
                                    size="lg"
                                    className="bg-white/10 text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg backdrop-blur-sm"
                                >
                                    Voir nos réalisations
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
                                    <img src={logo}
                                        className='w-[55px] aspect-square object-cover'
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
                                    <li>+1 (555) 123-4567</li>
                                    <li>hello@archstudio.com</li>
                                    <li>123 Design Street<br />New York, NY 10001</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ARCH Studio. Tous droits réservés.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
