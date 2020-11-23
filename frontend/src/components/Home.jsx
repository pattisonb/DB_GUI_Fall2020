// import React, { useState, useEffect } from 'react';
// import logo from '../img/PonyList.PNG';
// import { Loader } from './layout/Loader';
// import Navbar from './layout/Navbar';

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 500);
//   }, []); // here
//   return <>{loading ? <Loader /> : <Navbar />}</>;
// }

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from './layout/Navbar';
import './Home.css';
import iPhone12Img from '../img/iphones/iPhone12-black.png';
import PonyListLogo from '../img/PonyList.PNG';
import { ProductsRepository } from './api/ProductsRepository';

export class Home extends React.Component {
  state = {
    products: []
  };

  productsRepository = new ProductsRepository();

  render() {
    return (
      <>
        {window.localStorage.getItem('id') === null && <Redirect to='/' />}
        <Navbar className='mb-3' />
        <div className='container-fluid master-container mt-4'>
          <div className='banner-container jumbotron'>
            <div className='banner-logo-box--home'>
              <a href='#' className='account-logo'>
                <i class='fas fa-user'></i>
              </a>
              <a href='#' className='shopping-cart-logo'>
                <i className='fas fa-shopping-cart'></i>(
                <span className='cart-count'>0</span>)
              </a>
              <Link className='shopping-cart-logo' to='/chat'>
                <i className='fas fa-comments'></i>
              </Link>
            </div>
          </div>

          <nav className='side-nav-bar-container jumbotron'>
            <div className='side-nav-bar-img-box'>
              <img
                src={PonyListLogo}
                alt='PonyList-logo'
                width='100px'
                height='100px'
              />
            </div>

            <div className='logo-separator'></div>

            <div className='sort-menu-box form-group'>
              <label htmlFor='sort-menu'>Sort By</label>
              <select name='sort-menu' id='sort-menu' className='form-control'>
                <option value=''>Seller Ratings</option>
                <option value=''>Price: Low-High</option>
                <option value=''>Price: High-Low</option>
                <option value=''>New Arrivals</option>
              </select>
            </div>

            <div className='location-menu-box form-group'>
              <label htmlFor='location-menu'>Location</label>
              <select
                name='location-menu'
                id='location-menu'
                className='form-control'
              >
                <option value=''>On-campus</option>
                <option value=''>Off-campus</option>
                <option value=''>Both</option>
              </select>
            </div>

            <div class='condition-radio-box form-check form-check-inline'>
              <input
                class='form-check-input'
                type='radio'
                name='condition-radio-options'
                id='radio-btn-new'
                value=''
              />
              <label class='form-check-label' for='radio-btn-new'>
                New
              </label>
            </div>
            <div class='form-check form-check-inline'>
              <input
                class='form-check-input'
                type='radio'
                name='condition-radio-options'
                id='radio-btn-used'
                value=''
              />
              <label class='form-check-label' for='radio-btn-used'>
                Used
              </label>
            </div>

            <div class='price-range-input-box'>
              <input
                type='text'
                class='price-range-input-min form-control form-control-sm'
                placeholder='$ Min'
              />
              <input
                type='text'
                class='price-range-input-max form-control form-control-sm'
                placeholder='$ Max'
              />
              <button type='button' className='btn btn-secondary btn-sm'>
                Go
              </button>
            </div>

            <div className='logout-btn-box'>
              <button type='button' className='btn btn-light logout-btn'>
                Log out
              </button>
            </div>
          </nav>

          <div className='search-bar-container'>
            <div className='input-group'>
              <input
                type='text'
                className='search-bar-input form-control'
                placeholder='Enter an item or a seller to search for...'
              />
              <div class='input-group-append'>
                <button className='btn btn-primary' type='button'>
                  <i className='fas fa-search'></i>
                </button>
              </div>
            </div>
          </div>

          <div className='container-fluid products-container mt-4'>
            {this.state.products.map((product, idx) => (
              <div key={idx} className='product-box'>
                <img
                  src={iPhone12Img}
                  alt='iPhone12-img'
                  width='100px'
                  height='100px'
                />
                <div>
                  <Link to='/products/5' className='product-name'>
                    <p>
                      iPhone12 Pro,
                      <br />
                      256GB
                    </p>
                  </Link>
                  <div className='product-price'>$999</div>
                  <br></br>
                  <p>
                    By <a href='#'>Seller</a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }


  // Get an array of products from the API to populate our ProductsList 
  componentDidMount() {
    this.productsRepository.getProducts()
      .then(products => this.setState({ products }))
  }

}

export default Home;
