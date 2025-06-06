import { Input, Label } from "@headlessui/react";

interface TextFieldProps {
  name: string;
  type: "text" | "email" | "tel" | "number" | "password";
  placeholder: string;
  className?: string;
}

export default function TextField({
  name,
  type,
  placeholder,
  className,
}: TextFieldProps) {
  return (
    <Input
      name={name}
      type={type ?? "text"}
      placeholder={placeholder}
      className="p-2 bg-black rounded-md text-gray-500 border border-gray-800
      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary
      "
    />
  );
}
