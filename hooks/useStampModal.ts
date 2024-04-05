import { create } from "zustand"

interface StampModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useStampModal = create<StampModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStampModal;