
import axios from 'axios'

export class ProductsRepository {

  url = 'http://localhost:8000'
  // url = 'http://18.188.219.228:8000'
  


  // GET methods

  getProducts() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/items`, this.config) 
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
      }); 
    })
  }
  getProduct(itemId) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/item/${itemId}`, this.config)  
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
      }); 
    })
  }
  getUsers() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/users`, this.config) 
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
      }); 
    })
  }
  getSellerReviews(sellerId) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/reviews/${sellerId}`, this.config)  
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
      }); 
    })
  }


  // The POST method
  addReview(id, review) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/${id}/reviews`, review, this.config)
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
      }); 
    })
  }




}