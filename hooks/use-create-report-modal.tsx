import { atom, useAtom } from 'jotai'

const modalState = atom(false)

export const useCreateReportModal = () => {
  return useAtom(modalState)
}