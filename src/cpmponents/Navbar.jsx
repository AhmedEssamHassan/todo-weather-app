import { FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLe_ThEME } from "../redux/reducers/themeSlice";
import { BsFillMoonStarsFill } from "react-icons/bs";

function Navbar() {
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleModeSwitcher = (e) => {
    console.log(e.target.checked);
    dispatch(TOGGLe_ThEME(e.target.checked));
  };

  console.log({ mode });

  return (
    <nav
      className={` ${
        mode == "dark" ? "bg-black text-white" : "shadow-lg"
      } transition-all duration-1000 py-6`}
    >
      <div className={`container mx-auto flex justify-between items-center `}>
        <p>wtather</p>
        <FormControlLabel
          onChange={handleModeSwitcher}
          control={<Switch defaultChecked />}
          label={<BsFillMoonStarsFill />}
        />
      </div>
    </nav>
  );
}

export default Navbar;
