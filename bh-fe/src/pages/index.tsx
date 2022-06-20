import { Outlet } from "react-router-dom";
import FooterComponent from "src/components/common/FooterComponent";
import HeaderComponent from "src/components/common/HeaderComponent";

function RootPage() {
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
}

export default RootPage;
