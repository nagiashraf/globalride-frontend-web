import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import notFound from "@/assets/images/not-found/death-valley-national-park.jpg";

const NotFoundPage = () => {
  const { t } = useTranslation(["not-found"]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-danger-500">
        {t("title", { ns: "not-found" })}
      </h1>
      <p className="text-lg mt-2">{t("description", { ns: "not-found" })}</p>
      <img
        src={notFound}
        alt="not found"
        className="w-[500px] mt-8 rounded-md"
      />
      <Button
        component={Link}
        to="/"
        variant="filled"
        size="lg"
        radius="md"
        className="mt-8"
      >
        {t("btnText", { ns: "not-found" })}
      </Button>
    </div>
  );
};

export default NotFoundPage;
