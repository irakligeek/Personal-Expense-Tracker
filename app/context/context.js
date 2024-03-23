"use client";

import { createContext, useState } from "react";

export const HeaderContext = createContext(null);

function Context({ children }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState();

  return (
    <HeaderContext.Provider value={{ isMobileMenuOpen, setMobileMenuOpen }}>
      {children}
    </HeaderContext.Provider>
  );
}

export default Context;