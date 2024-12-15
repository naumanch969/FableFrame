import { Doc, Id } from '@/convex/_generated/dataModel';
import { atom, useAtom } from 'jotai'

// Define the type for the modal state
type ModalState = Doc<"stories"> | null;  // Replace 'string' with the appropriate type if needed



// Create an atom with the initial value as null
const modalState = atom<ModalState>(null);

// Custom hook to use the selected story state
export const useSelectedStory = (): [ModalState, (value: ModalState) => void] => {
    return useAtom(modalState);
}
