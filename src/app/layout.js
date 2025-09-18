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
        <Footer />
      </body>
    </html>
  );
}
