import { useState, createContext, useContext, ReactNode } from "react";

const SideBarContext = createContext<{ isOpen: boolean; toggleSidebar: () => void; activePage:string; setActivePage: (pageToActivate:string) => void, 
  // path: string
 }>(
  { isOpen: true, toggleSidebar: () => {}, activePage:"", setActivePage: ()=> {}, 
  // path: "" 
  }
);

export function useSideBarContext() {
  return useContext(SideBarContext);
}

type Props = {
  children: ReactNode;
};

function SideBarProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState<string>("Dashboard");
  function toggleSidebar() {
    setIsOpen((prevDarkTheme) => !prevDarkTheme);
  }
  return (
    <>
      <SideBarContext.Provider value={{ isOpen, toggleSidebar, activePage, setActivePage, 
        // path: window.location.pathname 
        }}>
        {children}
      </SideBarContext.Provider>
    </>
  );
}

export default SideBarProvider;
