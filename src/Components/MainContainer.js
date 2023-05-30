import React, { useEffect } from "react";
import "../styles/MainContainer.css";
import { AudioList } from "./AudioList";
import { Banner } from "./Banner";
import { Navbar } from "./Navbar";
import "../styles/RightMenu.css";

function MainContainer() {
    useEffect(() => {
        const allLi = document
            .querySelector(".menuList")
            .querySelectorAll("li");

        function changePopularActive() {
            allLi.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        allLi.forEach((n) => n.addEventListener("click", changePopularActive));
    }, []);

    return (
        <div className="mainContainer">
            <Banner />

            <div className="menuList">
                <Navbar />
            </div>

            <AudioList />
        </div>
    );
}

export { MainContainer };
