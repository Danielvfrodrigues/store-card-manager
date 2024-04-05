"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useSessionContext, useSupabaseClient,} from "@supabase/auth-helpers-react";

import Modal from "../../../components/Modal";
import useStampModal from "@/hooks/useStampModal";
import BigButton from "@/components/BigButton";
import {BiQrScan} from "react-icons/bi";
import Input from "@/components/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import Button from "@/components/Button";

const StampModal = () => {
  useSupabaseClient();
  useRouter();
  const {session} = useSessionContext();
  const {onClose, isOpen} = useStampModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const {register, handleSubmit, reset} = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

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
      const {data: songData, error: songError} = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload.");
      }

      const {error: supabaseError} = await supabaseClient
        .from("songs")
        .insert({
          // user_id: user.id,
          title: values.title,
          author: values.author,
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
    <Modal
      title="Stamp"
      description="Mark a stamp to a client's card."
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col gap-y-4">
        <BigButton onClick={() => {}} className={`text-xl font-semibold`}>
          QR-CODE{" "}
          <BiQrScan
            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"/>
        </BigButton>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          <Input
            id="email"
            disabled={isLoading}
            {...register("email", {required: true})}
            placeholder="Email"
          />
          <Button disabled={isLoading} type="submit" >
            Carimbar
          </Button>
        </form>
      </div>

    </Modal>
  );
};

export default StampModal;
