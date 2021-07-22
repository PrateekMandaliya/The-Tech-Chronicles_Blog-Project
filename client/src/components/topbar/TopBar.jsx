import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.css';

export const TopBar = () => {
    const { user, dispatch } = useContext(Context);
    const PF = 'http://localhost:5000/images/';
    // const PF = window.location.origin + '/images/';
    const profilePicture =
        user && user.profilePicture
            ? PF + user.profilePicture
            : 'https://i0.wp.com/feedbackhall.com/uploads/user-icon.png';
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };
    return (
        <div className='top'>
            <div className='topLeft'>
                <a
                    href='https://www.facebook.com/prateek.mandaliya/'
                    target='_blank'
                    rel='noreferrer'
                >
                    <i className='topIcon fab fa-facebook-square'></i>
                </a>
                <a
                    href='https://www.linkedin.com/in/prateek-mandaliya/'
                    target='_blank'
                    rel='noreferrer'
                >
                    <i className='topIcon fab fa-linkedin'></i>
                </a>
                <a
                    href='https://github.com/PrateekMandaliya/'
                    target='_blank'
                    rel='noreferrer'
                >
                    <i className='topIcon fab fa-github-square'></i>
                </a>
                <a
                    href='https://leetcode.com/prateekmandaliya/'
                    target='_blank'
                    rel='noreferrer'
                >
                    <i class='topIcon fas fa-file-code'></i>
                </a>
            </div>
            <div className='topCenter'>
                <ul className='topList'>
                    <li className='topListItem'>
                        <Link className='link' to='/'>
                            HOME
                        </Link>
                    </li>
                    <li className='topListItem'>
                        <Link className='link' to='/about'>
                            ABOUT
                        </Link>
                    </li>
                    <li className='topListItem'>
                        <Link className='link' to='/write'>
                            WRITE
                        </Link>
                    </li>
                    <li className='topListItem' onClick={handleLogout}>
                        {user && 'LOGOUT'}
                    </li>
                </ul>
            </div>
            <div className='topRight'>
                {user ? (
                    <Link to='/settings'>
                        <img className='topImg' src={profilePicture} alt='' />
                    </Link>
                ) : (
                    <ul className='topList'>
                        <li className='topListItem'>
                            <Link className='link' to='/login'>
                                LOGIN
                            </Link>
                        </li>
                        <li className='topListItem'>
                            <Link className='link' to='/register'>
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};
