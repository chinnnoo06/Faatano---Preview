import { HomeCollections } from "@/components/home/collections/HomeCollections";
import { HomeContact } from "@/components/home/contact/HomeContact";
import { Customize } from "@/components/home/customize/Customize";
import { Faq } from "@/components/home/faq/Faq";
import { Hero } from "@/components/home/hero/Hero";
import { HomeMaterials } from "@/components/home/materials/HomeMaterials";
import { CircuitBeams } from "@/components/ui/CircuitBeams";
import { SectionCurve } from "@/components/ui/SectionCurve";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="collections" className="relative bg-cream py-20 lg:py-32">
        <SectionCurve fill="fill-ink" />
        <HomeCollections />
      </section>

      <section id="materials" className="relative bg-ink py-20 lg:py-32">
        <SectionCurve fill="fill-cream" />
        <SectionCurve fill="fill-cream" direction="bottom" />
        <CircuitBeams />
        <div className="relative z-10">
          <HomeMaterials />
        </div>
      </section>

      <section id="customize" className="relative bg-cream py-20 lg:py-32">
        <Customize />
      </section>

      <section id="contact" className="relative bg-ink py-20 lg:py-32">
        <SectionCurve fill="fill-cream" />
        <SectionCurve fill="fill-cream" direction="bottom" />
        <CircuitBeams />
        <div className="relative z-10">
          <HomeContact />
        </div>
      </section>

      <section id="faq" className="relative bg-cream py-20 lg:py-32">
        <Faq />
      </section>
    </>
  );
}
