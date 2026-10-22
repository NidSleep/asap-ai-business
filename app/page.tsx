import { Header } from "@/components/site/header";
import {
  Diagnostic,
  Difference,
  Finale,
  How,
  Hero,
  SafetyAndFaq,
} from "@/components/site/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <How />
        <Difference />
        <Diagnostic />
        <SafetyAndFaq />
      </main>
      <Finale />
    </>
  );
}
