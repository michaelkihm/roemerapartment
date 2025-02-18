import { Link } from "@heroui/react";
import brandImage from "public/headerbrand.png";
import Image from "next/image";
import { paths } from "@/paths";

export default function Header() {
  const menuItems = ["Appartment", "Reil", "Buchen"];

  return (
    <div className="sticky z-40 top-0 inset-x-0 bg-green-700 flex justify-between p-4 items-center text-white">
      <div className="flex gap-1 items-center">
        <Link href={paths.home()}>
          <Image
            src={brandImage}
            alt="Brand Image"
            width={80}
            height={80}
            className="rounded-full"
          />
        </Link>
        <h3 className="text-3xl font-bold px-2">Römer-Apartment</h3>
      </div>

      <div className="flex gap-2 pr-6">
        {menuItems.map((item) => (
          <Link className="text-white" href={`#${item}`} key={item}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
