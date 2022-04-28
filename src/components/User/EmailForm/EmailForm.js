import React, { useState, useRef, useLayoutEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function EmailForm(props) {
    const { setIsOpen, currentEmail, refetch } = props;
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
        initialValues: {
            email: currentEmail || "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("This field is required"),
        }),
        onSubmit: async (formData) => {
            try {
                await updateUser({
                    variables: {
                        input: formData,
                    }
                });

                refetch();
                setIsOpen(false);
                toast.success("Email updated successfully!!");
            } catch (err) {
                toast.error(err.message);
                setShow(true);
            }
        }
    });

    return (
        <form className='email-form' onSubmit={formik.handleSubmit}>
            <div className='form-control'>
                <input 
                    type="text" 
                    className='form-input' 
                    placeholder='Enter your new email account'
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.email &&
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
                    </div>
                }
            </div>
            <button type="submit" className="btn btn-submit" >Update Email</button>
        </form>
    )
}
