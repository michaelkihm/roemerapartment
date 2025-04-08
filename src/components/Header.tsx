import { auth } from "@/auth";
import { paths } from "@/paths";
import { Link } from "@heroui/react";
import Image from "next/image";
import brandImage from "public/headerbrand.png";

export default async function Header() {
  const session = await auth();
  const menuItems: { name: string; url: string; auth: boolean }[] = [
    { name: "Unterkunft", url: paths.home(), auth: false },
    { name: "Reil", url: paths.reil(), auth: false },
    { name: "Buchung", url: paths.bookings(), auth: true },
  ];

  return (
    <div className="sticky inset-x-0 top-0 z-40 flex items-center justify-between bg-green-700 p-2 text-white lg:p-4">
      <div className="flex items-center gap-1">
        <Link href={paths.home()}>
          <Image
            src={brandImage}
            alt="Brand Image"
            width={80}
            height={80}
            className="h-10 w-10 rounded-full lg:h-20 lg:w-20"
          />
        </Link>
        <h3 className="px-1 text-lg font-bold lg:px-2 lg:text-3xl">
          Römer-Apartment
        </h3>
      </div>

      <div className="flex gap-2 pr-6">
        {menuItems
          .filter((item) => (item.auth ? (session?.user ? true : false) : true))
          .map((item) => (
            <Link
              className="text-xs text-white lg:text-base"
              href={item.url}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
