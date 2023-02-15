import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({item}) => {

    const {_id,banner, available, price, name, desc, type} = item;

    return (
    
    
    
      <div class='col-lg col-lg-3 p-4'>
        <div class="bg-light p-5 round-border">
          <Link to={"/details/"+_id}>
          <img variant="top" src={banner} class="imagen"/>
          </Link>
          <h3 class="mt-3">{name}</h3>
          <p className="lead font-weight-bold">${price}</p>
          <span className="m-1"style={{ fontSize: '0.8rem'}}>{desc}</span>
        </div>
        
      </div>
      
    )

    /*
    className="col" style={{ textDecoration: 'none'}}>
            <div className="bg-white" style={{ width: '12rem', height: '22rem', flexDirection: 'column', justifyContent: 'space-around',  display: 'flex', paddingTop: '1rem', paddingBottom: '0.5rem', borderRadius: 7  }}>
              <img variant="top" style={{ width: '12rem'}} src={banner} />
              <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                <p className="display-5" style={{ fontSize: '1.2rem', color: '#3C3C3C'}}></p>
                
                
              </div>
            </div> 
             */
}    

export { ProductCard };