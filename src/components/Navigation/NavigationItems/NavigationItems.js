import React from 'react';
//import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul class="navbar-nav ml-auto">
        <NavigationItem link="/" exact >Home</NavigationItem>
        {/*<NavigationItem link="/tutorial" exact>Tutorial</NavigationItem> */}
    </ul>
);

export default navigationItems;