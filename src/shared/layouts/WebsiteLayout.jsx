import { Outlet } from "react-router-dom";
import Navbar from "../../modules/website/components/Navbar";
import Footer from "../../modules/website/components/Footer";

const WebsiteLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default WebsiteLayout;