"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import useCustomerRegisterModal from "@/hooks/useCustomerRegisterModal";

import Modal from "../../../components/Modal";
import Image from "next/image";
import ModalQrCode from "@/components/ModalQrCode";

const ClientRegisterModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const {session} = useSessionContext();
  const {onClose, isOpen} = useCustomerRegisterModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <ModalQrCode
      title=""
      description=""
      isOpen={isOpen}
      onChange={onChange}
    >
      <div
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/register_qrcode.png"
          alt="Next.js Logo"
          width={380}
          height={237}
          priority
        />
      </div>

    </ModalQrCode>
  );
};

export default ClientRegisterModal;
