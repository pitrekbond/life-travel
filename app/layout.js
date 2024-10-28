import "@/app/_styles/globals.css";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import ToasterComponent from "./_components/Toaster";

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
        bg-primary-800 text-primary-50 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 grid">
          <main className="w-full">{children}</main>
        </div>
        <ToasterComponent />
      </body>
    </html>
  );
}
