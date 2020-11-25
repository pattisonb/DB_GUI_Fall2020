
import React from 'react'
import { Link } from 'react-router-dom'

import Rating from './Rating'
import './SellerInfo.css'
import buffDogImg from '../../img/buff_dog.png'

class SellerInfo extends React.Component {

  render() {
    return (
      <div className="seller-info-box m-5">
        <img src={buffDogImg} alt="seller-photo" />
        <div className="seller-info-details-box">
          <p><b>Seller:</b> {this.props.seller.Username}</p>
          <div className="rating-box">
            <p className="rating-text"><b>Rating:</b></p>
            <Rating value={this.props.seller.Rating} />
          </div>
          <p><b>On campus: </b>{ this.props.seller.OnCampus }</p>
          <p><b>Items sold: </b>{ this.props.seller.NumSales }</p>
          <Link to="/home" className="btn btn-info btn-sm">Go to Profile</Link>
        </div>


      </div>

    )
  }



}


export default SellerInfo