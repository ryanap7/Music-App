import logo from "./logo.svg";
import "./styles.css";
import { LeftMenu } from "./Components/LeftMenu";
import { MainAbout } from "../AboutUs/MainAboutUs";
import { RightMenu } from "./Components/RightMenu";

function AboutUs() {
  return (
    <div className="AboutUS">
      <div className=""></div>
      {/* <LeftMenu /> */}
      <MainAbout.js />
      <RightMenu />

      <div className="background"></div>
    </div>
  );
}

export { AboutUs };
