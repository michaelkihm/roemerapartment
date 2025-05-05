import * as actions from "@/actions";
import Image, { StaticImageData } from "next/image";

import BookingCalender from "@/components/BookingCalender";
import ClientBookingForm from "@/components/ClientBookingForm";

import imgKitchen from "public/apartment/1.jpg";
import imgBedroom from "public/apartment/2.jpg";
import imgFacade from "public/apartment/3.jpg";
import imgLiving from "public/apartment/4.jpg";
import imgMain from "public/apartment/5.jpg";
import imgBedroom2 from "public/apartment/6.jpg";
import imgHouse from "public/apartment/7.jpg";
import outside1 from "public/apartment/8.jpg";
import outside2 from "public/apartment/9.jpg";

type ApartmentImage = {
  name: string;
  url: StaticImageData;
};

export default async function HomePage() {
  const imgSize = 600;
  const images: ApartmentImage[] = [
    { name: "Main", url: imgMain },
    { name: "Küche", url: imgKitchen },
    { name: "Schlafzimmer", url: imgBedroom },
    { name: "Facade", url: imgFacade },
    { name: "Wohnzimmer", url: imgLiving },
    { name: "Schlafzimmer 2", url: imgBedroom2 },
    { name: "Haus", url: imgHouse },
    { name: "Außen1", url: outside1 },
    { name: "Außen2", url: outside2 },
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
          Willkommen in Reil! Wir freuen uns, Euch in unserer charmanten
          2-Zimmer-Wohnung mit Terrasse zu empfangen. Freut Euch auf einen
          fantastischen Blick ins Moseltal und auf hervorragende
          Gastronomieangebote und Weingüter in der direkten Nachbarschaft. Die
          Wohnung ist der perfekte Ausgangspunkt um per Rad, auf einer Wanderung
          oder auf dem Wasser (Kanuverleih nebenan) die Mosel zu erkunden. Durch
          die Bahnanbindung können die umliegenden Städte Traben-Trarbach, Trier
          und Cochem bequem erreicht werden.
        </p>

        <div className="flex flex-col gap-24 py-2 lg:flex-row">
          <div>
            <h4 className="font-bold">Das bietet die Unterkunft</h4>
            <p className="py-2">
              Die Wohnung befindet sich im 1. Stock (ohne Aufzug). Die
              Zimmeraufteilung ist wie folgt:
            </p>
            <ul className="list-disc gap-4 px-4">
              <li>
                Schlafzimmer (Doppelbett 140cm) mit Moselblick und ensuite
                Badezimmer mit Badewanne
              </li>
              <li>
                Kombiniertes Wohn-/ Schlafzimmer (Doppelbett 180cm) mit
                Moselblick, TV und Sofaecke
              </li>
              <li> Separates Badezimmer mit Dusche / WC</li>
              <li>
                Küche mit vollständiger Grundausstattung (Induktionskochfeld,
                Wasserkocher, Filterkaffeemaschine, Backofen, Spülmaschine,
                großer Kühlschrank, KEIN Eisfach) Esstisch und Zugang zur
                Terrasse
              </li>
              <li>Terrasse mit Blick auf die Weinberge</li>
            </ul>
            <p className="py-1 font-bold">Über Uns</p>
            <p>
              Wir haben mit 2 jungen Familien das Moselhaus gekauft um es nach
              und nach zu renovieren und dort in der Zukunft selbst zu leben.
              Euch erwartet eine liebevoll eingerichtete Wohnung mit
              Altbaucharme. Unterhalb der Wohnung, im Erdgeschoss des Hauses,
              gibt es eine Pizzeria.
            </p>
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
