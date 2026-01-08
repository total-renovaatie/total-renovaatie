"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"; // Adjust path based on your shadcn setup
import { useTranslations } from "next-intl";

export function LegalModal({ triggerText }: { triggerText: string }) {
  const t = useTranslations("Legal");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="transition-colors hover:text-black">
          {triggerText}
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("title")}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 leading-relaxed text-slate-600">
          {t("content")}
        </div>
      </DialogContent>
    </Dialog>
  );
}
