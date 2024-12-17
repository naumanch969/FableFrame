import { atom, useAtom } from 'jotai'

type ModalState = boolean; 

const modalState = atom<ModalState>(false);

export const useCreateShareModal = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
