import {
  CloseButton,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Textarea,
} from "@headlessui/react";
import Button from "./Button";
import Text from "./Text";
import Heading from "./Heading";
import Link from "next/link";
import TextField from "./TextField";
import CopyTextButton from "./CopyTextButton";
import AccentText from "./AccentText";
import Image from "next/image";

interface CloseContactDialogButtonProps {
  onClose: () => void;
}

function CloseContactDialogButton({ onClose }: CloseContactDialogButtonProps) {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
      aria-label="Close dialog"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
}

interface ContactDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ContactDialog({
  isOpen,
  setIsOpen,
}: ContactDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="border bg-black flex gap-4 p-2 rounded-lg relative w-full h-full max-w-[1200px] max-h-[800px]">
          <div className="absolute inset-0 flex items-center justify-end">
            <Image
              src="/images/entei-logo-blurred.png"
              alt="Entei Design Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <CloseContactDialogButton onClose={() => setIsOpen(false)} />
          <div className="p-12 rounded-lg w-1/2 h-full flex flex-col gap-4">
            <DialogTitle>
              <AccentText>
                Zaufali nam founderzy, startupy i marki, które chcą się
                wyróżniać.
              </AccentText>
              <Heading level={2}>Każdy projekt zaczyna się od wizji.</Heading>
            </DialogTitle>
            <Description>
              <Text>
                Odpowiadamy na Twoje zgłoszenie w ciągu 48 godzin roboczych.
                Jeżeli Twoje zgłoszenie jest pilne lub nie jesteś fanem
                formularzy zgłoś się do nas na:
              </Text>
              <Text>
                <CopyTextButton text="hello@entei.design" /> lub{" "}
                <Button variant="text">zarezerwuj rozmowę</Button>.
              </Text>
            </Description>
          </div>

          <div className="p-12 w-1/2 h-full flex flex-col">
            <div className="flex flex-col gap-4 h-full">
              <TextField
                name="full_name"
                type="text"
                placeholder="Imię i nazwisko"
              />
              <TextField name="email" type="email" placeholder="Email" />
              <Textarea
                name="message"
                placeholder="Wiadomość"
                className="p-4 bg-white rounded-md text-black flex-1"
              />
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Wyślij zapytanie
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
