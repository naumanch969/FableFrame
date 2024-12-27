import { Comment } from '@/types';
import { atom, useAtom } from 'jotai'

type ModalState = Comment & { [key: string]: any } | null;

const modalState = atom<ModalState>(null);

export const useSelectedComment = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
