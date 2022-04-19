import React from 'react';
import { Link } from 'react-router-dom';

export default function UserNotFound() {
  return (
    <div className="error-message error-animated" >
        <p className='flex'>
            <div className="svg-size">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a60000" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <span className='font-bold-700'>User not found</span>
        </p>
        <p>it is posible that the link that you just clicked is wrong or the user no longer exists <Link to="/" className='white-link'>Back to Home</Link></p>
    </div>
  )
}
