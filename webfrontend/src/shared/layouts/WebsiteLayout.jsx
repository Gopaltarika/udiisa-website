import { Outlet } from "react-router-dom";
import Navbar from "../../modules/website/components/Navbar";
import Footer from "../../modules/website/components/Footer";
import GlobalEnhancer from "../../modules/website/components/Globalenhancer";

const WebsiteLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <GlobalEnhancer />
      <Footer />
    </>
  );
};

export default WebsiteLayout;