import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import HeaderMain from "./components/HeaderMain";
import NavigationMain from "./components/NavigationMain";
import Context from "./context/context";

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
    <html lang="en" className={`${roboto.variable} ${open_sans.variable}`}>
      <body>
        <Context>
          <HeaderMain />
          <main className=" grid grid-cols-[minmax(0,_300px)_1fr] h-svh">
            <NavigationMain />
            <div className="py-4 px-8">{children}</div>
          </main>
        </Context>
      </body>
    </html>
  );
}
