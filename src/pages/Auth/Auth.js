import React, { useState } from 'react';
import RegisterForm from '../../components/Auth/RegisterForm';
import LoginForm from "../../components/Auth/LoginForm";
import LazyImage from '../../components/LazyImage/LazyImage';
import logo from "../../assets/png/instaclone.png";

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="container flex-column-center">
            <div className="logo-box">
                <LazyImage src={logo} alt="logo" width="100%" height="auto" />
            </div>
            <div className='form-container'>
                { showLogin ? <LoginForm setShowLogin={setShowLogin} /> : <RegisterForm setShowLogin={setShowLogin} /> }
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
        </div>
        </div>
    )
}