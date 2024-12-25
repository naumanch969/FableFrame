import React from 'react'
import { Dialog } from '@/components/ui/dialog'

interface Props { open: boolean, setOpen: any, title: string, message: string, onSubmit: any, loading: boolean }

const AlertModal: React.FC<Props> = ({ open, setOpen, title, message, onSubmit, loading }) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <div className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:py-15"  >
        <span className="mx-auto inline-block">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.1"
              width="60"
              height="60"
              rx="30"
              fill="#DC2626"
            />
            <path
              d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
              stroke="#DC2626"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          {title}
        </h3>
        <p className="mb-10">
          {message}
        </p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-1/2 px-3">
            <button
              onClick={() => setOpen(false)}
              disabled={Boolean(loading)}
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:bg-gray/75 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              Cancel
            </button>
          </div>
          <div className="w-1/2 px-3">
            <button
              onClick={() => onSubmit()}
              disabled={Boolean(loading)}
              className="block w-full rounded border border-destructive bg-destructive disabled:bg-destructive/80 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              {Boolean(loading) ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AlertModal
