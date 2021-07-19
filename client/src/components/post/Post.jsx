import { Link } from 'react-router-dom';
import './post.css';

export default function Post({ post }) {
    // const PF = 'http://localhost:5000/images/';
    // const PF = window.location.origin + 'images/';
    const PF = process.env.PUBLIC_URL + 'images/';
    return (
        <div className='post'>
            {post.photo && (
                <img className='postImg' src={PF + post.photo} alt='' />
            )}

            <div className='postInfo'>
                <div className='postCats'>
                    {post.categories.map((c) => (
                        <div className=''>
                            <span className='postCat'>{c.name}</span>
                            <p>{c.name}</p>
                        </div>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className='link'>
                    <span className='postTitle'>{post.title}</span>
                </Link>

                <hr />
                <span className='postDate'>
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            <p className='postDesc'>{post.desc}</p>
        </div>
    );
}
