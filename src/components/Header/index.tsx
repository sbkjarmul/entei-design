import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import BurgerMenu from "./HeaderMenu/BurgerMenu";
import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 relative">
      <Container className="h-[100px] flex items-center justify-between pl-4">
        <Link href="/" className="relative h-10 w-10">
          <Image
            src="/images/entei-logo.svg"
            alt="Entei Design"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-8 h-full">
          <div className="hidden md:flex items-center gap-8 mr-[350px]">
            <HeaderMenu />
          </div>

          <div className="md:hidden">
            <BurgerMenu />
          </div>

          <div className="absolute right-0 top-0 h-25">
            <HeaderButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
