"use client";
import { createContext } from "react";

export const UserSettings = createContext([]);

export default function UserSettingsCtx({ children, settings }) {
  return (
    <UserSettings.Provider value={{ settings }}>
      {children}
    </UserSettings.Provider>
  );
}
