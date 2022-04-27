import React, { useState, useRef, useLayoutEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function PasswordForm(props) {
    const { logout, setIsOpen } = props;
    const [updateUser] = useMutation(UPDATE_USER);

    const [show, setShow] = useState(false)
    const [heightError, setHeightError] = useState(0);
    const refError = useRef();

    useLayoutEffect(() => {
        if (refError && refError.current && refError.current.clientHeight) {
          const heightError = refError.current.clientHeight;

          setHeightError(heightError);
        }
      }, []);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required("This field is required"),
            newPassword: Yup.string().required("This field is required")
            .oneOf([Yup.ref("confirmNewPassword")], "Passwords don't match"),
            confirmNewPassword: Yup.string().required("This field is required")
            .oneOf([Yup.ref("newPassword")], "Passwords don't match"),
        }), 
        onSubmit: async (formData) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword
                        }
                    }
                });

                if(!result.data.updateUser) {
                    toast.error("Incorrect current password"); 
                } else {
                    toast.success("Password updated successfully!!");
                    setIsOpen(false);
                    logout();
                }
            } catch(err) {
                console.log(err.message);
                setShow(true);
            }
        }
    });

    return (
        <form className='password-form' onSubmit={formik.handleSubmit}>
            <div className="form-control">
                <input 
                    type="password" 
                    className='form-input' 
                    placeholder='Current Password' 
                    name="currentPassword" 
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                />
                { formik.errors.currentPassword &&
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
                            <p aria-hidden={show ? "true" : "false"}>{formik.errors.currentPassword}</p>
                    </div>
                }
            </div>
            <div className="form-control">
                <input 
                    type="password" 
                    className='form-input' 
                    placeholder='New Password' 
                    name="newPassword" 
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                />
                { formik.errors.newPassword &&
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
                            <p aria-hidden={show ? "true" : "false"}>{formik.errors.newPassword}</p>
                    </div>
                }
            </div>
            <div className="form-control">
                <input 
                    type="password" 
                    className='form-input' 
                    placeholder='Confirm New Password' 
                    name="confirmNewPassword"
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange} 
                /> 
                { formik.errors.confirmNewPassword &&
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
                            <p aria-hidden={show ? "true" : "false"}>{formik.errors.confirmNewPassword}</p>
                    </div>
                }
            </div>
           
            <button type="submit" className="btn btn-submit" >Update Password</button>
        </form>
    )
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    }
}
