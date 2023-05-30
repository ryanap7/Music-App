import React from "react";
import "../styles/RightMenu.css";
import { MenuList } from "./MenuList";
import { Menu } from "./Menu";

function RightMenu() {
  return (
    <div className="rightContainer">
      <Menu title={"Menu"} listObject={MenuList} />
    </div>
  );
}

export { RightMenu };
