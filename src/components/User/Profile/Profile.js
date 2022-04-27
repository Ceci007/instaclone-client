import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';
import { GET_USER } from '../../../gql/user';
import UserNotFound from '../../UserNotFound/UserNotFound';
import AvatarForm from '../AvatarForm/AvatarForm';
import SettingsForm from '../SettingsForm/SettingsForm';
import defaultAvatar from "../../../assets/png/avatar.png";
import LazyImage from '../../LazyImage/LazyImage';
import Modal from 'react-modal';
import HeaderProfile from './HeaderProfile/HeaderProfile';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export default function Profile(props) {
    const { username } = props;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalChildren, setModalChildren] = useState(null);
    const { auth } = useAuth();
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username }
    });

    if(loading) return (<div className='profile-spinner-box'><span className='big-spinner spinner-primary' /></div>);
    if(error) return (<UserNotFound />)
    const { getUser } = data;

    /*
    const openModal = () => {
        setIsOpen(true);
    } */
    
    
    const closeModal = () => {
        setIsOpen(false);
    }

    const modalHandler = (type) => {
        switch (type) {
            case "avatar":
                setModalTitle("Change user picture");
                setModalChildren(<AvatarForm setIsOpen={setIsOpen} auth={auth} />);
                setIsOpen(true);
                break;
            case "settings":
                setModalTitle("Profile Settings");
                setModalChildren(<SettingsForm setIsOpen={setIsOpen} setModalTitle={setModalTitle} setModalChildren={setModalChildren} />);
                setIsOpen(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className='profile-container'>
                { modalIsOpen && 
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="modal"
                        style={customStyles}
                    >
                        <h3 className='modal-title'>{ modalTitle }</h3>
                        { modalChildren }
                    </Modal>
                }
                <div className='profile-box profile-left'>
                    <div 
                        className={ username === auth.username ? 'avatar-profile-box cursor-pointer' : 'avatar-profile-box' } 
                        onClick={() => username === auth.username && modalHandler("avatar")}>
                        <LazyImage 
                            width="100px" 
                            height="100px" 
                            src={getUser.avatar ? getUser.avatar : defaultAvatar} 
                            alt="avatar" 
                        />
                    </div>
                </div>
                <div className='profile-box profile-right'>
                    <div className='profile-item profile-item-1'>
                        <HeaderProfile 
                            getUser={getUser} 
                            auth={auth} 
                            modalHandler={modalHandler}
                        />
                    </div>
                    <div className='profile-item profile-item-2'>Followers</div>
                    <div className='profile-item profile-item-3'>
                        <p className='profile-name'>{getUser.name}</p>
                        { getUser.website && 
                            <a href={getUser.website} target="_blank" rel="noreferrer" className="website-link">
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
 