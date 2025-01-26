import React, { createContext, ReactNode, useContext } from "react";

interface GlobalProvide {
  children: ReactNode;
}

interface GlobalProps {
  everyThingOk: string;
}

export const GlobalContext = createContext({} as GlobalProps);

export const GlobalServices = React.memo(({ children }: GlobalProvide) => {
  const everyThingOk = "Hello World";

  return (
    <GlobalContext.Provider value={{ everyThingOk }}>
      {children}
    </GlobalContext.Provider>
  );
});

export function GlobalService() {
  return useContext(GlobalContext);
}
