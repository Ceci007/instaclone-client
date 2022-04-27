import React from 'react'

export default function PasswordForm() {
  return (
    <form className='password-form'>
        <input type="text" className='form-input' placeholder='Current Password' name="currentPassword" />
        <input type="text" className='form-input' placeholder='New Password' name="newPassword" />
        <input type="text" className='form-input' placeholder='Confirm New Password' name="confirmNewPassword" />
        <button type="submit" className="btn btn-submit" >Update Password</button>
    </form>
  )
}
