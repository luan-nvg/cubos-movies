import React, { createContext, useState, useContext, useEffect } from "react";
import { messages, detectBrowserLanguage } from "../i18n";

interface LanguageContextType {
  locale: string;
  changeLanguage: (newLocale: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: detectBrowserLanguage(),
  changeLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string>(detectBrowserLanguage());

  const changeLanguage = (newLocale: string) => {
    if (messages[newLocale]) {
      setLocale(newLocale);
      localStorage.setItem("locale", newLocale);
    }
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && messages[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
