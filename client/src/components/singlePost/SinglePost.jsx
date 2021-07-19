import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './singlePost.css';
import { Context } from '../../context/Context';

export default function SinglePost() {
    //Whenever we visit this page, we use the page's url to find post it, and fetch post
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    // const PF = '//localhost:5000/images/';
    const PF = window.location.href + 'images/';
    const { user } = useContext(Context);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [categories, setCategory] = useState([]);
    const [updateMod, setUpdateMod] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get('/posts/' + path);
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.desc);
                setCategory(res.data.categories);
            } catch (error) {}
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { username: user.username },
            });
            window.location.replace('/');
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title: title,
                desc,
            });
            // window.location.reload()
            setUpdateMod(false);
        } catch (err) {}
    };

    return (
        <div className='singlePost'>
            <div className='singlePostWrapper'>
                {post.photo && (
                    <img
                        src={PF + post.photo}
                        alt=''
                        className='singlePostImg'
                    />
                )}
                {updateMod ? (
                    <input
                        type='text'
                        value={title}
                        className='singlePostTitleInput'
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className='singlePostTitle'>
                        {title}
                        {post.username === user?.username && (
                            <div className='singlePostEdit'>
                                <i
                                    className='singlePostIcon far fa-edit'
                                    onClick={() => setUpdateMod(true)}
                                ></i>
                                <i
                                    className='singlePostIcon far fa-trash-alt'
                                    onClick={handleDelete}
                                ></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className='singlePostInfo'>
                    <span className='singlePostAuthor'>
                        Author:
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className='singlePostDate'>
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {updateMod ? (
                    <textarea
                        className='singlePostDescInput'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className='singlePostDesc'>{desc}</p>
                )}
                {updateMod && (
                    <button className='singlePostButton' onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
            {categories && categories.length > 0 && (
                <div className='relatedPostsWrapper'>
                    <span style={{ marginRight: '20px' }}>
                        Read more related blogs:
                    </span>
                    <span className='relatedPosts'>
                        {categories.map((category) => (
                            <div className='relatedCat'>
                                <Link to={`/?cat=${category}`} className='link'>
                                    {category}{' '}
                                </Link>
                            </div>
                        ))}
                    </span>
                </div>
            )}
        </div>
    );
}
