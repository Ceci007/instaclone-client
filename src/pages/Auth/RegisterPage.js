import React, { useState } from 'react';
import { Link } from "react-router-dom";
import RegisterForm from '../../components/Auth/RegisterForm';
import LazyImage from '../../components/LazyImage/LazyImage';
import logo from "../../assets/png/instaclone.png";

export default function RegisterPage() {
    return (
        <div className="container flex-column-center">
            <div className="logo-box">
                <LazyImage src={logo} alt="logo" width="100%" height="auto" />
            </div>
            <div className='form-container'>
                <RegisterForm />
                <div className="space-between">
                    <p>Login with your account</p>
                    <Link to="/login" className='auth-link'>login</Link>
                </div>
        </div>
        </div>
    )
}