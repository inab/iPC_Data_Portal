import React from 'react';
//import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const logout = "https://inb.bsc.es/auth/realms/IPC/protocol/openid-connect/logout?redirect_uri=" + process.env.REACT_APP_URL;

const navigationItems = () => (
    <ul class="navbar-nav ml-auto">
        <NavigationItem link="/" exact > Dashboard </NavigationItem>
        <NavigationItem link="/explore" exact> Data Management </NavigationItem>
        <NavigationItem link="/filerepository" exact> File Repository </NavigationItem>
        <NavigationItem link="/requestaccess" exact> My Requests </NavigationItem>
        <NavigationItem link="/adminpanel" exact> Admin panel </NavigationItem>
        <NavigationItem link={logout} exact> Logout </NavigationItem>
    </ul>
);

// Here I will have to use Redux for storing admin role status

export default navigationItems;