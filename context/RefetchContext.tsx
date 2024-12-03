// I created this context to manage the accessToken expiration. When the accessToken expires and i try to call the backend with
// the old accessToken (because client components don't get the latest session unless i manually update the session with the update function)
// it obviously returns a 401 unauthorized response from the backend. This refetch context gets triggered when i get this 401 response.
// I am updating the session (with the update() function) in just one component (it updates the session for every other component) with update
// in the GetUtmParameters component. I chose that one instead on any other component because it has the problem of the utm parameter to select
// through the select element: if i select another element in the select and the accessToken expires, if i don't have the update in the component
// it will return a 401, because the elements are selected through state, they don't reload the page when selected. The other components don't have
// this state problem. so i just used that component.
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
