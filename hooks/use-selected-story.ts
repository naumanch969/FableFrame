import { Story } from '@/types';
import { atom, useAtom } from 'jotai'

type ModalState = Story & { [key: string]: any } | null;

const modalState = atom<ModalState>(null);

export const useSelectedStory = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
