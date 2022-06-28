import React from 'react';

const navigationItem = ( props ) => {

    var role = localStorage.getItem("role");

    var htmlLink = (
        <li>
        <a  href={props.link}
            class="toolbar"
            >{props.children}</a>
        </li>            
    ) 

    var logout = "https://inb.bsc.es/auth/realms/IPC/protocol/openid-connect/logout?redirect_uri=https://catalogue.ipc-project.bsc.es"
    
    if(role == "admin") {
        if(props.link == "/adminpanel" ||  props.link == logout) {
            return htmlLink
        } else {
            return (null)
        }
    }
    
    if(role == "user") {
        if(props.link != "/adminpanel" ||  props.link == logout) {
            return htmlLink
        } else {
            return (null)
        } 
    }
    
};

export default navigationItem;