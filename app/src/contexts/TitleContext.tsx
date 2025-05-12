import { createContext, useContext, useState, ReactNode } from "react";

// Define o contexto
interface TitleContextProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleContext = createContext<TitleContextProps | undefined>(undefined);

// Hook para usar o contexto
export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle must be used within a TitleProvider");
  }
  return context;
};

// Provedor de título
export const TitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState(""); // Estado do título

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};
