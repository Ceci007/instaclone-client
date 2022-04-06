import React from 'react'

export default function RegisterForm(props) {
    const { setShowLogin } = props;

    const onSubmit = () => {
        console.log("form just sent");
    }

    return (
        <>
            <h2 className="register-form-title">Register to see awesome pictures and videos from your friends and followers</h2>
            <form className="form" onSubmit={onSubmit}>
                <input className="form-input" type="text" name="name" placeholder="Full Name" />
                <input className="form-input" type="text" name="username" placeholder="Username" />
                <input className="form-input" type="text" name="email" placeholder="Email" />
                <input className="form-input" type="password" name="password" placeholder="Password" />
                <input className="form-input" type="password" name="confirmPassword" placeholder="Confirm Password" />
                <button type="submit" className="btn btn-submit">
                    Sign up
                </button>
            </form>
        </>
    )
}
