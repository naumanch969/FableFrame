import { atom, useAtom } from 'jotai'

type ModalState = '' | 'delete-story' | 'delete-comment' | 'delete-account' | 'delete-report';

const modalState = atom<ModalState>('');

export const useAlertModal = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
