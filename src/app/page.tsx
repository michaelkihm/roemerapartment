import Header from "@/components/Header";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="p-2 flex-grow overflow-y-auto" id="content-container">
        <div id="Appartment" className="h-72 bg-red-500"></div>
        <div id="Reil" className="h-72 bg-green-500"></div>
        <div id="Buchen" className="h-72 bg-blue-500"></div>
      </div>
    </div>
  );
}
