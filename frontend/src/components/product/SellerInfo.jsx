
import React from 'react'
import { Link } from 'react-router-dom'

import Rating from './Rating'
import './SellerInfo.css'


class SellerInfo extends React.Component {

  render() {
    return (
      <div className="seller-info-box">

        <img src={this.props.seller.ProfilePicture} alt="seller-photo" />
        <div className="seller-info-details-box">
          <p className="seller-text-box"><b>Seller:</b> {this.props.seller.Username}</p>
          <div className="rating-box">
            <p className="rating-text">
              <b>Rating:</b> <Rating value={this.props.product.Rating} class="stars-box-sellerInfo" />
            </p>
          </div>
          <p><b>On campus: </b>{this.props.seller.OnCampus}</p>
          <p><b>Items sold: </b>{this.props.seller.NumSales}</p>
          <Link to="/home" className="btn btn-info btn-sm">Seller Profile</Link>
        </div>

      </div>

    )
  }





}


export default SellerInfo