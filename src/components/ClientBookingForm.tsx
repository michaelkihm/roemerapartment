"use client";
import {
  DateRangePicker,
  Input,
  RangeValue,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@heroui/react";
import {
  DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { useState } from "react";
import * as actions from "@/actions";
import { parseDateValue } from "@/utils/date";

type ClientBookingFormProps = {
  bookings: { from: string; to: string }[];
};

export default function ClientBookingForm({
  bookings,
}: ClientBookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [range, setRange] = useState<RangeValue<DateValue> | null>();
  const [sending, setSending] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const disabledRanges: [DateValue, DateValue][] = bookings.map(
    ({ from, to }) => [parseDate(from), parseDate(to)]
  );
  const isDateUnavailable = (date: DateValue) => {
    return disabledRanges.some(
      ([from, to]) => date.compare(from) >= 0 && date.compare(to) <= 0
    );
  };

  const onRangeChange = (range: RangeValue<DateValue> | null) => {
    if (!range) return;
    setRange(range);
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setRange(null);
  };

  const requestBooking = async () => {
    if (!range) return;
    const sendBookingMail = actions.sendBookingRequest.bind(null, {
      name,
      checkIn: parseDateValue(range!.start),
      checkOut: parseDateValue(range!.end),
      email,
    });
    setSending(true);
    await sendBookingMail();
    setSending(false);
    onOpen();
    resetForm();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <h2 className="font-bold text-xl">Buchung anfragen</h2>
        {sending && <Spinner />}
      </div>
      <Input
        isRequired
        errorMessage="Name ist erforderlich"
        label="Name"
        labelPlacement="outside"
        name="Name"
        placeholder="Name"
        type="text"
        value={name}
        onValueChange={setName}
        variant="underlined"
      />
      <Input
        isRequired
        errorMessage="Valide Email Adresse ist erforderlich"
        label="E-mail"
        labelPlacement="outside"
        name="email"
        placeholder="Geben Sie Ihre E-Mail-Adresse ein"
        type="email"
        variant="underlined"
        value={email}
        onValueChange={setEmail}
      />
      <DateRangePicker
        isDateUnavailable={isDateUnavailable}
        label="Zeitraum"
        // @ts-ignore comment
        value={range}
        minValue={today(getLocalTimeZone())}
        variant="underlined"
        isRequired
        classNames={{
          input: "text-black",
        }}
        popoverProps={{ placement: "bottom-end", radius: "none" }}
        onChange={onRangeChange}
      />
      <form action={requestBooking}>
        <button
          disabled={
            !name || !email || !range || range.start.day === range.end.day
          }
          className="rounded bg-slate-800 text-white p-2 max-w-60 disabled:bg-gray-400 hover:bg-slate-600"
          type="submit"
        >
          Buchung anfragen
        </button>
      </form>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="none"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Buchung angefragt
              </ModalHeader>
              <ModalBody>
                <p>
                  Deine Buchung wurde erfolgreich angefragt. Wir werden uns per
                  E-Mail in Kürze bei dir melden.
                </p>
                <p className="text-xs font-bold text-blue-600">
                  (Bitte überprüfe auch Deinen Spam-Ordner, da unsere E-Mails
                  manchmal dort landen könnten.)
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
