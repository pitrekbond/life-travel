"use client";

import { createContext, useContext, useState } from "react";

const ActiveCityContext = createContext();

function ActiveCityProvider({ children }) {
  const [activeCity, setActiveCity] = useState(null);

  function handleSetActiveCity(city) {
    setActiveCity(city);
    localStorage.setItem("activeCityId", city.id);
  }

  return (
    <ActiveCityContext.Provider
      value={{ activeCity, setActiveCity, handleSetActiveCity }}
    >
      {children}
    </ActiveCityContext.Provider>
  );
}

function useActiveCity() {
  const context = useContext(ActiveCityContext);
  if (context === undefined)
    throw new Error("Context was used outside the provider");
  return context;
}

export { ActiveCityProvider, useActiveCity };
