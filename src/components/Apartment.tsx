import {
  Calendar,
  Card,
  CardBody,
  CardHeader,
  DateRangePicker,
  Image,
  RangeCalendar,
} from "@heroui/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

type ApartmentImage = {
  name: string;
  url: string;
};

export default function Apartment() {
  const imgSize = 600;
  const inside = ["Küche", "Schlafzimmer", "Wohnzimmer", "WLAN", "Smart TV"];
  const images: ApartmentImage[] = [
    { name: "Küche", url: "apartment/1.jpg" },
    { name: "Schlafzimmer", url: "apartment/2.jpg" },
    { name: "Facade", url: "apartment/3.jpg" },
    { name: "Wohnzimmer", url: "apartment/4.jpg" },
  ];

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        <Card style={{ width: imgSize }} radius="md">
          <CardHeader>
            <h4 className="font-bold text-xl">Die Unterkunft</h4>
          </CardHeader>
          <CardBody className="flex flex-col gap-5">
            <p>
              Willkommen in unserem familienfreundlichen Ferienhaus mit Sauna
              und Wellness-Bereich, direkt an der idyllischen Ahr gelegen und
              nur 900 Meter von der historischen Altstadt Ahrweiler entfernt!
              Genieße entspannte Stunden auf der Terrasse, erkunde die Weinberge
              oder schlendere durch die charmante Altstad
            </p>
            <div className="py-2">
              <h4 className="font-bold">Das bietet die Unterkunft</h4>
              <ul className="list-disc gap-4 px-4">
                {inside.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
        {images.map((image) => (
          <Image
            radius="md"
            src={image.url}
            width={imgSize}
            height={imgSize}
            isZoomed
            key={image.url}
          />
        ))}
      </div>
      <div>
        <p>Verfügbarkeit</p>
        <RangeCalendar aria-label="Date (No Selection)" />
      </div>
    </div>
  );
}
