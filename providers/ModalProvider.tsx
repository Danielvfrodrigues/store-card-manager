"use client"

import AuthModal from "@/components/AuthModal";
import CustomerRegisterModal from "@/app/(site)/components/CustomerRegisterModal";

import { useEffect, useState } from "react";
import StampModal from "@/app/(site)/components/StampModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return(
        <>
            <AuthModal />
            <CustomerRegisterModal />
            <StampModal />
        </>
    );
}
export default ModalProvider;