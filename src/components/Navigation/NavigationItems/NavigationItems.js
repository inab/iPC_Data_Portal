import React from 'react';
//import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul class="navbar-nav ml-auto">
        <NavigationItem link="/" exact >Home</NavigationItem>
        <NavigationItem link="/search" exact>Search</NavigationItem>
        {/*<NavigationItem link="/admin" exact>Admin</NavigationItem>*/}
        <NavigationItem link="/aggs" exact>Aggs</NavigationItem>
        <NavigationItem link="/tables" exact>Tables</NavigationItem>
        <NavigationItem link="/filerepository" exact>File Repository</NavigationItem>
    </ul>
);

export default navigationItems;