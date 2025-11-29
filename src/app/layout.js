import "../styles/global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
        <div className="fixed bottom-0 left-0 w-full h-8 pointer-events-none z-50">
          <div className="w-full h-full bg-gradient-to-t from-[#161616]/20 to-transparent backdrop-blur-xs"></div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
