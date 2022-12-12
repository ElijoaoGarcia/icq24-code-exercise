import React, { FC } from 'react'
import { IReview } from '../../types/Agent'
import './Review.css'

interface Props {
  review: IReview
}

const Review: FC<Props> = ({ review }) => {
  return (
    <div className='review-container'>
      <h3>{review.fullName}</h3>
      <p>
        {review.description}
      </p>
    </div>
  )
}

export default Review