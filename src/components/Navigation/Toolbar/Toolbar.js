import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import logo from './iPC_4c.png';

const toolbar = () => (
    <nav class="navbar navbar-light navbar-expand-sm">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src={logo} class="logo" alt=""/>
            </a>
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <NavigationItems />
            </div>
        </div>
    </nav>
);

export default toolbar;