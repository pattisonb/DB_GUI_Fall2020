import React from 'react'
import { Link } from 'react-router-dom'
import './ProductDetails.css'
import { Product } from '../../models/Product'
import { UserReview } from '../../models/UserReview'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'
import SellerInfo from './SellerInfo'

import PonyListLogo from '../../img/PonyList.PNG'
import iPhone12BlackImg from '../../img/iphones/iPhone12-black.png'
import iPhone12PinkImg from '../../img/iphones/iPhone12-pink.png'
import iPhone12GoldImg from '../../img/iphones/iPhone12-gold.png'
import iPhone12BlueImg from '../../img/iphones/iPhone12-blue.png'
import { ProductsRepository } from '../api/ProductsRepository'



class ProductDetails extends React.Component {

  productsRepository = new ProductsRepository();

  state = {
    product: '',
    sellerReviews: '',
    currImgIndex: 0
  }


  myAddReview = (name, rating, comment) => {
    let newReview = new UserReview(name, rating, comment, new Date());
    this.productsRepository.addReview(this.state.product.id, newReview)
      .then(review => {
        let product = this.state.product;
        product.reviews.push(review)
        this.setState({ product })
        alert('Review added!');
      });
  }


  thumbsBoxRef = React.createRef();

  // thumbnailClicked = (idx) => {
  //   this.setState({ currImgIndex: idx })

  //   const images = this.thumbsBoxRef.current.children
  //   for (let i = 0; i < images.length; i += 1) {
  //     images[i].className = images[i].className.replace("active", "");
  //   }
  //   images[idx].className = "active";
  // }


  render() {

    if (!this.state.product || !this.state.sellerReviews) {
      return <div>Loading ProductDetails...</div>
    }

    return (
      <div className="container mt-4">

        <nav className="top-nav-bar">
          <div className="ponyListLogo-box">
            <Link to='/home'><img src={PonyListLogo} alt="PonyList-logo" width="100px" height="100px" /></Link>
          </div>
          <div className="banner-logo-box">
            <a href="#" className="account-logo"><i className="fas fa-user"></i></a>
            <a href="#" className="shopping-cart-logo"><i className="fas fa-shopping-cart"></i>(<span className="cart-count">0</span>)</a>
          </div>
        </nav>

        <div className="productDetails-box">
          <div className="product-img-box">
            {/* <img src={this.state.product.imageName[this.state.currImgIndex]} alt="iPhone12"/> */}
            <img src={ this.state.product.ImageURL } alt="iPhone12"/>
          </div>
          <div>
            <p className="productDetails-name">{this.state.product.ItemName}</p>
            <div className="productDetails-price">${this.state.product.ItemCost}</div>
            <p>{this.state.product.ItemDetails}</p>
            <div className="product-thumbnails-box" ref={this.thumbsBoxRef}>
              {/* {
                this.state.product.imageName.map((img, idx) => 
                  <img key={idx} src={img} alt="iPhone12"
                  onClick={() => this.thumbnailClicked(idx)} />
                )
              } */}
            </div>
            <button type="button" className="btn btn-warning btn-lg">Add to cart</button>
          </div>
        </div>

        

        <SellerInfo />
        
        <ReviewList reviews={this.state.sellerReviews} />

        <ReviewForm addReview={this.addReview} />



      </div>
    )
  }



  componentDidMount() {
    // The item is returned as an object inside an array 
    const productId = +this.props.match.params.productId;
    this.productsRepository.getProduct(productId) 
      .then(product => this.setState({ product: product[0] }))
    
    const sellerId = +this.state.product.SellerID;
    this.productsRepository.getSellerReviews(sellerId)
      .then(reviews => this.setState({ sellerReviews: reviews }))

    // To add the "active" className to the initial active image 
    // const idx = this.state.currImgIndex;
    // this.thumbsBoxRef.current.children[idx].className = "active"
  }



}

export default ProductDetails
