import React from 'react';
//import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul class="navbar-nav ml-auto">
        <NavigationItem link="/" exact > Dashboard </NavigationItem>
        <NavigationItem link="/explore" exact> Explore Data </NavigationItem>
        <NavigationItem link="/filerepository" exact> File Repository </NavigationItem>
        <NavigationItem link="/members" exact> Members </NavigationItem>
        <NavigationItem link="/resources" exact> Resources </NavigationItem>
        <NavigationItem link="https://inb.bsc.es/auth/realms/IPC/protocol/openid-connect/auth?state=5484f2ae69fa95f00286affff7c7514c&response_type=code&approval_prompt=auto&redirect_uri=http%3A%2F%2Fvre.ipc-project.bsc.es%2Fopenvre%2Fapplib%2FloginToken.php&client_id=Ipc-vre" exact> Login </NavigationItem>
    </ul>
);

export default navigationItems;