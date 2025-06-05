import { Input } from "@headlessui/react";

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
      className="p-4 bg-white rounded-md text-black"
    />
  );
}
