import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SponsorsEdit({ sponsor }) {
  const { data, setData, post, processing, errors, delete: destroy } = useForm({
    _method: 'put',
    name: sponsor?.name || '',
    url: sponsor?.url || '',
    is_active: sponsor?.is_active ?? true,
    logo: null
  })

  const submit = (e) => {
    e.preventDefault()
    post(`/admin/sponsors/${sponsor.id}`)
  }

  const onDelete = (e) => {
    e.preventDefault()
    destroy(`/admin/sponsors/${sponsor.id}`)
  }

  return (
    <AppLayout>
      <Head title={`Edit Sponsor`} />
      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg p-6 space-y-4">
            <h1 className="text-xl font-semibold">Edit Sponsor</h1>
            <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <Label>URL</Label>
                <Input value={data.url} onChange={(e) => setData('url', e.target.value)} />
              </div>
              {/* No sort order */}
              <div>
                <Label>Replace Logo</Label>
                <Input type="file" accept="image/*" onChange={(e) => setData('logo', e.target.files[0])} />
                {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
                {sponsor?.logo_path && (
                  <img src={sponsor.logo_path} alt="current" className="h-20 mt-2" />
                )}
              </div>
              <div className="flex justify-between gap-2">
                <Button type="button" variant="destructive" onClick={onDelete}>Delete</Button>
                <div className="flex gap-2">
                  <Link href={'/admin/sponsors'}>
                    <Button variant="outline" type="button">Cancel</Button>
                  </Link>
                  <Button disabled={processing} className="bg-primary-600 hover:bg-primary-700" type="submit">Save</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}


