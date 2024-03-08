import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({ to, task, children }) => {
    return (
        <Link to={{ pathname: to, state: { task } }} className="hover:underline">
            {children}
        </Link>
    );
};

export default CustomLink;
