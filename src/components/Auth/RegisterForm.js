import React, { useState, useLayoutEffect, useRef } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../gql/user";

export default function RegisterForm(props) {
    const { setShowLogin } = props;
    const [register] = useMutation(REGISTER);

    const [show, setShow] = useState(false)
    const [heightError, setHeightError] = useState(0);
    const refError = useRef();

    useLayoutEffect(() => {
        if (refError && refError.current && refError.current.clientHeight) {
          const heightError = refError.current.clientHeight;

          setHeightError(heightError);
        }
      });

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:  Yup.object({
            name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters long"),
            username: Yup.string()
              .matches(
                /^[a-zA-Z0-9-]*$/,
                "Username can't have any blank spaces"
              )
              .required("Username is required").min(2, "Username must be at least 2 characters long"),
            email: Yup.string()
              .email("This email is not valid")
              .required("Email is required"),
            password: Yup.string()
              .required("Password is required")
              .oneOf([Yup.ref("confirmPassword")], "Passwords don't match"),
            confirmPassword: Yup.string()
              .required("Password is required")
              .oneOf([Yup.ref("password")], "Passwords don't match"),
          }),
        onSubmit: async (formData) => {
            try {
                const newUser = formData;
                delete newUser.confirmPassword;

                await register({
                    variables: { 
                        input: newUser,
                    }
                });
                toast.success("User register successfully!!");
                setShowLogin(true);
            } catch(err) {
                toast.error(err.message);
                console.log(err.message);
            }
            setShow(true);
        }
    });

    return (
        <>
            <h2 className="register-form-title">Register to see awesome pictures and videos from your friends and followers</h2>
            <form 
                className="form" 
                onSubmit={formik.handleSubmit}
                style={{height: "370px"}}
            >
                <div className="form-control">
                    <input 
                        className="form-input" 
                        type="text" 
                        name="name" 
                        placeholder="Full Name" 
                        onChange={formik.handleChange} 
                        value={formik.values.name || ""}
                    />
                    { formik.errors.name &&
                        <div 
                            className={show ? "error-field error-animated" : "error-field"}
                            style={{height: show ? `${heightError}px` : "0px"}}
                            ref={refError}     
                        >
                    
                                <div className="svg-size">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a60000" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p aria-hidden={show ? "true" : "false"}>{formik.errors.name}</p>
                        </div>}
                </div>
                <div className="form-control">
                    <input 
                        className="form-input" 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        onChange={formik.handleChange} 
                        value={formik.values.username || ""}
                    />
                      { formik.errors.username &&
                        <div 
                            className={show ? "error-field error-animated" : "error-field"}
                            style={{height: show ? `${heightError}px` : "0px"}}
                            ref={refError}     
                        >
                    
                                <div className="svg-size">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a60000" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p aria-hidden={show ? "true" : "false"}>{formik.errors.username}</p>
                        </div>}
                </div>
                <div className="form-control">
                    <input 
                        className="form-input" 
                        type="text" 
                        name="email" 
                        placeholder="Email" 
                        onChange={formik.handleChange} 
                        value={formik.values.email || ""}
                    />
                      { formik.errors.email &&
                        <div 
                            className={show ? "error-field error-animated" : "error-field"}
                            style={{height: show ? `${heightError}px` : "0px"}}
                            ref={refError}     
                        >
                    
                                <div className="svg-size">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a60000" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p aria-hidden={show ? "true" : "false"}>{formik.errors.email}</p>
                        </div>}
                </div>
                <div className="form-control">
                    <input 
                        className="form-input" 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={formik.handleChange} 
                        value={formik.values.password || ""}
                    />
                      { formik.errors.password &&
                        <div 
                            className={show ? "error-field error-animated" : "error-field"}
                            style={{height: show ? `${heightError}px` : "0px"}}
                            ref={refError}     
                        >
                    
                                <div className="svg-size">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a60000" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p aria-hidden={show ? "true" : "false"}>{formik.errors.password}</p>
                        </div>}
                </div>
                <div className="form-control">
                    <input 
                        className="form-input" 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password" 
                        onChange={formik.handleChange} 
                        value={formik.values.confirmPassword || ""}
                    />
                      { formik.errors.confirmPassword &&
                        <div 
                            className={show ? "error-field error-animated" : "error-field"}
                            style={{height: show ? `${heightError}px` : "0px"}}
                            ref={refError}     
                        >
                    
                                <div className="svg-size">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a60000" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p aria-hidden={show ? "true" : "false"}>{formik.errors.confirmPassword}</p>
                        </div>}
                </div>
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