import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import App from "./App.tsx";
import theme from "./mantine-theme.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import "dayjs/locale/es";
import "dayjs/locale/ar";
import "./i18n/i18n.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) =>
        error.response &&
        error.response?.status >= 400 &&
        error.response?.status < 500
          ? false
          : failureCount < 3,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <DirectionProvider>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <Suspense fallback={null}>
              <App />
            </Suspense>
          </MantineProvider>
        </DirectionProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
