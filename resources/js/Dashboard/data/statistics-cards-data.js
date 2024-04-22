import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { FaCreditCard, FaKey } from "react-icons/fa";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: FaCreditCard,
    title: "Token Purchased",
    value: "320",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: FaKey,
    title: "Tokens Remaining",
    value: "200",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Affiliate Signups",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  }
];

export default statisticsCardsData;
