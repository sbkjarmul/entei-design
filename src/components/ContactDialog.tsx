import {
  Checkbox,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "./Button";
import Text from "./Text";
import Heading from "./Heading";
import CopyTextButton from "./CopyTextButton";
import AccentText from "./AccentText";
import Image from "next/image";
import ContactForm from "./ContactForm";

interface CloseContactDialogButtonProps {
  onClose: () => void;
}

function CloseContactDialogButton({ onClose }: CloseContactDialogButtonProps) {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
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
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
        <DialogPanel className="bg-black flex gap-4 p-2 rounded-lg relative w-full h-full max-w-[1200px] max-h-[900px]">
          <div className="p-12 rounded-lg w-1/2 h-full flex flex-col gap-4 z-1">
            <AccentText>
              Zaufali nam founderzy, startupy i marki, które chcą się wyróżniać.
            </AccentText>
            <Heading level={2}>Każdy projekt zaczyna się od wizji.</Heading>
            <Description className="flex-col flex gap-4">
              <Text>
                Odpowiadamy na Twoje zgłoszenie w ciągu 48 godzin roboczych.
                Jeżeli Twoje zgłoszenie jest pilne lub nie jesteś fanem
                formularzy zgłoś się do nas na:
              </Text>
              <Text>
                <CopyTextButton text="hello@entei.design" /> lub{" "}
                <Button variant="text" className="text-gray-100">
                  zarezerwuj rozmowę
                </Button>
                .
              </Text>
            </Description>
          </div>

          <div className="p-12 w-1/2 h-full flex flex-col z-1">
            <CloseContactDialogButton onClose={() => setIsOpen(false)} />
            <ContactForm onSubmit={() => setIsOpen(false)} />
          </div>

          <div className="absolute inset-0 flex items-center justify-end z-0 overflow-hidden">
            <Image
              src="/images/entei-logo-blurred.png"
              alt="Entei Design Background"
              fill
              className="object-cover translate-x-[25%]"
              priority
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
