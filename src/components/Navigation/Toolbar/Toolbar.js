import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => (
    <nav class="navbar navbar-light navbar-expand-sm">
        <div class="container">
            <a class="navbar-brand" href="/">
                Hi there 
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