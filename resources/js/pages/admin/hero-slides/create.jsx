import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function HeroSlidesCreate() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    subtitle: '',
    is_active: true,
    image: null
  })

  const submit = (e) => {
    e.preventDefault()
    post('/admin/hero-slides')
  }

  return (
    <AppLayout>
      <Head title="Create Hero Slide" />
      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg p-6 space-y-4">
            <h1 className="text-xl font-semibold">Create Hero Slide</h1>
            <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={data.title} onChange={(e) => setData('title', e.target.value)} />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input value={data.subtitle} onChange={(e) => setData('subtitle', e.target.value)} />
              </div>
              {/* Buttons removed by request */}
              {/* No sort order */}
              <div>
                <Label>Image *</Label>
                <Input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0])} />
                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Link href={'/admin/hero-slides'}>
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


