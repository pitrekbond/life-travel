import { ActiveCityProvider } from "../_components/ActiveCityContext";
import MapCaller from "../_components/MapCaller";
import Sidebar from "../_components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex-1 grid overflow-hidden h-full ">
      <div className="mx-auto w-full">
        <div className="w-full h-full grid grid-cols-[28%_1fr]">
          <div className=" flex">
            <Sidebar>
              <ActiveCityProvider>{children}</ActiveCityProvider>
            </Sidebar>
          </div>
          <div className=" flex">
            <ActiveCityProvider>
              <MapCaller />
            </ActiveCityProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
