"use client"

import Image from "next/image";
import useCustomerRegisterModal from "@/hooks/useCustomerRegisterModal";
import useStampModal from "@/hooks/useStampModal";
import {HiArrowRight, HiUser} from "react-icons/hi2";
import {HiCollection} from "react-icons/hi";

export default function Home() {
  const customerRegisterModal = useCustomerRegisterModal();
  const stampModal = useStampModal();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2 w-full items-center justify-between">
        <p className="fixed left-0 top-0 flex w-full text-2xl justify-center lg:static lg:w-auto lg:rounded-xl ">
          Welcome!
        </p>
        <div
          className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex text-sm place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.voltaai.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image
              src="voltaai.svg"
              alt="VoltaAi Logo"
              className="dark:invert"
              width={105}
              height={29}
              priority
            />
          </a>
        </div>
      </div>

      <div
        className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="minha_cafeteria-logo.svg"
          alt="Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 w-full items-center justify-between">
        {/* Register */}
        <button
          onClick={customerRegisterModal.onOpen}
          className="group rounded-lg border border-transparent text-left px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold flex items-center justify-between `}>
            Register{" "}
            <HiUser
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"/>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Register a new client.
          </p>
        </button>

        {/* Stamp */}
        <button
          onClick={stampModal.onOpen}
          className="group rounded-lg border border-transparent text-left px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold flex items-center justify-between `}>
            Stamp{" "}
            <HiCollection
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"/>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Mark a stamp to a client&apos;s card.
          </p>
        </button>
        <div className={`divider`}></div>
        <button
          className="group rounded-lg border border-transparent text-left px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold flex items-center justify-between `}>
            Logout{" "}
            <HiArrowRight
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"/>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            We&apos;re closed.
          </p>
        </button>
      </div>
    </main>
  );
}
