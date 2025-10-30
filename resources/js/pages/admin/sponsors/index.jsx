import { Head, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { route } from 'ziggy-js'

export default function SponsorsIndex({ sponsors = [] }) {
  return (
    <AppLayout>
      <Head title="partenaires" />
      <div className="py-12">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">partenaires</h1>
            <Link href={'/admin/sponsors/create'}>
              <Button className="bg-primary-600 hover:bg-primary-700">New partenaire</Button>
            </Link>
          </div>

          <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sponsors.map((sponsor) => (
                  <tr key={sponsor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={`/storage/${sponsor.logo_path}`} alt="logo" className="h-12 w-24 object-contain" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{sponsor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sponsor.url || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/sponsors/${sponsor.id}/edit`} className="text-primary-600 hover:text-primary-900">Edit</Link>
                    </td>
                  </tr>
                ))}
                {sponsors.length === 0 && (
                  <tr>
                    <td className="px-6 py-6 text-center text-gray-500" colSpan={4}>No sponsors yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}


