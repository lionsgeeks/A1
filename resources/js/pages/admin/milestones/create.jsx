import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import { router } from '@inertiajs/react'
import {
    FormSection,
    FormField,
    FormActions,
    PageHeader,
    PageContent,
    PageContainer
} from '@/components/admin'

export default function MilestoneCreate() {
    const [data, setData] = useState({
        year: '',
        title: '',
        description: '',
        sort_order: 0,
        is_active: true
    })
    const [errors, setErrors] = useState({})
    const [processing, setProcessing] = useState(false)

    const breadcrumbs = [
        { title: 'Admin', href: '/admin' },
        { title: 'Milestones', href: '/admin/milestones' },
        { title: 'Create', href: '/admin/milestones/create' }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setProcessing(true)

        router.post('/admin/milestones', data, {
            onSuccess: () => {
                setProcessing(false)
            },
            onError: (errors) => {
                setErrors(errors)
                setProcessing(false)
            }
        })
    }

    const handleChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }))
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Milestone" />

            <PageContainer>
                <PageHeader
                    title="Create Milestone"
                    description="Add a new milestone to the timeline"
                    actions={[
                        {
                            label: 'Back to Milestones',
                            icon: ArrowLeft,
                            href: '/admin/milestones',
                            variant: 'outline'
                        }
                    ]}
                />

                <PageContent>
                    <div className="w-full p-6">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <FormSection
                                title="Milestone Information"
                                description="Enter the basic information for this milestone"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        label="Year"
                                        required
                                        error={errors.year}
                                    >
                                        <input
                                            type="text"
                                            value={data.year}
                                            onChange={(e) => handleChange('year', e.target.value)}
                                            placeholder="e.g., 2020"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </FormField>

                                    <FormField
                                        label="Sort Order"
                                        error={errors.sort_order}
                                        help="Lower numbers appear first"
                                    >
                                        <input
                                            type="number"
                                            value={data.sort_order}
                                            onChange={(e) => handleChange('sort_order', parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </FormField>
                                </div>

                                <FormField
                                    label="Title"
                                    required
                                    error={errors.title}
                                >
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g., Company Founded"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </FormField>

                                <FormField
                                    label="Description"
                                    required
                                    error={errors.description}
                                >
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        placeholder="Describe this milestone..."
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </FormField>
                            </FormSection>

                            <FormSection
                                title="Status"
                                description="Set the visibility of this milestone"
                            >
                                <FormField
                                    label="Active"
                                    error={errors.is_active}
                                >
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => handleChange('is_active', e.target.checked)}
                                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                        />
                                        <label htmlFor="is_active" className="text-sm text-gray-700">
                                            Show this milestone on the timeline
                                        </label>
                                    </div>
                                </FormField>
                            </FormSection>

                            <FormActions>
                                <Link href="/admin/milestones">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? 'Creating...' : 'Create Milestone'}
                                </Button>
                            </FormActions>
                        </form>
                    </div>
                </PageContent>
            </PageContainer>
        </AppLayout>
    )
}
