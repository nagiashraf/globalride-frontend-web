import i18n from "@/i18n/i18n";
import { motion } from "motion/react";

type Props = {
  title: string;
  description: string;
  icon: any;
};

const BenefitCard = ({ title, description, icon: Icon }: Props) => {
  const isLtr = i18n.dir() === "ltr";

  return (
    <div className="flex gap-4 items-start">
      <motion.div
        initial={{ opacity: 0, x: isLtr ? -100 : 100 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        whileHover={{
          scale: [1, 1.2, 1],
          transition: {
            duration: 1.0,
            repeat: Infinity,
            repeatType: "mirror",
          },
        }}
      >
        <Icon size={60} />
      </motion.div>
      <div>
        <h3>{title}</h3>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
