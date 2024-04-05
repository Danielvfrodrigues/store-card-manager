import { create } from "zustand"

interface CustomerRegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCustomerRegisterModal = create<CustomerRegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCustomerRegisterModal;