import { StoryReport } from '@/types';
import { atom, useAtom } from 'jotai'

type ModalState = StoryReport & { [key: string]: any } | null;

const modalState = atom<ModalState>(null);

export const useSelectedReport = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
