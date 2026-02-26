import { Outlet } from "react-router-dom";
import Navbar from "../../modules/website/components/Navbar";
import Footer from "../../modules/website/components/Footer";
import GlobalEnhancer from "../../modules/website/components/Globalenhancer";
import bgMusic from "../../assets/Music/chak-de-india.wav";
const WebsiteLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <GlobalEnhancer musicSrc={bgMusic} />
      <Footer />
    </>
  );
};

export default WebsiteLayout;