import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SponsorsCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    url: '',
    is_active: true,
    logo: null
  })

  const submit = (e) => {
    e.preventDefault()
    post('/admin/sponsors')
  }

  return (
    <AppLayout>
      <Head title="Create Sponsor" />
      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg p-6 space-y-4">
            <h1 className="text-xl font-semibold">Create Sponsor</h1>
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
                <Label>Logo *</Label>
                <Input type="file" accept="image/*" onChange={(e) => setData('logo', e.target.files[0])} />
                {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Link href={'/admin/sponsors'}>
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button disabled={processing} className="bg-primary-600 hover:bg-primary-700" type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}


