import "@/app/_styles/globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../_components/Sidebar";
import MapCaller from "../_components/MapCaller";
import { ActiveCityProvider } from "../_components/ActiveCityContext";
import ToasterComponent from "../_components/Toaster";

export const revalidate = 15;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / Life Travel",
    default: "Welcome / Life Travel",
  },
  description:
    "A page where you can save all your travels, worldwide and national",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}
        bg-primary-500 text-primary-50 h-screen flex flex-col relative box-border text-sm`}
      >
        <div className="flex-1 px-6 py-6 grid overflow-hidden h-full ">
          <main className="mx-auto w-full">
            <div className="w-full h-full grid grid-cols-3">
              <div className="col-span-1 flex">
                <Sidebar>
                  <ActiveCityProvider>{children}</ActiveCityProvider>
                </Sidebar>
              </div>
              <div className="col-span-2 flex">
                <ActiveCityProvider>
                  <MapCaller />
                </ActiveCityProvider>
              </div>
            </div>
            <ToasterComponent />
          </main>
        </div>
      </body>
    </html>
  );
}
