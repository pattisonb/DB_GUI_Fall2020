import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../api_url';
import { useState } from 'react';
import DetailNav from '../layout/DetailNav';
import Rating from '../product/Rating';
import PastItems from '../Items/PastItems';
import { CurrentItems } from '../Items/CurrentItems';
import { ProductsRepository } from '../api/ProductsRepository';

import './ProfilePage.css';

Array.prototype.swap = function (x, y) {
    if (this[x] > this[y]) {
        let b = this[x];
        this[x] = this[y];
        this[y] = b;
    }
    return this;
};

export class ProfilePage extends React.Component {
    state = {
        id: +this.props.match.params.id,
        user: '',
        userRating: '',
        reviews: [],
        favoriteItems: [],
        selfId: parseInt(window.localStorage.getItem('id')),
        listingCount: null,
        salesCount: null
    };

    productsRepository = new ProductsRepository();


    imageExists(image_url){
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        try {
            http.send();
        }
        catch(err) {
            return false;
        }
        return http.status != 404;
    }

    changeProfileImage() {
        var imgUrl = prompt("Please paste your img URL", "URL goes here");
        if (imgUrl != null && this.imageExists(imgUrl)) {
            alert("Success");
            //Update profile picture here
        }else{
            alert("URL is invalid or Does not exist");
        }
    }

    render(){
        if(this.state.user == 0){
            return <div>Loading Home...</div>;
        }
        return (
            <div className='ProfilePage mt-4 p-4'>
                <DetailNav />
            <div className='container-fluid master-container mt-4'>
            <div className='jumbotron bg-smu-blue-home'>
            <div className='side-nav-bar-img-box'>
                <img src={this.state.user.ProfilePicture} alt='profile-img' width='150px' height='150px' />
                </div>
                {this.state.selfId === this.state.user.UserID &&
                    <button type="button" class="btn btn-secondary btn-sm" onClick={() => {this.changeProfileImage()}}>Change img</button>
                }
                <h1 className='text-align-center'>
                {this.state.user.Username}
                </h1>
                <div className='logo-separator'></div>
                <table className='tablew-50'>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>Rating</th>
                                <td><Rating value={this.state.userRating.Rating} /></td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{this.state.user.Location}</td>
                            </tr>
                            {this.state.user.OnCampus === "YES" &&
                            <tr>
                                <th>Dorm</th>
                                <td>{this.state.user.Dorm}</td>
                            </tr>}
                            <tr>
                                <th>Miles Away</th>
                                <td>{this.state.user.MilesAway}</td>
                            </tr>
                        </tbody>
                    </table>
                    {this.state.id == window.localStorage.getItem('id')
                            ? 
                                <Link
                                    className='btn mx-auto mt-5 w-75 btn-block btn-primary'
                                    to={`/sellItems/${this.state.id}`}
                                >
                                    {' '}
                                    Creat a new listing!{' '}
                                </Link>
                            :
                            <Link
                            to={`/chat?name=${window.localStorage.getItem(
                                'id'
                            )}&room=${[
                                `${window.localStorage.getItem('id')}`,
                                '-',
                                this.state.user.UserID,
                            ]
                                .swap(0, 2)
                                .join('')}`}
                            className='btn mx-auto mt-5 w-75 btn-block btn-chat'
                        >
                            Contact User
                        </Link>
                    }
                    

                    
            </div>

            <div class="container emp-profile">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                    <a class="nav-link active" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="true"><h4 id="text">Reviews({this.state.reviews.length})</h4></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="listings-tab" data-toggle="tab" href="#listings" role="tab" aria-controls="listings" aria-selected="false"><h4 id="text">Listings({this.state.listingCount})</h4></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pastSales-tab" data-toggle="tab" href="#pastSales" role="tab" aria-controls="pastSales" aria-selected="false"><h4 id="text">Past Sales({this.state.salesCount})</h4></a>
                    </li>
                    {this.state.selfId === this.state.user.UserID &&
                    <>
                    <li class="nav-item">
                        <a class="nav-link" id="favoriteItems-tab" data-toggle="tab" href="#favoriteItems" role="tab" aria-controls="favoriteItems" aria-selected="false"><h4 id="text">Favorited Items({this.state.favoriteItems.length})</h4></a>
                    </li>
                    </>
                    }
                </ul>
                <div class="tab-content profile-tab">
                    <div class="tab-pane fade show active" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                    {this.state.reviews.length === 0 && (
                        <>
                        <h2 className='text-center display-3'>
                            {this.state.id == window.localStorage.getItem('id')
                                ? "You don't have"
                                : "This seller doesn't have"}{' '}
                        </h2>
                        <h2 className='text-center display-3'>
                            any reviews yet.
                        </h2>
                        </>
                    )}
                    {
                    this.state.reviews.map((review, idx) =>
                        <article key={idx} className="card mb-4">
                        <div className="card-header">
                            <Rating value={ review.Rating } />
                        </div>
                        <div className="card-body">
                            <p className="text-secondary">{ review.Username }
                            <span className="float-right">{ new Date(review.Date).getFullYear() }-{ new Date(review.Date).getMonth() + 1 }-{ new Date(review.Date).getDate() }</span>
                            </p>
                            <p>"{ review.ReviewText }"</p>
                        </div>
                        </article>)
                    }
                    </div>
                    <div class="tab-pane fade" id="listings" role="tabpanel" aria-labelledby="listings-tab">
                        <CurrentItems id={this.state.id}/>
                    </div>
                    <div class="tab-pane fade" id="pastSales" role="tabpanel" aria-labelledby="pastSales-tab">
                        <PastItems id={this.state.id}/>
                    </div>
                    <div class="tab-pane fade" id="favoriteItems" role="tabpanel" aria-labelledby="favoriteItems-tab">
                    {this.state.favoriteItems.length === 0 && (
                        <h2 className='display-3 mt-5 text-center'>
                            No items to show...
                        </h2>
                    )}
                    {
                    this.state.favoriteItems.map((product, idx) =>
                        <article key={idx} className="card mb-4">
                        <div className="card-header">
                            <Link to={`/products/${product.ItemID}`}>
                            {product.ItemName}
                            </Link>
                        </div>
                        <div className="card-body">
                        <Link to={`/products/${product.ItemID}`}>
                            <img
                            src={product.ImageURL}
                            alt='product-image'
                            width='100px'
                            height='100px'
                            className='ml-3 mr-2'
                            />
                        </Link>
                            <p className="text-secondary">
                            <span className="float-right">{ new Date(product.DatePosted).getFullYear() }-{ new Date(product.DatePosted).getMonth() + 1 }-{ new Date(product.DatePosted).getDate() }</span>
                            </p>
                            <p>"{ product.ItemDetails }"</p>
                        </div>
                        </article>)
                }
                    </div>
                </div>
            </div>
            </div>
            </div>
        );
    }

    componentDidMount() {
        const userId = +this.props.match.params.id;
        if(userId){
          this.productsRepository.getFavorites(userId) 
            .then(items => this.setState({ favoriteItems: items }))
          this.productsRepository.getUser(userId)
            .then(user => this.setState({ user: user[0] }))
          this.productsRepository.getSellerReviews(userId)
            .then(reviews => this.setState({ reviews: reviews }))
          this.productsRepository.getSellerRating(userId)
            .then(rating => this.setState({ userRating: rating[0] }))
          this.productsRepository.getListingsCount(userId)
            .then(count => this.setState({ listingCount: count }))
          this.productsRepository.getSoldItemsCount(userId)
            .then(count => this.setState({ salesCount: count }))
        }
      }
}

export default ProfilePage;
