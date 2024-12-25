import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface Props {
    title: string
    description?: string
    onSubmit: any
    open: boolean
    onClose: any
    loading?: boolean
}

const AlertModal = ({ title, description, onSubmit, open, onClose, loading = false }: Props) => {

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent>

                    <DialogTitle className="mt-5.5 pb-2 text-xl font-bold text-neutral-700 dark:text-white sm:text-2xl">
                        {title}
                    </DialogTitle>

                    <p className="mb-10 text-neutral-800 ">
                        {description}
                    </p>

                    <div className="-mx-3 flex flex-wrap gap-y-4">
                        <div className="w-1/2 px-3">
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:bg-gray/75 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="w-1/2 px-3">
                            <button
                                onClick={onSubmit}
                                disabled={loading}
                                className="block w-full rounded border border-destructive bg-destructive disabled:bg-destructive/80 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                            >
                                {loading ? 'Proceeding...' : 'Proceed'}
                            </button>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default AlertModal
