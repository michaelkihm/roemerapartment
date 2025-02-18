"use client";
import { HeroUIProvider } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <I18nProvider locale="de-DE">
      <HeroUIProvider>{children}</HeroUIProvider>
    </I18nProvider>
  );
}
