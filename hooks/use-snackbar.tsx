import { atom, useAtom } from 'jotai'

type ModalState = string;

const modalState = atom<ModalState>('');

export const useSnackbar = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
