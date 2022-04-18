import React from 'react';
import logo from "../../assets/png/instaclone.png";
import { Link } from "react-router-dom"; 
import RightHeader from './RightHeader'; 

export default function Header() {
  return (
    <div className="header">
        <div className="container">
            <div className="header-inner">
                <div className="header-logo">
                    <Link to="/">
                        <img src={logo} alt="instaclone logo" />
                    </Link>
                </div>
                <div>
                    <h2>
                        SEARCHBAR...
                    </h2>
                </div>
                <div>
                    <RightHeader />
                </div>
            </div>
        </div>
    </div>
  )
}
