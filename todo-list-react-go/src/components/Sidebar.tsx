import React from "react";
import { Link, redirect } from "react-router-dom";
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
  import {
    ShoppingBagIcon,
    InboxIcon,
    CalendarDaysIcon
  } from "@heroicons/react/24/solid";
import { Avatar } from "@mantine/core";
import { User } from "../User";
import { KeyedMutator } from "swr";
   
  export function DefaultSidebar({userData, mutateUser}: {userData?: User, mutateUser: KeyedMutator<User>}) {

    const logout = async () => {

      const updated = await fetch('http://localhost:8080/api/logout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
    }).then((r) => r.json());
    localStorage.setItem("currentEmail", '')
    mutateUser(updated)
    }

    return (
      <div className="hidden lg:flex h-screen w-full flex-col p-4 max-w-[17rem] shadow-xl ">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            <Link to="/">Taskify</Link>
          </Typography>
        </div>
        <div className="flex flex-grow">
          <List>
          <div className="flex flex-col h-full">
            <Link to="/todo">
                <ListItem>
                    <ListItemPrefix>
                        <CalendarDaysIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    New Task
                </ListItem>
            </Link>
              <Link to="/register">
                  <ListItem>
                    <ListItemPrefix>
                      <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Register
                  </ListItem>
              </Link>
              <Link to="/login">
                  <ListItem>
                    <ListItemPrefix>
                      <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Login
                  </ListItem>
              </Link>
              {/* <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem> */}
              {/* <ListItem className="mt-auto">
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem> */}
              <div className="mt-auto flex items-center gap-4" >
              <Popover placement="top-start" offset={15}>
              <PopoverHandler>
              <Avatar className="cursor-pointer" variant="filled" radius="xl" size="md" src="" />
                </PopoverHandler>
                <PopoverContent onClick={logout} className="flex items-center gap-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                </svg>
                  <p>Logout</p>
                </PopoverContent>
              </Popover>
                {userData ? (
                    <div>
                      <p className="font-bold">{userData.name}</p>
                      <p>{userData.email || 'No user logged in'}</p>
                    </div>
                ) : (
                  <div>No user logged in</div>
                )}
              </div>      
          </div>
          </List>
        </div>
      </div>
    );
  }