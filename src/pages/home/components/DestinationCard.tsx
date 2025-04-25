import { Button } from "@mantine/core";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

type Props = {
  city: string;
  imgPath: string;
  onClick: () => void;
};

const DestinationCard = ({ city, imgPath, onClick }: Props) => {
  const { t, i18n } = useTranslation(["home"]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="aspect-[2/3] group/imgContainer relative overflow-hidden rounded-xl snap-center">
        <img
          loading="lazy"
          src={
            new URL(
              `../../../assets/images/destinations/${imgPath}`,
              import.meta.url,
            ).href
          }
          alt={city}
          className="w-full aspect-[2/3] object-cover object-bottom transition-[filter,transform] duration-[300ms,600ms] ease-out group-hover/imgContainer:grayscale group-hover/imgContainer:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 top-1/2 lg:top-2/3 bg-gradient-to-t from-black to-transparent" />
        <h3
          className={`absolute start-1/2 ${i18n.dir() === "ltr" ? "-translate-x-1/2" : "translate-x-1/2"} bottom-20 lg:bottom-2 w-max text-white transition-all duration-300 lg:group-hover/imgContainer:bottom-20`}
        >
          {city}
        </h3>
        <Button
          onClick={onClick}
          variant="filled"
          size="md"
          className={`absolute lg:opacity-0 start-1/2 ${i18n.dir() === "ltr" ? "-translate-x-1/2" : "translate-x-1/2"} bottom-16 lg:bottom-0 w-max uppercase transition-all duration-300 lg:group-hover/imgContainer:opacity-100 lg:group-hover/imgContainer:bottom-16`}
        >
          {t("destinations.btnText", { ns: "home" })}
        </Button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
