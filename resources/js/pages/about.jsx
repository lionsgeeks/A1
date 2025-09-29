import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Users, Award, Calendar, Target, Lightbulb } from "lucide-react"
import { Head, Link } from '@inertiajs/react'
import logo from "../../assets/images/A1.png"

export default function About({ milestones = [] }) {
    const team = [
        {
            id: 1,
            name: "CHAKIB Mustapha",
            role: "Architecte Associé",
            image: null,
            bio: "Fondateurs de l’agence, Mustapha orchestre les projets d’envergure avec une solide maîtrise des enjeux urbains et administratifs."
        },
        {
            id: 2,
            name: "KASSOU Abderrahim",
            role: "Architecte Associé",
            image: null,
            bio: "Fondateur investi dans la société civile, Abderrahim apporte à l’agence une vision élargie, nourrie par ses engagements associatifs et citoyens."
        },
        {
            id: 3,
            name: "BOUNASRI Aymen",
            role: "Architecte senior",
            image: null,
            bio: "Référence technique de l’équipe, Aymen veille à la précision des détails et à la transmission des savoir-faire auprès des plus jeunes."
        },
        {
            id: 4,
            name: "MABROUR Salma",
            role: "Architecte chargée de projet",
            image: null,
            bio: "Avec une approche créative et structurée, Salma pilote les opérations et incarne le lien entre conception et réalisation."
        },
        {
            id: 5,
            name: "KHABBAR Salma",
            role: "Architecte chargée de projet junior",
            image: null,
            bio: "Jeune voix de l’Atelier, Salma apporte une fraîcheur d’idées et une énergie nouvelle au sein des projets collectifs."
        },
        {
            id: 6,
            name: "MRANI Loubna",
            role: "Office Manager",
            image: null,
            bio: "Véritable cheville ouvrière de l’organisation, Loubna veille à la fluidité des démarches et à la rigueur des process internes."
        },
        {
            id: 7,
            name: "LKAYATI Malika",
            role: "Dessinatrice Projeteuse",
            image: null,
            bio: "Spécialiste des détails, Malika s’assure que chaque plan traduit fidèlement l’intention architecturale, en mettant l’accent sur la clarté et la qualité d’exécution."
        },
        {
            id: 8,
            name: "RIAHI Said",
            role: "Dessinateur Projeteur",
            image: null,
            bio: "Avec un œil attentif sur les structures et la précision des plans, Said transforme les concepts en documents techniques fiables, optimisant faisabilité et solidité des projets."
        },
        {
            id: 9,
            name: "AL ZEMOURI ABDERRAHMAN",
            role: "Infographiste 3D",
            image: null,
            bio: "Spécialiste de la représentation visuelle, Abderrahman donne vie aux idées en images, avec une attention particulière portée au détail et à la justesse des atmosphères."
        },
        {
            id: 10,
            name: "Astit Omar",
            role: "Agent logistique",
            image: null,
            bio: "Dernier maillon mais essentiel, Omar relie l’agence au terrain avec efficacité et fiabilité."
        }
    ];

    const values = [
        {
            icon: Users,
            title: "Dialogue et coopération",
            description: "Nous plaçons l’échange au cœur du processus, en favorisant un dialogue continu entre maîtrise d’ouvrage, usagers et concepteurs, pour faire émerger des projets porteurs de sens."
        },
        {
            icon: MapPin,
            title: "Ancrage territorial",
            description: "Chaque projet s’enracine dans son contexte urbain, paysager et culturel, afin de révéler les spécificités locales et valoriser le patrimoine existant."
        },
        {
            icon: Lightbulb,
            title: "Innovation responsable",
            description: "Nous explorons des solutions contemporaines et durables, intégrant les avancées techniques et environnementales tout en respectant les ressources et les usages."
        },
        {
            icon: Award,
            title: "Exigence et qualité",
            description: "Du dessin initial au chantier, nous cultivons une rigueur constante afin de garantir la cohérence, la précision et la pérennité de nos réalisations."
        }
    ];




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
                            À propos <span className="block font-bold">ARCH Studio</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                            Depuis ses débuts, l’Atelier s’est construit autour d’une vision partagée :
                            concevoir des espaces qui reflètent la richesse des contextes urbains et
                            culturels dans lesquels ils s’inscrivent.                        </p>
                    </div>
                </section>

                {/* Company Story Section */}
                <section className="py-24 bg-gray-50">
                    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start px-6 lg:px-20 py-16 bg-gray-50">
                            {/* Left Content */}
                            <div>
                                {/* Heading */}
                                <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 leading-tight">
                                    Notre <span className=" font-bold text-primary-600">histoire</span>
                                </h2>

                                {/* Intro */}
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    L’agence a été fondée avec la volonté de développer une pratique architecturale construite autour du projet urbain et territorial.
                                    Cette approche, basée sur près de 20 ans d’expérience des architectes Abderrahim Kassou et Mustapha Chakib et de leur équipe,
                                    s’articule autour d’un dialogue continu entre les acteurs du projet, le programme et le site.
                                </p>

                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    La trajectoire de l’agence s’est construite autour de projets d’une grande diversité de programmes, de sites et d’échelles qui vont
                                    de la réalisation de complexes intégrés aux aménagements urbains en passant par la conception et la réalisation d’équipements
                                    structurants. Les fondateurs de Atelier A1 étaient préalablement membres fondateurs de l’agence Kilo. A ce titre, ils ont participé
                                    à la production d’une architecture résolument contemporaine et ont participé au renouveau de la scène architecturale au Maroc durant
                                    toutes les années 2000.
                                </p>

                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Agissant aussi bien dans les domaines de l’architecture que de l’urbanisme, du paysage et de l’aménagement, l’équipe de Atelier
                                    A1 est composée d’architectes, urbanistes, décorateurs et projeteurs ayant développé une connaissance fine et complexe du tissu
                                    urbain marocain.
                                </p>



                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-6 mt-12">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">190+</div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                                            projets achevés
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">5+</div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                                            concours gagnés
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                                            années d’expérience
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="relative mt-10 lg:mt-20">
                                <img
                                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=700&fit=crop"
                                    alt="Notre bureau"
                                    className="w-full h-[700px] object-cover rounded-2xl shadow-xl"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>


                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                Nos <span className="font-bold">valeurs</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Notre démarche repose sur des convictions fortes qui orientent
                                chaque projet et guident notre manière de concevoir et de construire.                            </p>
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
                                Notre  <span className=" font-bold">équipe</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Une équipe pluridisciplinaire où chaque parcours et chaque talent
                                contribue à la richesse de l’Atelier.                            </p>
                        </div>

                        <div className="w-full flex flex-wrap justify-center gap-8">
                            {team.slice(0, 2).map((member) => (
                                <div
                                    key={member.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl w-[45%] transition-shadow"
                                >
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

                            {team.slice(2).map((member) => (
                                <div
                                    key={member.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl w-[22%] transition-shadow"
                                >
                                    {/* <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-64 object-cover"
                                    /> */}
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
                                NOTRE <span className=" font-bold">PARCOURS</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Depuis ses origines, l’Atelier s’est construit au fil de rencontres, de
                                projets et d’engagements qui ont façonné sa trajectoire.                            </p>
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
                                    <li>+212 5 2247 49 91</li>
                                    <li>info@ateliera1.com </li>
                                  <li>217 angle rue fraternité  et bd zerktouni 3 ème étage 20 000 Casablanca</li>
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
