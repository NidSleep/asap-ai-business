import { Header } from "@/components/site/header";
import {
  Faq,
  Features,
  Finale,
  Hero,
  Levels,
  Pain,
  Pricing,
  Proof,
} from "@/components/site/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Pain />
        <Levels />
        <Features />
        <Proof />
        <Pricing />
        <Faq />
      </main>
      <Finale />
    </>
  );
}
