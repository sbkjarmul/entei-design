import Image from "next/image";
import AccentText from "../../../components/AccentText";
import Heading from "../../../components/Heading";
import Text from "../../../components/Text";
import Section from "@/components/Section";
import LogoBanner from "@/components/LogoBanner";

export default function LogoBannerSection() {
  return (
    <section>
      <LogoBanner
        logos={[
          "/images/our-clients/aristo-logo.png",
          "/images/our-clients/suseu-logo.png",
          "/images/our-clients/art-mat-logo.png",
          "/images/our-clients/hatan-logo.png",
          "/images/our-clients/rem-met-logo.png",
          "/images/our-clients/lagom-logo.png",
        ]}
      />
    </section>
  );
}
