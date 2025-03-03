import * as actions from "@/actions";
import Image, { StaticImageData } from "next/image";

import BookingCalender from "@/components/BookingCalender";
import ClientBookingForm from "@/components/ClientBookingForm";

import imgKitchen from "public/apartment/1.jpg";
import imgBedroom from "public/apartment/2.jpg";
import imgFacade from "public/apartment/3.jpg";
import imgLiving from "public/apartment/4.jpg";
import imgMain from "public/apartment/5.jpg";

type ApartmentImage = {
  name: string;
  url: StaticImageData;
};

export default async function HomePage() {
  const imgSize = 600;
  const inside = ["Küche", "Schlafzimmer", "Wohnzimmer", "WLAN", "Smart TV"];
  const images: ApartmentImage[] = [
    { name: "Main", url: imgMain },
    { name: "Küche", url: imgKitchen },
    { name: "Schlafzimmer", url: imgBedroom },
    { name: "Facade", url: imgFacade },
    { name: "Wohnzimmer", url: imgLiving },
  ];

  const bookings = await actions.getBookings();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4">
        <Image
          className="lg:col-span-2 lg:row-span-2"
          alt={images[0].name}
          src={images[0].url}
          width={imgSize * 2}
          height={imgSize}
        />
        {images.slice(1).map((image) => (
          <Image
            alt={image.name}
            src={image.url}
            width={imgSize}
            height={imgSize}
            key={image.name}
          />
        ))}
      </div>

      <div className="self-start lg:w-8/12">
        <p>
          Willkommen in unserem familienfreundlichen Ferienhaus mit Sauna und
          Wellness-Bereich, direkt an der idyllischen Ahr gelegen und nur 900
          Meter von der historischen Altstadt Ahrweiler entfernt! Genieße
          entspannte Stunden auf der Terrasse, erkunde die Weinberge oder
          schlendere durch die charmante Altstad
        </p>
        <div className="flex flex-col gap-24 py-2 lg:flex-row">
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
        <ClientBookingForm bookings={bookings} />
      </div>
    </div>
  );
}
