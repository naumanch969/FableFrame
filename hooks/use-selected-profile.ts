import { Profile } from '@/types';
import { atom, useAtom } from 'jotai'

type ModalState = Profile & { [key: string]: any } | null;

const modalState = atom<ModalState>(null);

export const useSelectedProfile = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
