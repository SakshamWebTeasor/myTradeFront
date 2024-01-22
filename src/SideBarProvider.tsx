import { useState, createContext, useContext, ReactNode } from "react";

const SideBarContext = createContext<{ isOpen: boolean; toggleSidebar: () => void }>(
  { isOpen: true, toggleSidebar: () => {} }
);

export function useSideBarContext() {
  return useContext(SideBarContext);
}

type Props = {
  children: ReactNode;
};

function SideBarProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  function toggleSidebar() {
    setIsOpen((prevDarkTheme) => !prevDarkTheme);
  }
  return (
    <>
      <SideBarContext.Provider value={{ isOpen, toggleSidebar }}>
        {children}
      </SideBarContext.Provider>
    </>
  );
}

export default SideBarProvider;
