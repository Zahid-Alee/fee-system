
import React, { useEffect, useReducer, useState } from "react";
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip,
  Textarea, Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";

import { HiHome } from "react-icons/hi";
import axios from 'axios';
// import { FeeForm } from "./MyFeeForm";
import { MdDelete } from "react-icons/md";
import { MyFeeForm } from "./MyFeeForm";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Semester", "Fee", "Created At", "Due Date", "Status", "Action"];


export function MyFeeTable() {


  useEffect(() => {
    loadUsers();
  }, [])


  const [userPopup, setUserPopup] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);



  async function createUser() {

    if (selectedUser) {

      return await axios.post('/update/fee', { ...formValues }).then((res) => {
        if (res.data.success) {
          loadUsers();
          setUserPopup(false);
          setFormValues({});
        }
        else {
          alert('There was an error try again')
        }
      })
        .catch((e) => {
          console.log(e);
        })

    }

    await axios.post('/save/fee', { ...formValues }).then((res) => {

      if (res.data.success) {
        loadUsers();
        setUserPopup(false);
        setFormValues(null)
      }
      else {
        alert('There was an error try again')
      }

    })
      .catch((e) => console.log(e))
  }

  async function deleteUser(id) {

    await axios.post('/delete/fee', { id }).then((res) => {

      if (res.data.success) {
        loadUsers();
        setUserPopup(false);
      }
      else {
        alert('There was an error try again')
      }

    })
      .catch((e) => console.log(e))
  }

  async function loadUsers() {

    await axios.get('/view/submission').then((res) => {
      setUsers(res?.data?.fees)
    }).catch(e => console.log(e))

  }

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map(
                (user, index) => {
                  const isLast = index === users?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={user.id}>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.batch}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {user.semester}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Rs. {user?.fee}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {user?.due_date}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.created_at}
                        </Typography>
                      </td>
                      <td className={classes}>
                      <Chip
                          size="sm"
                          variant="ghost"
                          value={user.status}
                          color={
                            user.status === "Paid"
                              ? "green"
                              : user.status === "Pending"
                                ? "amber"
                                : "red"
                          }
                        />
                      </td>
                      <td className={classes}>
                        <Link to={`${user.id}`}>
                          <Tooltip content="View Fee">
                            <IconButton variant="text" onClick={()=>{}}>
                              <FaEye className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Dialog size="xs" style={{ opacity: '0.5' }} open={userPopup} handler={() => { setUserPopup(!userPopup) }}>
        <DialogBody>
          <MyFeeForm formValues={formValues} setFormValues={setFormValues} selectedUser={selectedUser ?? {}} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => { setUserPopup(false) }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={createUser}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

    </>
  );
}
