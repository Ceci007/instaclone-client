import React, { useState, useLayoutEffect, useRef } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { LOGIN } from '../../gql/user';
import { setToken, decodeToken } from "../../utils/token";
import useAuth from "../../hooks/useAuth";

export default function LoginForm(props) {
    const { setShowLogin } = props;
    const [error, setError] = useState("");
    const [login] = useMutation(LOGIN);
    const { setUser } = useAuth();
    // console.log(auth);

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
            email: Yup.string()
              .email("This email is not valid")
              .required("Email is required"),
            password: Yup.string()
              .required("Password is required"),
          }),
        onSubmit: async (formData) => {
            setError("");
            try {
                const { data } = await login({
                    variables: {
                        input: formData,
                    }
                });

                const { token } = data.login;
                setToken(token);
                setUser(decodeToken(token));
            } catch(err) {
                setError(err.message);
            }
            setShow(true);
        }
    });
  
    return (
        <>
            <h2 className="login-form-title">Login to see awesome pictures and videos from your friends and followers</h2>
            <form 
                className="form" 
                onSubmit={formik.handleSubmit}
                style={{height: "270px"}}
            >
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
                <button type="submit" className="btn btn-submit">
                    Login
                </button>
                { error && 
                 <div 
                        className={error ? "error-field error-animated" : "error-field"}
                        style={{height: error ? `${heightError}px` : "0px", width: "100%", marginTop: "20px"}}
                        ref={refError}     
                    >
                
                            <div className="svg-size">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a60000" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <p aria-hidden={error ? "true" : "false"}>{error}</p>
                    </div>
                }
                {/* <button type="button" onClick={formik.handleReset}>
                      Reset
                </button>*/}
            </form>
        </>
    )
}

function initialValues() {
    return {
        email: "",
        password: "",
    }
}
