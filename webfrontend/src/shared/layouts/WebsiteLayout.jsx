import { Outlet } from "react-router-dom";
import Navbar from "../../modules/website/components/Navbar";
import Footer from "../../modules/website/components/Footer";
import GlobalEnhancer from "../../modules/website/components/Globalenhancer";
import SeoManager from "../components/SeoManager";

const WebsiteLayout = () => {
  return (
    <>
      <SeoManager />
      <Navbar />
      <main className="min-h-screen bg-white">
        <Outlet />
      </main>
      <GlobalEnhancer />
      <Footer />
    </>
  );
};

export default WebsiteLayout;