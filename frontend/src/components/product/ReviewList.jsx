import React from 'react'
import Rating from './Rating'

class ReviewList extends React.Component {

  dynamicDisplayReminder = () => {
    if (this.props.reviews.length > 0) {
      return {
        display: 'none'
      }
    }
  }

  render() {

    return (
      <div>
        <h3>Product Reviews <span className="text-secondary">({this.props.reviews.length})</span></h3>
        <p className="add-review-reminder" style={this.dynamicDisplayReminder()}>Be the first to add a review!</p>
        {
          this.props.reviews.map((review, idx) =>
            <article key={idx} className="card mb-4">
              <div className="card-header">
                <Rating value={review.rating} />
              </div>
              <div className="card-body">
                <p className="text-secondary">{review.userName}
                  <span className="float-right">{review.date}</span>                  
                  {/* <span className="float-right">{review.date.getFullYear()}-{review.date.getMonth() + 1}-{review.date.getDate()}</span> */}
                </p>
                <p>"{review.comment}"</p>
              </div>
            </article>)
        }
      </div>
    )

  }
}

export default ReviewList
