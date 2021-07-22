import axios from 'axios';
import { useContext, useState } from 'react';
import './write.css';
import { Context } from '../../context/Context';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function () {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const [cats, setCats] = useState([]);
    // const [updateCats, setUpdateCats] = useState([]);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categories = cats.split(',').map((cat) => cat.trim());

        const newPost = {
            username: user.username,
            title,
            desc,
            categories,
        };
        if (file) {
            const data = new FormData();
            //unique filename
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename;
            try {
                await axios.post('/upload', data);
            } catch (err) {
                console.error(err);
            }
        }
        try {
            //Get all categories and if our cat does not exist, create that category
            let updateCats;
            const getCats = async () => {
                try {
                    const res = await axios.get('/categories');
                    updateCats = res.data;
                    try {
                        categories.map((category) => {
                            let found = false;
                            updateCats.forEach((cat) => {
                                if (cat.name === category) found = true;
                            });
                            if (found === false) {
                                const newCat = {
                                    name: category,
                                };
                                const addCat = async () => {
                                    try {
                                        await axios.post('/categories', newCat);
                                    } catch (err) {
                                        console.error(err);
                                    }
                                };
                                addCat();
                            }
                        });
                    } catch (err) {
                        console.error(err);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            getCats();

            const res = axios.post('/posts', newPost);
            window.location.replace('/post/' + (await res).data._id);
        } catch (err) {}
    };

    return (
        <div className='write'>
            {file && (
                <img
                    className='writeImg'
                    src={URL.createObjectURL(file)}
                    alt=''
                />
            )}
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='writeFormGroup'>
                    <label htmlFor='fileInput'>
                        <i className='writeIcon fas fa-plus'></i>
                    </label>
                    <input
                        type='file'
                        id='fileInput'
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type='text'
                        placeholder='Title'
                        className='writeInput'
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='cats'>
                    <span>
                        Please add categories which are relevant to your blog
                        (comma separated):{' '}
                    </span>
                    <input
                        type='text'
                        onChange={(e) => setCats(e.target.value)}
                        className='catsInput'
                    />
                </div>
                {/* <div className='writeFormGroup'>
                    <textarea
                        placeholder='Say something...'
                        type='text'
                        className='writeInput writeText'
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div> */}
                <div className='writeFormGroup'>
                    <CKEditor
                        editor={ClassicEditor}
                        data={desc}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDesc(data);
                        }}
                    />
                </div>

                <button className='writeSubmit' type='submit'>
                    Publish
                </button>
            </form>
        </div>
    );
}
