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
      <main>
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
