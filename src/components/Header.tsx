import { ModeToggle } from "./ModeToggle";
import logo from "@/assets/images/logo.png";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { LOCALES } from "@/i18n/constants";
import { ActionIcon, Menu } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const Header = () => {
  const { i18n } = useTranslation(["common"]);
  const currentLocale = LOCALES.find(
    (locale) => locale.code === i18n.resolvedLanguage,
  );
  return (
    <nav className="sticky top-0 z-50 h-16 flex items-center bg-[--mantine-color-body] shadow-2xl">
      <div className="container flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-16 h-12 object-contain" />
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Menu shadow="md" width={200} trigger="click-hover">
            <Menu.Target>
              <ActionIcon variant="subtle" radius="xl">
                <img
                  src={
                    new URL(
                      `../assets/images/flags/${currentLocale?.flagPath}`,
                      import.meta.url,
                    ).href
                  }
                  alt={currentLocale?.nativeName}
                  className="w-6 h-6 rounded-full"
                />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {LOCALES.map((locale) => (
                <Menu.Item
                  key={locale.code}
                  onClick={() => i18n.changeLanguage(locale.code)}
                  disabled={locale.code === currentLocale?.code}
                  leftSection={
                    <img
                      src={
                        new URL(
                          `../assets/images/flags/${locale.flagPath}`,
                          import.meta.url,
                        ).href
                      }
                      alt={locale.nativeName}
                      className="w-6 h-6 rounded-full"
                    />
                  }
                  rightSection={
                    locale.code === currentLocale?.code && (
                      <span className="absolute right-2">
                        <IconCheck size={16} />
                      </span>
                    )
                  }
                >
                  {locale.nativeName}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
