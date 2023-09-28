import React from "react";
import { Link, redirect } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    ShoppingBagIcon,
    InboxIcon,
    PowerIcon,
    CalendarDaysIcon
  } from "@heroicons/react/24/solid";
   
  export function DefaultSidebar() {

    return (
      <div className="hidden lg:flex h-screen w-full flex-col p-4 max-w-[15rem] shadow-xl ">
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
              <ListItem className="mt-auto">
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
          </div>
          </List>
        </div>
      </div>
    );
  }