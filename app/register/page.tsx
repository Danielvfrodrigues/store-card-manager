"use client"

import Image from "next/image";
import useCustomerRegisterModal from "@/hooks/useCustomerRegisterModal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {useState} from "react";

import {useRouter} from "next/navigation";

import {useSupabaseClient} from "@supabase/auth-helpers-react";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import toast from "react-hot-toast";


export default function Home() {
  const customerRegisterModal = useCustomerRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      //uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile) {
        toast.error("Missing fields.");
        return;
      }

      const uniqueId = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload.");
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload.");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          // user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      // uploadModal.onClose();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center lg:justify-between p-24 dark:bg-neutral-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-sans lg:flex">
        <p className="fixed left-0 top-0 flex w-full text-2xl justify-center lg:static lg:w-auto lg:rounded-xl ">
          Registration
        </p>

        {/* Voltaai */}
        <div
          className="fixed bottom-0 left-0 flex h-48 text-sm w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.voltaai.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image
              src="voltaai.svg"
              alt="VoltaAi Logo"
              className="dark:invert"
              width={85}
              height={9}
              priority
            />
          </a>
        </div>
      </div>

      {/* BODY */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          <Input
            id="name"
            disabled={isLoading}
            {...register("name", {required: true})}
            placeholder="Name"
          />
          <Input
            id="email"
            disabled={isLoading}
            {...register("email", {required: true})}
            placeholder="Email"
          />
          <div className="mt-8">
            <div className="pb-1 ms-1 text-sm">Choose an image file.</div>
            <Input
              id="image"
              type="file"
              disabled={isLoading}
              accept="image/*"
              {...register("image", {required: true})}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="mt-4">
            Registrar
          </Button>
        </form>
      </div>
    </main>
  );
}
