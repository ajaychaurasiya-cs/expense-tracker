import { createContext, useContext, useState } from "react";


interface CatType {
  dropDownMenu: boolean;
  chooseMenu: string | null;
  colorMode: string | null;
  setDropDownMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setChooseMenu: React.Dispatch<React.SetStateAction<string | null>>;
  setColorMode: React.Dispatch<React.SetStateAction<string | null>>;
}


const CategoryContext = createContext<CatType | null>(null);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const [chooseMenu, setChooseMenu] = useState<string | null>(null);
  const [colorMode, setColorMode] = useState<string | null>(null);

  return (
    <CategoryContext.Provider
      value={{
        dropDownMenu,
        chooseMenu,
        colorMode,
        setDropDownMenu,
        setChooseMenu,
        setColorMode,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within CategoryProvider");
  }
  return context;
};
