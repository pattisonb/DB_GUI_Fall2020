
import React from 'react'
import { Link } from 'react-router-dom'

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
        <div className="seller-info-details-box">
          <p><b>Seller:</b> Shiba</p>
          <div className="rating-box">
            <p className="rating-text"><b>Rating:</b></p>
            <Rating />
          </div>
          <p><b>On campus:</b> Yes</p>
          <p><b>Items sold: </b>3</p>
          <Link to="/home"><p><b>Reviews</b> (<span>18</span>)</p></Link>
        </div>


      </div>

    )
  }



}


export default SellerInfo