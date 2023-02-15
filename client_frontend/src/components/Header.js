import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {

    const { user, profile, cart } = useSelector(state => state.userReducer);
     
    const { id, token } = user;

    const { address, orders } = profile;

    const cartCount  = () => {

        if(Array.isArray(cart)){
            return cart.length;
        }
        return 0;
    };
    

    const loginProfile = () => {

        if(token){
            return (
                <li class="nav-item" style={{ backgroundColor: '#4f74ab', width: 90, borderRadius: 50}}>
                    <Link to="/login" className="nav-link btn-light">
                    <i class="fas fa-shopping-cart"></i>
                    <span className="ml-3" style={{ fontSize: '1.1rem', fontWeight: 'bold'}}>{cartCount()}</span>
                    </Link>
                </li>
            );

        }else{

            return (
                <li class="nav-item">
                    <Link to="/login" class="nav-link" href="#">Login</Link>
                </li>
            );

        }
       

    }
    
    /* 
   return (

   <nav class="navbar navbar-expand-sm navbar-light border-bottom" style={{ backgroundColor: '#4f74ab'}}>
        <div class="container-fluid">
            <a href="#"><Link class="navbar-brand text-white" to="/">MicroServices Shopping</Link></a>
            <button class="navbar-toggler btn-lg" data-toggle="collapse" data-target="#navbarNav">
                <i class="fa fa-bars" aria-hidden="true" style={{ backgroundColor: '#4DA052', color: '#FFF'}}></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav m-auto">
                </ul>
                {loginProfile()}
            </div>
        </div>
    </nav> 
    );*/

    return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <Link class="navbar-brand h1" to="/">MicroServices Shopping</Link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <Link class="nav-link" to="/">Home <span class="sr-only"></span></Link>
            </li>
        </ul>
        <ul class="navbar-nav">
            {loginProfile()}
        </ul>
    </div>
    </nav>
    );
}