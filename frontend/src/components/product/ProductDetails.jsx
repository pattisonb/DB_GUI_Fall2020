import React from 'react'
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
    product: new Product(
      1,
      "iPhone 12",
      "5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance.",
      999,
      [iPhone12BlackImg, iPhone12BlueImg, iPhone12GoldImg, iPhone12PinkImg],
      "2 month old",
    ),

    index: 0
  }


  addReview = (name, rating, comment) => {
    let newReview = new UserReview(name, rating, comment, new Date());
    this.productsRepository.addReview(this.state.product.id, newReview)
      .then(() => {
        alert('Review added!');
        // ..to re-render the component
      });
  }


  thumbsBoxRef = React.createRef();

  thumbnailClicked = (idx) => {
    this.setState({ index: idx })

    const images = this.thumbsBoxRef.current.children
    for (let i = 0; i < images.length; i += 1) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[idx].className = "active";
  }


  render() {
    return (
      <div className="container mt-4">

        <nav className="top-nav-bar">
          <div className="ponyListLogo-box">
            <img src={PonyListLogo} alt="PonyList-logo" width="100px" height="100px" />
          </div>
          <div className="banner-logo-box">
            <a href="#" className="account-logo"><i className="fas fa-user"></i></a>
            <a href="#" className="shopping-cart-logo"><i className="fas fa-shopping-cart"></i>(<span className="cart-count">0</span>)</a>
          </div>
        </nav>

        <div className="productDetails-box">
          <div className="product-img-box">
            <img src={this.state.product.imageName[this.state.index]} alt="iPhone12"/>
          </div>
          <div>
            <p className="productDetails-name">{this.state.product.name}</p>
            <div className="productDetails-price">${this.state.product.price}</div>
            <p>{this.state.product.description}</p>
            <p className="condition-text"><b>Condition: </b>{this.state.product.condition}</p>

            <div className="product-thumbnails-box" ref={this.thumbsBoxRef}>
              {
                this.state.product.imageName.map((img, idx) => 
                  <img key={idx} src={img} alt="iPhone12"
                  onClick={() => this.thumbnailClicked(idx)} />
                )
              }
            </div>
            <button type="button" className="btn btn-warning btn-lg">Add to cart</button>
          </div>
        </div>

        

        <SellerInfo />
        
        {/* <ReviewList reviews={this.state.product.reviews} /> */}

        <ReviewForm addReview={this.addReview} />



      </div>
    )
  }



  componentDidMount() {
    const productId = +this.props.match.params.productId;
    this.productsRepository.getProduct(productId) 
      .then(product => this.setState({ product: product }))

    // To add the "active" className to the initial active image 
    const idx = this.state.index;
    this.thumbsBoxRef.current.children[idx].className = "active"
  }



}

export default ProductDetails
