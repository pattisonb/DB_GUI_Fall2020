
import React from 'react'

import Rating from './Rating'
import './SellerInfo.css'
import buffDogImg from '../../img/buff_dog.png'

class SellerInfo extends React.Component {

  state = {

  }


  render() {
    return (
      <div className="seller-info-box m-5">
        <img src={buffDogImg} alt="seller-photo" />
        <div>
          <p>Seller:   Shiba</p>
          <div className="rating-box">
            <p className="rating-text">Rating:</p>
            <Rating />
          </div>
        </div>





      </div>
    )
  }



}


export default SellerInfo