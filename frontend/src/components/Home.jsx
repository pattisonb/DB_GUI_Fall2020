import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Navbar from './layout/Navbar';
import './Home.css';
import PonyListLogo from '../img/PonyList.PNG';
import { ProductsRepository } from './api/ProductsRepository';
import Alert from 'react-bootstrap/Alert'

export class Home extends React.Component {

  state = {
    products: [],
    users: [],
    searchItemName: '',
    searchSellerName: '',

    noMatchAlertShow: false
  };


  productsRepository = new ProductsRepository();


  searchItem(input) {
    // This makes the search case-insensitive and whitespace-insensitive
    let filtered_products = this.state.products.filter(item =>
      item.ItemName.toLowerCase().replace(/\s+/g, '').includes(input.toLowerCase().replace(/\s+/g, '')));

    if (filtered_products.length > 0) {
      this.setState({ products: filtered_products });
    }
    else {
      this.setState({ noMatchAlertShow: true })
    }

  }
  searchSeller(input) {
    let filtered_products = this.state.products.filter(item =>
      item.Username.toLowerCase().replace(/\s+/g, '').includes(input.toLowerCase().replace(/\s+/g, '')));

    this.setState({ products: filtered_products });
  }
  startOver() {
    this.productsRepository.getProducts()
      .then(products => this.setState({ products }));
    // Clear input fields
    this.setState({ searchItemName: '', searchSeller: '' });
  }

  sortProducts(sortMethod) {
    let products = this.state.products;

    if (sortMethod == 'priceLH') {
      products.sort((a, b) => {
        return a.ItemCost - b.ItemCost;
      })
    }
    else if (sortMethod == 'priceHL') {
      products.sort((a, b) => {
        return b.ItemCost - a.ItemCost;
      })
    }
    else if (sortMethod == 'date') {
      products.sort((a, b) => {
        let da = new Date(a.DatePosted)
        let db = new Date(b.DatePosted)
        return db - da;
      })
    }
    else if (sortMethod == 'sellerRating') {

    }

    this.setState({ products })
  }




  render() {
    if (this.state.products.length == 0 || this.state.users.length == 0) {
      return <div>Loading Home...</div>;
    }

    // if (this.state.noMatchAlertShow) {
    //   return (

    //   );
    // }


    return (
      <>
        {/* {window.localStorage.getItem('id') === null && <Redirect to='/' />} */}
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
              <img src={PonyListLogo} alt='PonyList-logo' width='100px' height='100px' />
            </div>

            <div className='logo-separator'></div>

            <div className='sort-menu-box form-group'>
              <label htmlFor='sort-menu'>Sort By</label>
              <select
                name='sort-menu'
                id='sort-menu'
                className='form-control'
                onChange={event => this.sortProducts(event.target.value)}
              >
                <option value='' selected disabled>Choose...</option>
                <option value='priceLH'>Price: Low-High</option>
                <option value='priceHL'>Price: High-Low</option>
                <option value='date'>Newest Posts</option>
                <option value='sellerRating'>Seller Rating</option>
              </select>
            </div>

            <div className='logo-separator'></div>

            <div className='location-menu-box form-group'>
              <label htmlFor='location-menu'>Location</label>
              <select
                name='location-menu'
                id='location-menu'
                className='form-control'
              >
                <option value='' selected disabled>Choose...</option>
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
              <label
                class='form-check-label'
                for='radio-btn-used'
              >
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
            </div>

            <div className='mb-4'>
              <button
                type='button'
                className='btn btn-info btn-sm'
                onClick=""
              >
                Filter
              </button>
            </div>


          </nav>

          <div className='search-bar-container'>

            <div className='search-bar-container-inner'>

              <div className='search-bars-box'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='search-bar-input form-control'
                    placeholder='Enter an item...'
                    value={this.state.searchItemName}
                    onChange={event => this.setState({ searchItemName: event.target.value })}
                  />
                  <div className='input-group-append'>
                    <button
                      className='btn btn-primary'
                      type='button'
                      onClick={() => this.searchItem(this.state.searchItemName)}
                    >
                      <i className='fas fa-search'></i>
                    </button>
                  </div>
                </div>
                <div className='input-group'>
                  <input
                    type='text'
                    className='search-bar-input form-control'
                    placeholder='Enter a seller...'
                    value={this.state.searchSellerName}
                    onChange={event => this.setState({ searchSellerName: event.target.value })}
                  />
                  <div class='input-group-append'>
                    <button
                      className='btn btn-primary'
                      type='button'
                      onClick={() => this.searchSeller(this.state.searchSellerName)}
                    >
                      <i className='fas fa-search'></i>
                    </button>
                  </div>
                </div>

              </div>


              <div className='search-bar-btn-box'>
                <button
                  className='btn btn-secondary'
                  type='button'
                  onClick={() => this.startOver()}
                >
                  Start over
              </button>
              </div>

              <div className='Home-SellItem'>
                <Link to={`/sellItems/${window.localStorage.getItem('id')}`} type='button' className='btn btn-warning mr-3 mt-2'>
                  Sell Items
                </Link>
              </div>

            </div>


            <Alert variant="primary"
              show={this.state.noMatchAlertShow}
              onClose={() => this.setState({ noMatchAlertShow: false })}
              dismissible
              className="noMatchAlert">
              <p>Sorry, we couldn't find the item you searched for</p>
            </Alert>

          </div>

          <div className='container-fluid products-container mt-4'>
            {
              this.state.products.map((product, idx) => (

                <div key={idx} className='product-box'>
                  <Link to={`/products/${product.ItemID}`}>
                    <div className='text-center mt-2'>
                      <b className='product-name'>{product.ItemName}</b>
                    </div>
                    <div className='m-2'>
                      <p className='text-secondary'>{product.ItemDetails}</p>
                    </div>
                  </Link>

                  <div className='lower-half-product-box'>
                    <img
                      src={product.ImageURL}
                      alt='product-image'
                      width='100px'
                      height='100px'
                      className='ml-3 mr-2'
                    />
                    <div>
                      <div className='badge badge-primary ml-2'>${product.ItemCost}</div>
                      <p className='mt-3 ml-2'>
                        By&nbsp;
                        <Link to='/home'>
                          {
                            this.state.users.find(user => user.UserID === product.SellerID).Username
                          }
                        </Link>
                        <p><small className="text-muted">{new Date(product.DatePosted).getFullYear()}-{new Date(product.DatePosted).getMonth() + 1}-{new Date(product.DatePosted).getDate()}</small></p>
                      </p>
                    </div>
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
      .then(products => this.setState({ products }));
    this.productsRepository.getUsers()
      .then(users => this.setState({ users }));
  }
}

export default Home;
