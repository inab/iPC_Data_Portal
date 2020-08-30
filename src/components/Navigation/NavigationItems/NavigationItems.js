import React from 'react';
//import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul class="navbar-nav ml-auto">
        <NavigationItem link="/" exact > Dashboard </NavigationItem>
        <NavigationItem link="/explore" exact> Explore Data </NavigationItem>
        <NavigationItem link="/filerepository" exact> File Repository </NavigationItem>
        {/*<NavigationItem link="/members" exact> Members </NavigationItem>
        <NavigationItem link="/resources" exact> Resources </NavigationItem>*/}
        <NavigationItem link="https://inb.bsc.es/auth/realms/IPC/protocol/openid-connect/logout" exact> Logout </NavigationItem>
    </ul>
);

export default navigationItems;