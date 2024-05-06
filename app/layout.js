import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import HeaderMain from "./components/HeaderMain";
import SidebarMenu from "./components/SidebarMenu";
import Context from "./context/context";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});
const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata = {
  title: "My Expense tracker",
  description:
    "Simple expense tracker that helps you keep track of your daily and reoccuring expenses",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en" className={`${roboto.variable} ${open_sans.variable}`}>
      <body>
        <Context>
          <HeaderMain />
          <main
            className="grid grid-cols-1 md:grid-cols-[120px_1fr] min-h-screen
           bg-backgroundDark"
          >
            <SidebarMenu />
            <section className="mt-6 mb-6 md:w-[95%] md:max-w-[768px] 
              md:px-0 px-3 flex self-start flex-col justify-self-center w-full">
              {children}
            </section>
          </main>
        </Context>

        <div id="modal-root" />
      </body>
    </html>
    </ClerkProvider>
  );
}
