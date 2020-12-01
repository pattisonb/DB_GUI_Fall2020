import React from 'react';
import { Link } from 'react-router-dom';

import './ProductDetails.css';
import PonyListLogo from '../../img/PonyList.PNG';
import { Product } from '../../models/Product';
import { UserReview } from '../../models/UserReview';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import SellerInfo from './SellerInfo';
import { ProductsRepository } from '../api/ProductsRepository';
import DetailNav from '../layout/DetailNav';

class ProductDetails extends React.Component {
  productsRepository = new ProductsRepository();

  state = {
    product: '',
    seller: '',
    sellerReviews: '',
    images: '',
    currImgIndex: 0,
  };

  myAddReview = (ReviewText, Rating) => {
    let newReview = new UserReview(
      this.state.product.SellerID,
      this.state.product.ItemID,
      window.localStorage.getItem('id') || 1,
      ReviewText,
      Rating
    );

    this.productsRepository.addReview(newReview)
        .then(review => {
          let reviews = this.state.sellerReviews;
          reviews.push(review);
          this.setState({ sellerReviews: reviews });
          alert('User review added!');
        });
  };

  myAddFavoriteItem() {
    let userId = window.localStorage.getItem('id');
    let itemId = this.state.product.ItemID;
    let favoriteItem = {userId, itemId}

    this.productsRepository.addFavoriteItem(favoriteItem)
      .then(x => alert('Item added to your favorite list!'))
  }






  thumbsBoxRef = React.createRef();

  thumbnailClicked = idx => {
    this.setState({ currImgIndex: idx });

    const images = this.thumbsBoxRef.current.children;
    for (let i = 0; i < images.length; i += 1) {
      images[i].className = images[i].className.replace('active', '');
    }
    images[idx].className = 'active';
  };

  render() {
    if (
      !this.state.product ||
      !this.state.sellerReviews ||
      !this.state.images
    ) {
      return <div>Loading ProductDetails...</div>;
    }

    return (
      <div className='container mt-4'>
        <DetailNav />

        <div className='productDetails-box'>
          <div className='product-img-box'>
            <img
              src={
                this.state.images[this.state.currImgIndex].ImageURL
              }
              alt='item-img'
            />
          </div>
          <div>
            <p className='productDetails-name'>
              {this.state.product.ItemName}
            </p>
            <div className='productDetails-price'>
              ${this.state.product.ItemCost}
            </div>
            <p>{this.state.product.ItemDetails}</p>
            <div
              className='product-thumbnails-box'
              ref={this.thumbsBoxRef}
            >
              {
                this.state.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.ImageURL}
                    alt='item-img'
                    onMouseOver={() =>
                      this.thumbnailClicked(idx)
                    }
                  />
                ))
              }
            </div>
            <button
              type='button'
              className='btn btn-info btn-lg'
              onClick={ () => this.myAddFavoriteItem() }
            >
              Favorite this item
                        </button>
          </div>
        </div>

        <SellerInfo seller={this.state.seller} product={this.state.product} />

        <ReviewList reviews={this.state.sellerReviews} />

        <ReviewForm
          myAddReview={ (ReviewText, Rating) =>
            this.myAddReview(ReviewText, Rating )
          }
        />
      </div>
    );
  }

  componentDidMount() {
    // Get the product (the item and user are both returned as a single object in an array)
    const productId = +this.props.match.params.productId;
    this.productsRepository
      .getProduct(productId)
      .then(product => this.setState({ product: product[0] }))
      .then(() => {
        // Get the sellerReviews
        const sellerId = this.state.product.SellerID;
        this.productsRepository
          .getSellerReviews(sellerId)
          .then(reviews => this.setState({ sellerReviews: reviews }));
      })
      .then(() => {
        // Get the seller
        const sellerId = this.state.product.SellerID;
        this.productsRepository
          .getUser(sellerId)
          .then(user => this.setState({ seller: user[0] }));
      })
      .then(() => {
        // Get item images
        this.productsRepository
          .getImages(productId)
          .then(images => this.setState({ images }))
          .then(() => {
            // To add the "active" className to the initial active image
            const idx = this.state.currImgIndex;
            this.thumbsBoxRef.current.children[idx].className =
              'active';
          });
      });
  }
}

export default ProductDetails;
