import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-700 flex flex-col items-center justify-center text-center px-4 gap-10">
      <h1 className="text-[200px] font-bold text-black leading-[160px]">404</h1>
      <p className="text-base md:text-lg max-w-2xl text-black">
        Przepraszamy, ale strona której szukasz nie istnieje lub została
        przeniesiona.
      </p>
      <Link href="/">
        <Button variant="primary">Powrót do strony głównej</Button>
      </Link>
    </main>
  );
}
