import axios from 'axios';
import { API_URL } from '../../api_url';

export class ProductsRepository {

  url = `${API_URL}`;

  config = {};


  // GET methods

  getProducts() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/items`, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
        });
    });
  }
  getProduct(itemId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/item/${itemId}`, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
        });
    });
  }
  getUser(userId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/user/${userId}`, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
        });
    });
  }
  getUsers() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/users`, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
        });
    });
  }
  getSellerReviews(sellerId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/reviews/${sellerId}`, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
        });
    });
  }
  getSellerRating(sellerId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/userRating/${sellerId}`, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
        });
    });
  }
  getImages(itemId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}/images/${itemId}`, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
        });
    });
  }



  // POST methods

  addReview(review) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.url}/addReview`, review, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
        });
    });
  }



}
