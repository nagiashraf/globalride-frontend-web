import {
  IconCalendarHeart,
  IconCar,
  IconHeadset,
  IconMapPin,
  IconReceipt2,
  IconShieldCheck,
} from "@tabler/icons-react";
import Hero from "./components/Hero";
import BenefitCard from "./components/BenefitCard";
import { useTranslation } from "react-i18next";
import DestinationCard from "./components/DestinationCard";
import { useRef } from "react";

const HomePage = () => {
  const { t } = useTranslation(["home"]);

  const searchFormRef = useRef<HTMLFormElement>(null);

  const handleDestinationCardClick = () => {
    searchFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      <Hero searchFormRef={searchFormRef} />

      <section className="py-section">
        <div className="container text-center mb-8">
          <h2>{t("benefits.title", { ns: "home" })}</h2>
          <p>{t("benefits.subtitle", { ns: "home" })}</p>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start">
          <BenefitCard
            title={t("benefits.item1_headline", { ns: "home" })}
            description={t("benefits.item1_description", { ns: "home" })}
            icon={IconMapPin}
          />
          <BenefitCard
            title={t("benefits.item2_headline", { ns: "home" })}
            description={t("benefits.item2_description", { ns: "home" })}
            icon={IconReceipt2}
          />
          <BenefitCard
            title={t("benefits.item3_headline", { ns: "home" })}
            description={t("benefits.item3_description", { ns: "home" })}
            icon={IconCar}
          />
          <BenefitCard
            title={t("benefits.item4_headline", { ns: "home" })}
            description={t("benefits.item4_description", { ns: "home" })}
            icon={IconCalendarHeart}
          />
          <BenefitCard
            title={t("benefits.item5_headline", { ns: "home" })}
            description={t("benefits.item5_description", { ns: "home" })}
            icon={IconHeadset}
          />
          <BenefitCard
            title={t("benefits.item6_headline", { ns: "home" })}
            description={t("benefits.item6_description", { ns: "home" })}
            icon={IconShieldCheck}
          />
        </div>
      </section>

      <section className="py-section">
        <div className="container text-center mb-8">
          <h2>{t("destinations.title", { ns: "home" })}</h2>
          <p>{t("destinations.subtitle", { ns: "home" })}</p>
        </div>
        <div className="container rounded-scrollbar scroll-p pb-3 grid gap-6 grid-flow-col auto-cols-[min(90%,275px)] overflow-x-scroll snap-mandatory snap-x xs:auto-cols-[max(40%, 300px)] md:grid-flow-row md:auto-cols-auto md:grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] md:overflow-x-hidden">
          <DestinationCard
            city={t("destinations.city1", { ns: "home" })}
            imgPath="dubai.jpg"
            onClick={handleDestinationCardClick}
          />
          <DestinationCard
            city={t("destinations.city2", { ns: "home" })}
            imgPath="cairo.jpg"
            onClick={handleDestinationCardClick}
          />
          <DestinationCard
            city={t("destinations.city3", { ns: "home" })}
            imgPath="new-york.jpg"
            onClick={handleDestinationCardClick}
          />
          <DestinationCard
            city={t("destinations.city4", { ns: "home" })}
            imgPath="rio-de-janeiro.jpg"
            onClick={handleDestinationCardClick}
          />
          <DestinationCard
            city={t("destinations.city5", { ns: "home" })}
            imgPath="barcelona.jpg"
            onClick={handleDestinationCardClick}
          />
          <DestinationCard
            city={t("destinations.city6", { ns: "home" })}
            imgPath="paris.jpg"
            onClick={handleDestinationCardClick}
          />
          <DestinationCard
            city={t("destinations.city7", { ns: "home" })}
            imgPath="rome.jpg"
            onClick={handleDestinationCardClick}
          />
          <DestinationCard
            city={t("destinations.city8", { ns: "home" })}
            imgPath="london.jpg"
            onClick={handleDestinationCardClick}
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
