import React, { useState } from 'react';
import LazyImage from '../../components/LazyImage/LazyImage';
import logo from "../../assets/png/instaclone.png";

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="container">
            <div className="logo-box">
                <LazyImage src={logo} alt="logo" width="100%" height="auto" />
            </div>
            <div className='form-container'>
                <form className="form">
                    { showLogin ? <div>login form</div> : <div>register form</div>}
                    { showLogin ? (
                        <div className="space-between">
                            <p>don't you have an account yet?</p>
                            <span onClick={() => setShowLogin(!showLogin)}>create an account</span>
                        </div>
                    ) : (
                        <div className="space-between">
                            <p>Login with your account</p>
                            <span onClick={() => setShowLogin(!showLogin)}>login</span>
                        </div>
                    ) }
                </form>
            </div>
        </div>
    )
}