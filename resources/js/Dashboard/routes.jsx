import {
  HomeIcon,

} from "@heroicons/react/24/solid";
import { Home, TransactionsTable } from "./pages/dashboard";
import { FaCreditCard, FaSchool } from "react-icons/fa";

import { MdPayments } from "react-icons/md";
import { UserTable } from "./pages/dashboard/users/UserTable";
import { ClassTable } from "./pages/dashboard/classes/ClassList";
import { FeeTable } from "./pages/dashboard/fee_structure/FeeTable";
import { PiStudentBold } from "react-icons/pi";
import { MyFeeTable } from "./pages/dashboard/student_fees/MyFeeTable";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        role: ['student', 'admin']
      },
      {
        icon: <FaCreditCard {...icon} />,
        name: "Transaction",
        path: "/transaction",
        element: <TransactionsTable />,
        role: ['student', 'admin']
      },
      {
        icon: <PiStudentBold {...icon} />,
        name: "Students",
        path: "/students",
        element: <UserTable />,
        role: ['admin']
      },
      {
        icon: <FaSchool {...icon} />,
        name: "Departments",
        path: "/department",
        element: <ClassTable />,
        role: ['admin']
      },

      {
        icon: <MdPayments {...icon} />,
        name: "Fee Structure",
        path: "/fees",
        element: <FeeTable />,
        role: ['admin']
      },
      {
        icon: <MdPayments {...icon} />,
        name: "My Fees",
        path: "/my-fee",
        element: <MyFeeTable />,
        role: ['student']
      },

    ],
  },
];

export default routes;
