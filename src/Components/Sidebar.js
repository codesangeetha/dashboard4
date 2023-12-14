import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    return (
        <div>
            <div className="sidebar-class">
                <div className="common-class">
                    <Link to="/test">Test</Link>
                </div>

                <div className="common-class">
                    <Link to="/shoesSite">ShoesSite</Link>
                </div>
               

                <div className="common-class">
                    <Link to="/homepage">Homepage</Link>
                </div>
                <div className="common-class">
                    <Link to="/dresssite">DressSite</Link>
                </div>


                <div className="common-class">
                    <Link to="/getpage">GetPage</Link>
                </div>
               

            </div>
        </div>
    )
}
