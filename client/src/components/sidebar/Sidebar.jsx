import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get('/categories');
            setCats(res.data);
        };
        getCats();
    }, []);
    return (
        <div className='sidebar'>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>WELCOME</span>
                <img
                    // src='http://2.bp.blogspot.com/-RjuTsQfSizY/VbtghRxCLyI/AAAAAAAAGbg/PHTI2XP0oDU/s1600/2.jpg'
                    src='https://www.cyberark.com/wp-content/uploads/2019/11/Developer.jpg'
                    alt=''
                />
                <p>
                    Read and Write Blogs! <br></br>
                    Connect with developers across the world!
                </p>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>CATEGORIES</span>
                <ul className='sidebarList'>
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className='link'>
                            <li className='sidebarListItem'>{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>FOLLOW US</span>
                <div className='sidebarSocial'>
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
                        color='green'
                    >
                        <i class='topIcon fas fa-file-code'></i>
                    </a>
                </div>
            </div>
        </div>
    );
}
