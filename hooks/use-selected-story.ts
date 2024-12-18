import { Doc, Id } from '@/convex/_generated/dataModel';
import { atom, useAtom } from 'jotai'

type ModalState = Doc<"stories"> & { [key: string]: any } | null;

const modalState = atom<ModalState>(null);

export const useSelectedStory = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
