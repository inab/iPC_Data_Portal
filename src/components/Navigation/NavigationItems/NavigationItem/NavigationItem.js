import React from 'react';
import classes from './NavigationItem.module.css';

const navigationItem = ( props ) => (
    <li>
        <a  href={props.link}
            className={classes.toolbarFormatting}
            >{props.children}</a>
    </li>
);

export default navigationItem;