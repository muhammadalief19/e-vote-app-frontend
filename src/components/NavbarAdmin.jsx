import { GiHamburgerMenu } from "react-icons/gi";
import pens from "/images/pens.png";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function NavbarAdmin({ hideSideBar, user }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_APIURL}/auth/logout`);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar>
        <NavbarContent as="div" justify="end">
          <div className="block lg:hidden">
            <Button
              isIconOnly
              variant=""
              aria-label="hamburger-menu"
              onClick={hideSideBar}
            >
              <GiHamburgerMenu />
            </Button>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color=""
                name="Jason Hughes"
                size="sm"
                src={`${import.meta.env.VITE_APP_STATICURL}/foto-profile/${
                  user.foto_profile
                }`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{user.nama}</p>
                <p className="font-semibold">{user.email}</p>
                <p className="font-semibold text-red-600">{user.role}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}
