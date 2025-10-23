import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'

export default function Error404() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <SiteNav />
            
            {/* Main Content */}
            <main className="flex-1 pt-16">
                <div className="flex min-h-[80vh] items-center justify-center px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        {/* Error Code */}
                        <div className="mb-8">
                            <h1 className="text-9xl font-black text-gray-200">404</h1>
                            <div className="relative -mt-16">
                                <h2 className="text-4xl font-bold text-gray-900">Page non trouvée</h2>
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="mb-8">
                            <p className="text-lg text-gray-600 mb-4">
                                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                            </p>
                            <p className="text-sm text-gray-500">
                                Il est possible que l'URL soit incorrecte ou que la page ait été supprimée.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Button asChild size="lg" className="gap-2">
                                <Link href="/">
                                    <Home className="h-4 w-4" />
                                    Retour à l'accueil
                                </Link>
                            </Button>
                            
                            <Button asChild variant="outline" size="lg" className="gap-2">
                                <Link href="/projects">
                                    <Search className="h-4 w-4" />
                                    Voir nos projets
                                </Link>
                            </Button>
                        </div>

                        {/* Suggestions */}
                        <div className="max-w-lg mx-auto">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Que pouvez-vous faire ?
                            </h3>
                            <ul className="text-sm text-gray-600 space-y-2 text-left">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                    Vérifiez l'orthographe de l'URL
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                    Utilisez le menu de navigation
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                    Retournez à la page d'accueil
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                    Contactez-nous si le problème persiste
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <SiteFooter />
        </div>
    )
}
