import { getLocale } from "next-intl/server";
import About from "~/components/about";
import Contact from "~/components/contact";
import FloatingActions from "~/components/floating-actions";
import Home from "~/components/home";
import Services from "~/components/services";
import Work from "~/components/work";
import { getCategoriesWithServices } from "~/lib/data";

export default async function HomePage() {
  const locale = await getLocale(); // This gets 'en', 'fr', or 'nl'
  const categories = await getCategoriesWithServices();
  return (
    <>
      <Home />
      <About />

      <Services data={categories} locale={locale} />
      <Work locale={locale} data={categories} />
      <Contact />
      <FloatingActions />
    </>
  );
}
