import { Outlet } from "react-router-dom";
import LeftPanel from "../organisms/LeftPanel";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-between w-full h-[100vh] mx-auto bg-[url('/public/dark-bg.png')] bg-cover">
      {/* Left Pane */}
      <section className="flex flex-col w-[24rem] h-[100vh] justify-start">
        <LeftPanel />
      </section>

      {/* Main View */}
      <section className="flex flex-col p-4 w-full h-[100vh] justify-start">
        <Outlet />
      </section>
    </div>
  );
};

export default LandingPage;
