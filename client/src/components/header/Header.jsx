import './header.css';

export default function Header() {
    return (
        <div className='header'>
            <div className='headerTitles'>
                <span className='headerTitleSm'>The</span>
                <span className='headerTitleLg'>Tech Chronicles</span>
            </div>
            <img
                className='headerImg'
                src='https://www.linkpicture.com/q/Screenshot-2021-07-19-at-4.19.01-AM_1.png'
                // src='https://i.pinimg.com/originals/3e/d9/91/3ed991d1339a75c5fdd1f0de9b061549.jpg'
                alt=''
            />
        </div>
    );
}
