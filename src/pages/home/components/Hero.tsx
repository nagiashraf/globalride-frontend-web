import hero from "@/assets/images/backgrounds/hero.jpg";
import SearchForm from "@/components/SearchForm/SearchForm";
import { MutableRefObject } from "react";
import { useTranslation } from "react-i18next";

const Hero = ({
  searchFormRef,
}: {
  searchFormRef: MutableRefObject<HTMLFormElement | null>;
}) => {
  const { t } = useTranslation(["home"]);
  return (
    <section
      className={`h-[800px] xl:h-[500px] py-section relative z-10 bg-cover bg-no-repeat 
      before:absolute before:inset-0 before:-z-10 before:bg-light before:opacity-80`}
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="container">
        <div className="text-center mb-8">
          <h1>{t("hero.title", { ns: "home" })}</h1>
          <p className="text-xl">{t("hero.subtitle", { ns: "home" })}</p>
        </div>

        <SearchForm searchFormRef={searchFormRef} />
      </div>
    </section>
  );
};

export default Hero;
