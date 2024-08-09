import React, { createContext, useContext, useState } from "react";

const RefetchContext = createContext<{
  shouldRefetch: boolean;
  triggerRefetch: () => void;
}>({
  shouldRefetch: false,
  triggerRefetch: () => {},
});

export const RefetchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const triggerRefetch = () => {
    setShouldRefetch(true);
    setTimeout(() => setShouldRefetch(false), 0); // Reset immediately after triggering
  };

  return (
    <RefetchContext.Provider value={{ shouldRefetch, triggerRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};

export const useRefetch = () => useContext(RefetchContext);
