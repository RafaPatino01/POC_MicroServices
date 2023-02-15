import React, { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard";
import { onSignup, onGetProducts  } from '../store/actions'
import { ProductDetails } from "./ProductDetail";

const Home = () => {
  
    const { categories, products } = useSelector(state => state.shoppingReducer);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(onGetProducts())      
    },[]);

    const listOfcategories = () => {
       return <div className="row" aria-label="Basic example">
          {categories.map(item => {
              return <button key={item} type="button" onClick={() => {}} className="btn btn-lg m-2" style={{ backgroundColor: '#bd203a', borderRadius: 30, color: '#FFF'}}>
              {item.toUpperCase()}
             </button>
          })}
      </div>
    }

    const listOfProducts = () => {

     return products.map((item) => {
        return <ProductCard item={item}/>
      })
      
    }

    /*
    return (
        <div class="container-fluid p-0">
          <img src="bg.jpg" class="card-img" alt="..."></img>
          <div className="container-fluid mb-4" style={{height:80, justifyContent: 'center', backgroundColor: '#4f74ab'}}>
            <div class="row justify-content-center">
              {categories && listOfcategories()}
            </div>
          </div> 
             
          <div className="d-flex flex-row flex-nowrap overflow-auto">
              
          </div>
        </div>
    )
    */

    return (
      <div class="container-fluid p-5 text-center">
        <div > 
          <img src="banner.png" class="w-100"></img>
        </div>
        <hr></hr>
        <div class="row px-5 py-2 mx-1 bg-light-blue">
          {categories && listOfcategories()}
        </div>
        <div class="row py-2">
          {products && listOfProducts()}
        </div>
      </div>
    )

}


export { Home };

 