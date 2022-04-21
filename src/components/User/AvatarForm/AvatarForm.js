import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR } from '../../../gql/user';

export default function AvatarForm(props) {
    const { modalTitle, setIsOpen } = props;

    const [updateAvatar] = useMutation(UPDATE_AVATAR); 

    const onDrop = useCallback(async (fileAccepted) => {
        const file = fileAccepted[0];

        try {
            const result = await updateAvatar({ variables: { file } });
            console.log(file);
            console.log(result); 
        } catch (err) {
            console.log(err);
        }
    }, [updateAvatar]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/jpg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    return (
        <div className='avatar-form'>
            <input {...getInputProps()} />
            <h2 className='avatar-form-title'>{`${modalTitle}`}</h2>
            <div className='avatar-buttons'>
                <div className='avatar-button button-1' {...getRootProps()}>
                    <div className='icon-avatar'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    </div>
                </div>
                <div className='avatar-button button-2'>
                    <div className='icon-avatar'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className='avatar-button button-3' onClick={() => setIsOpen(false)}>
                    <div className='icon-avatar'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
