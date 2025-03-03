import Image from "next/image";
import reilImg1 from "public/reil/1.jpg";
import reilImg2 from "public/reil/2.jpg";
import reilImg3 from "public/reil/3.jpg";
import reilImg4 from "public/reil/4.jpg";

const textSections: string[] = [
  ` Reil ist ein malerisches Winzerdorf an der Mosel, das sich in
    Rheinland-Pfalz befindet. Die idyllische Lage zwischen steilen
    Weinbergen und dem sanft dahinfließenden Fluss macht Reil zu einem
    beliebten Reiseziel für Weinliebhaber und Naturliebhaber
    gleichermaßen.`,
  `    Die Ortschaft ist bekannt für ihre ausgezeichneten Riesling-Weine, die
    in den umliegenden Weingütern produziert werden. Besucher haben die
    Möglichkeit, an Weinproben teilzunehmen und die edlen Tropfen direkt
    beim Winzer zu verkosten. Die Gastfreundschaft der Winzer und die
    Qualität der Weine machen den Besuch zu einem unvergesslichen
    Erlebnis.`,
  `        Neben dem Weinbau bietet Reil auch zahlreiche Freizeitmöglichkeiten.
    Wanderer und Radfahrer können die gut ausgeschilderten Wege entlang
    der Mosel und durch die Weinberge erkunden. Besonders empfehlenswert
    ist der Moselsteig, ein Fernwanderweg, der spektakuläre Ausblicke auf
    das Moseltal bietet. Auch eine Schifffahrt auf der Mosel gehört zu den
    Highlights eines Besuchs in Reil.`,
  `   Das Dorf selbst besticht durch seine charmante Architektur mit
    Fachwerkhäusern und engen Gassen. Sehenswert sind die historische
    Pfarrkirche St. Martin sowie die vielen kleinen Kapellen und
    Bildstöcke, die die Region prägen. In den gemütlichen Gasthäusern und
    Restaurants können Besucher regionale Spezialitäten genießen, die oft
    mit den lokalen Weinen kombiniert werden.`,
  ` Ein besonderes Ereignis im Veranstaltungskalender von Reil ist das
    jährliche Weinfest, das in der Regel im Spätsommer stattfindet. Hier
    können Gäste die Weinkultur hautnah erleben und bei Musik, Tanz und
    kulinarischen Köstlichkeiten die Moselregion von ihrer besten Seite
    kennenlernen.`,
] as const;

const reilImages = [reilImg1, reilImg3, reilImg2, reilImg4];

export default function ReilPage() {
  return (
    <div className="p-2 sm:p-6 lg:p-9">
      <h2 className="text-3xl font-bold sm:text-4xl">
        Reil an der Mittelmosel
      </h2>
      <div className="flex flex-col gap-2 lg:w-[80%]">
        {textSections.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:max-w-[70%]">
        {reilImages.map((image) => (
          <Image alt={image.src} key={image.src} src={image} width={600} />
        ))}
      </div>
    </div>
  );
}
