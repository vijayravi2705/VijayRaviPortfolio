// app/[locale]/page.tsx
import ScrollManifesto from "@/components/intro/ScrollManifesto";
import Hero from "@/components/hero/Hero";
import Work from "@/components/work/Work";
import About from "@/components/about/About";
import Leadership from "@/components/leadership/Leadership";
import Credentials from "@/components/credentials/Credentials";
import Contact from "@/components/contact/Contact";
export default function HomePage() {
  return (
    <>
      <ScrollManifesto />
      <Hero />
      <Work />
      <About />
      <Leadership />
      <Credentials />
      <Contact />
    </>
  );
}
