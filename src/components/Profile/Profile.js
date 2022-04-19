import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user';
import { toast } from "react-toastify";
import UserNotFound from '../UserNotFound/UserNotFound';
import defaultAvatar from "../../assets/png/avatar.png";
import LazyImage from '../LazyImage/LazyImage';

export default function Profile(props) {
    const { username } = props;
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username }
    });

    if(loading) return (<p>loading data...</p>);
    if(error) return (<UserNotFound />)
    const { getUser } = data;

    console.log(getUser);

    return (
        <>
            <div className='profile-container'>
                <div className='profile-box profile-left avatar-profile-box'>
                    <LazyImage width="100px" height="100px" src={defaultAvatar} alt="avatar" />
                </div>
                <div className='profile-box profile-right'>
                    <div className='profile-item profile-item-1'>Header Profile</div>
                    <div className='profile-item profile-item-2'>Followers</div>
                    <div className='profile-item profile-item-3'>
                        <p className='profile-name'>{getUser.name}</p>
                        { getUser.website && 
                            <a href={getUser.website} target="_blank" className="website-link">
                                {getUser.website}
                            </a>
                        }
                        { getUser.description && 
                            <p className='profile-description'>{getUser.description}</p>
                        }
                    </div>
                </div>
            </div>  
        </>
    )
}
 