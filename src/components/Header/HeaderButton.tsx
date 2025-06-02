export default function HeaderButton() {
  return (
    <button className="h-full px-16 bg-primary text-black text-2xl font-normal hover:bg-primary/90 transition-colors cursor-pointer">
      <div className="flex flex-col items-center leading-7">
        <span>Porozmawiajmy o</span>
        <span>
          <span className="font-bold">Twoim</span> projekcie
        </span>
      </div>
    </button>
  );
}
