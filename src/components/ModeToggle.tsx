import { IconMoon, IconSun } from "@tabler/icons-react";

import { ActionIcon } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";

export function ModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleClick = () => {
    toggleColorScheme();
  };

  return (
    <ActionIcon variant="subtle" color="dark" radius="xl" onClick={handleClick}>
      {colorScheme === "light" ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
}
