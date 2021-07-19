import React from 'react';
import './about.css';

const About = () => {
    return (
        <div className='about'>
            <div className='content'>
                <div className='heading'>
                    <h1>About This Site</h1>
                </div>
                <div className='aboutSection'>
                    <p>
                        Hola Developers and Tech-Bloggers! <br />
                        This is a platform to write your blogs and share your
                        knowledge with your fellow developers. We want to create
                        a huge community for developers across the world to come
                        together, learn from each other, share their views on
                        anything and everything related to tech, and keep
                        updated with all the new tech coming out, and also the
                        latest updates in the existing tools.
                        <br />
                        So welcome! Keep blogging and keep learning!
                    </p>
                    <p>- Prateek Mandaliya (developer)</p>
                </div>
            </div>
        </div>
    );
};

export default About;
