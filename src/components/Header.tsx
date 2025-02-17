import { Link } from "@heroui/react";
import brandImage from "public/headerbrand.png";
import Image from "next/image";

export default function Header() {
  const menuItems = ["Appartment", "Reil & Umgebung", "Buchen"];

  return (
    <div className="bg-green-700 flex justify-between p-4 items-center text-white">
      <div className="flex gap-1 items-center">
        <Image
          src={brandImage}
          alt="Brand Image"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h3 className="text-3xl font-bold px-2">Römer-Appartment</h3>
      </div>

      <div className="flex gap-2">
        {menuItems.map((item) => (
          <Link className="text-white" href="/">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
