import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "@/styles/global";
import * as S from "./styles/error-boundary";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { ErrorBoundary } from "react-error-boundary";
import AppProviders from "@/contexts/AppProviders";
import { IntlProvider } from "react-intl";
import { useLanguage, LanguageProvider } from "./contexts/LanguageContext";
import { messages } from "./i18n";

interface ErrorBoundaryUIProps {
  error: Error;
}

export function ErrorBoundaryUI({ error }: ErrorBoundaryUIProps) {
  return (
    <S.Wrapper>
      <S.MessageWrapper>
        <S.Title>Erro na Aplicação</S.Title>
        <S.Divider />
        <S.ErrorMessage>{error.message}</S.ErrorMessage>
      </S.MessageWrapper>
    </S.Wrapper>
  );
}
const SafeIntlProvider = IntlProvider as unknown as React.FC<
  IntlProvider["props"]
>;

// Componente que consome o contexto de idioma e fornece o IntlProvider
interface IntlProviderWithContextProps {
  children: ReactNode;
}

const IntlProviderWithContext: React.FC<IntlProviderWithContextProps> = ({
  children,
}) => {
  const languageContext = useLanguage();
  if (!languageContext) {
    throw new Error("Language context is not available");
  }
  const { locale } = languageContext;

  return (
    <SafeIntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </SafeIntlProvider>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <ErrorBoundary FallbackComponent={ErrorBoundaryUI}>
      <LanguageProvider>
        <IntlProviderWithContext>
          <AppProviders>
            <RouterProvider router={router} />
          </AppProviders>
        </IntlProviderWithContext>
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
