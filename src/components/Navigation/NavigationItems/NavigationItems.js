import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const logout = process.env.REACT_APP_AUTH_URL + "/realms/IPC/protocol/openid-connect/logout?redirect_uri=" + process.env.REACT_APP_URL;

const navigationItems = () => (
    <ul class="navbar-nav ml-auto">
        <NavigationItem link="/" exact > Dashboard </NavigationItem>
        <NavigationItem link="/explore" exact> Data Management </NavigationItem>
        <NavigationItem link="/filerepository" exact> Search </NavigationItem>
        <NavigationItem link="/requestaccess" exact> Requests </NavigationItem>
        <NavigationItem link="/adminpanel" exact> Admin panel </NavigationItem>
        <NavigationItem link={logout} exact> Logout </NavigationItem>
    </ul>
);

export default navigationItems;
