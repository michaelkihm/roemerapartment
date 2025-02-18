import Apartment from "@/components/Apartment";
import Header from "@/components/Header";
import Reil from "@/components/Reil";

export default function Home() {
  return (
    <div
      className="p-2 flex flex-col gap-3 flex-grow overflow-y-auto"
      id="content-container"
    >
      <Apartment />
      <Reil />
      <div id="Buchen" className="h-72 bg-blue-500"></div>
    </div>
  );
}
