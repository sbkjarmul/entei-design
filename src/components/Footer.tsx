import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-black z-10">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex items-end pb-8">
            <div className="w-[50%] h-[200px] relative">
              <Image
                src="/images/entei-black-wordmark.svg"
                alt="Entei Design"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
