import { Field, Input, Label } from "@headlessui/react";

interface TextFieldProps {
  name: string;
  type: "text" | "email" | "tel" | "number" | "password";
  placeholder: string;
  label?: string;
  className?: string;
  isDisabled?: boolean;
  error?: string;
}

export default function TextField({
  name,
  type,
  placeholder,
  label,
  className = "",
  isDisabled,
  error,
  ...props
}: TextFieldProps) {
  return (
    <Field className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className={`p-2 bg-black rounded-md text-gray-400 border ${
          error ? "border-red-500" : "border-gray-800"
        } focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${className}`}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </Field>
  );
}
