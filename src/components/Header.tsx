import './styles/Header.css';
// @ts-ignore
import logo from "../media/logo.png";
// @ts-ignore
import settingsIcon from "../media/settingsIcon.png";
// @ts-ignore
import logoutIcon from "../media/logoutIcon.png";
import React from 'react';

export default function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="ApplyWise" />
            </div>
            <div className="icons">
                <div className="navbar-icon" title="Settings">
                    <img src={settingsIcon} alt="Settings" />
                </div>
                <div className="navbar-icon" title="Logout">
                    <img src={logoutIcon} alt="Logout" />
                </div>
            </div>
        </div>
    );
};
