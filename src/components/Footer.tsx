import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const footerLinks = {
    company: [
      { name: "O nas", href: "/about" },
      { name: "Kariera", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Kontakt", href: "/contact" },
    ],
    services: [
      { name: "Projektowanie logo", href: "/services/logo-design" },
      { name: "Strony internetowe", href: "/services/web-design" },
      { name: "Identyfikacja wizualna", href: "/services/branding" },
      { name: "Social Media", href: "/services/social-media" },
    ],
    legal: [
      { name: "Polityka prywatności", href: "/privacy" },
      { name: "Regulamin", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
      { name: "FAQ", href: "/faq" },
    ],
  };

  return (
    <footer className="bg-primary text-black z-10">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex justify-end items-center py-8">
            <div className="flex gap-16">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Firma</h3>
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:underline cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Usługi</h3>
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:underline cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold mb-2">Informacje</h3>
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:underline cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

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
