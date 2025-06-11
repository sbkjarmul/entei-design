import { Field, Input, Label } from "@headlessui/react";

interface TextFieldProps {
  name: string;
  type: "text" | "email" | "tel" | "number" | "password";
  placeholder: string;
  label?: string;
  className?: string;
}

export default function TextField({
  name,
  type,
  placeholder,
  label,
  className = "",
}: TextFieldProps) {
  return (
    <Field className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <Label htmlFor={name} className="text-gray-200">
          {label}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type={type ?? "text"}
        placeholder={placeholder}
        autoComplete="off"
        className="p-2 bg-black rounded-md text-gray-400 border border-gray-800
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary
      "
      />
    </Field>
  );
}
