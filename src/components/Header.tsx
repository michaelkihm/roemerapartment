import { paths } from "@/paths";
import { Link } from "@heroui/react";
import Image from "next/image";
import brandImage from "public/headerbrand.png";

export default function Header() {
  const menuItems: { name: string; url: string }[] = [
    { name: "Unterkunft", url: paths.home() },
    { name: "Reil", url: paths.reil() },
  ];

  return (
    <div className="sticky inset-x-0 top-0 z-40 flex items-center justify-between bg-green-700 p-4 text-white">
      <div className="flex items-center gap-1">
        <Link href={paths.home()}>
          <Image
            src={brandImage}
            alt="Brand Image"
            width={80}
            height={80}
            className="rounded-full"
          />
        </Link>
        <h3 className="px-2 text-3xl font-bold">Römer-Apartment</h3>
      </div>

      <div className="flex gap-2 pr-6">
        {menuItems.map((item) => (
          <Link className="text-white" href={item.url} key={item.name}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
