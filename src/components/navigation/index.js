import React from 'react';
import {Link} from 'react-router-dom';

const LANDING = '/';
const SIGN_IN = '/signin';
const HOME = '/home';
const ADMIN = '/admin';

const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to={SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={HOME}>Home</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;