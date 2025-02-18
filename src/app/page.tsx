import { Image } from "@heroui/react";
import * as actions from "@/actions";

import BookingCalender from "@/components/BookingCalender";

type ApartmentImage = {
  name: string;
  url: string;
};

export default async function HomePage() {
  const imgSize = 600;
  const inside = ["Küche", "Schlafzimmer", "Wohnzimmer", "WLAN", "Smart TV"];
  const images: ApartmentImage[] = [
    { name: "Main", url: "apartment/5.jpg" },
    { name: "Küche", url: "apartment/1.jpg" },
    { name: "Schlafzimmer", url: "apartment/2.jpg" },
    { name: "Facade", url: "apartment/3.jpg" },
    { name: "Wohnzimmer", url: "apartment/4.jpg" },
  ];

  const bookings = await actions.getBookings();

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex gap-2 justify-center items-center">
        <Image
          alt={images[0].name}
          radius="md"
          src={images[0].url}
          width={imgSize * 2}
          height={imgSize}
          isZoomed
        />
        <div className="flex flex-wrap gap-1">
          {images.slice(1).map((image) => (
            <Image
              alt={image.name}
              radius="md"
              src={image.url}
              width={imgSize / 2}
              height={imgSize / 2}
              isZoomed
              key={image.url}
            />
          ))}
        </div>
      </div>

      <div className="w-8/12 self-start">
        <p>
          Willkommen in unserem familienfreundlichen Ferienhaus mit Sauna und
          Wellness-Bereich, direkt an der idyllischen Ahr gelegen und nur 900
          Meter von der historischen Altstadt Ahrweiler entfernt! Genieße
          entspannte Stunden auf der Terrasse, erkunde die Weinberge oder
          schlendere durch die charmante Altstad
        </p>
        <div className=" flex gap-24 py-2">
          <div>
            <h4 className="font-bold">Das bietet die Unterkunft</h4>
            <ul className="list-disc gap-4 px-4">
              {inside.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold">Verfügbarkeit</p>
            <BookingCalender bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}
