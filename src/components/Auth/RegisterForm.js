import React from 'react';
import { useFormik } from "formik";

export default function RegisterForm(props) {
    const { setShowLogin } = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: null,
        onSubmit: (formValues) => {
            console.log("sent form!!!");
            console.log(formValues);
        }
    });

    return (
        <>
            <h2 className="register-form-title">Register to see awesome pictures and videos from your friends and followers</h2>
            <form className="form" onSubmit={formik.handleSubmit}>
                <input 
                    className="form-input" 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    onChange={formik.handleChange} 
                    value={formik.values.name || ""}
                />
                <input 
                    className="form-input" 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    onChange={formik.handleChange} 
                    value={formik.values.username || ""}
                />
                <input 
                    className="form-input" 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    onChange={formik.handleChange} 
                    value={formik.values.email || ""}
                />
                <input 
                    className="form-input" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={formik.handleChange} 
                    value={formik.values.password || ""}
                />
                <input 
                    className="form-input" 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Confirm Password" 
                    onChange={formik.handleChange} 
                    value={formik.values.confirmPassword || ""}
                />
                <button type="submit" className="btn btn-submit">
                    Sign up
                </button>
                {/* <button type="button" onClick={formik.handleReset}>
                      Reset
                </button>*/}
            </form>
        </>
    )
}

function initialValues() {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
}