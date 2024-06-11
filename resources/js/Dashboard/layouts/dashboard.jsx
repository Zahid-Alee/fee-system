import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "../widgets/layout";
import routes from "../routes";
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import ViewFee from "../pages/dashboard/student_fees/ViewFee";
import { UerForm } from "../pages/dashboard/users/UserForm";
import { FeeForm } from "../pages/dashboard/fee_structure/FeeForm";

export function Dashboard({user}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        user={user}
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">

        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
        <Route path="/my-fee/:id" element={<ViewFee/>} />
        <Route path="/user/create/" element={<UerForm/>} />
        <Route path="/user/edit/:id" element={<UerForm/>} />
        <Route path="/fee/create/" element={<FeeForm/>} />
        <Route path="/fee/edit/:id" element={<FeeForm/>} />
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element,role }) => (
                role.includes(user.role)?<Route exact path={path} element={element} />:''
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
