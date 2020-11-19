
import axios from 'axios'

export class ProductsRepository {

  url = '// http://localhost:8000'
  

  // For populating the ProductsList
  getProducts() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}`, this.config) 
        .then(x => resolve(x.data))
        .catch(err => {
          alert(err);
          reject();
      }); 
    })
  }



  // The GET method
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