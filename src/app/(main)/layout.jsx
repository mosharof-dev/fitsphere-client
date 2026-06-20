import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="pt-16 grow">{children}</main>
      <Footer />
    </>
  );
}
