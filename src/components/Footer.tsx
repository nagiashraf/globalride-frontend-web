import { Trans, useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(["common"]);

  const email = "nagiashraf50@gmail.com";
  return (
    <footer className="py-8 bg-light">
      <div className="container">
        <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        <p className="mt-2">
          <Trans i18nKey="footer.developerInfo" ns="common" values={{ email }}>
            This web app was developed by Nagi Ashraf, a .NET & React full-stack
            developer. You can reach out at:
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </Trans>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
