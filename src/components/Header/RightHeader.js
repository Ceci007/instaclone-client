import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user';
import useAuth from '../../hooks/useAuth';
import defaultAvatar from '../../assets/png/avatar.png';
import LazyImage from '../LazyImage/LazyImage';

export default function RightHeader() {
    const { auth } = useAuth();

    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username: auth.username }
    });

    if(loading || error) return null;
    const { getUser } = data;

    return (
        <div className='right-header'>
            <Link className='icon' to="/">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </Link>
            <Link className='icon' to="/">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </Link>
            <Link className='avatar-box' to={`/${auth.username}`}>
                <LazyImage src={getUser.avatar ? getUser.avatar : defaultAvatar} width="50px" height="50px" alt="avatar" />
            </Link>
        </div>
    )
}
