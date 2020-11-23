
import axios from 'axios'

export class ProductsRepository {

  url = 'http://localhost:8000'
  


  // GET methods

  // For populating the ProductsList
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

  getProduct(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/${id}`, this.config)  
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
      }); 
    })
  }

  // getUsers() {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`${this.url}/users`, this.config) 
  //       .then(x => resolve(x.data))
  //       .catch(err => {
  //         alert(err);
  //         reject();
  //     }); 
  //   })
  // }



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