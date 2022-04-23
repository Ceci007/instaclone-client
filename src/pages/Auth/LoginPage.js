import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm';
import LoginForm from "../../components/Auth/LoginForm";
import LazyImage from '../../components/LazyImage/LazyImage';
import logo from "../../assets/png/instaclone.png";

export default function LoginPage() {
    return (
        <div className="container flex-column-center">
            <div className="logo-box">
                <LazyImage src={logo} alt="logo" width="100%" height="auto" />
            </div>
            <div className='form-container'>
                <LoginForm />
                <div className="space-between">
                    <p>you don't have an account yet?</p>
                    <Link to="/register" className='auth-link'>create an account</Link>
                </div>
        </div>
        </div>
    )
}