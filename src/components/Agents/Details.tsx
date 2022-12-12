import React, { ChangeEvent, FC, Fragment, useEffect, useRef, useState } from 'react'
import { useHiddenBodyScroll, useOutsideClickDetector } from '../../hooks'
import { IAgent, INewReview, IReview } from '../../types/Agent'
import axios from 'axios'
import Loader from '../Loader'
import Agent from './Agent'
import Review from './Review'
import './Details.css'

interface Props {
  isVisible: boolean
  onClose: (fetch?: boolean) => void
  agent: IAgent
}

const defaultReview: INewReview = {
  fullName: '',
  description: '',
  agentId: 0
}

const sendReview = async (review: INewReview) => {
  await axios.post('/reviews', { review })
}

const Details: FC<Props> = ({
  isVisible, onClose, agent
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(defaultReview)
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  useOutsideClickDetector(contentWrapperRef, () => {
    onClose()
  })
  useHiddenBodyScroll(isVisible)

  const inputHandle = ({ target: { name, value } }: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>): void => {
    setData({
      ...data,
      [name]: value
    })
  }

  const onSubmitReview = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      if(
        !data.fullName ||
        !data.description
      ) return alert('Please complete all the fields.')

      const review: IReview = {
        ...data,
        id: agent.reviews.length++
      }
      agent.reviews.push(review)
      await sendReview({ ...data, agentId: agent.id })
      setData(defaultReview)
    } catch (error) {
      alert('Something went wrong, please try it again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return <Fragment />

  return (
    <div className='popup'>
      <div ref={contentWrapperRef} className="details-content">
        <header className='header'>
          <h2>{agent.firstName}&apos; profile</h2>

          <button type='button' onClick={() => onClose()}>
            x
          </button>
        </header>

        <div className='details-container'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Agent
              showDeepDetails
              onSelect={() => {return}}
              agent={agent}
            />
          </div>

          <ul>
            {agent.reviews.map((review) => (
              <Review
                key={review.id}
                review={review}
              />
            ))}
          </ul>

          <form onSubmit={onSubmitReview}>
            <h2>New review</h2>
            <div className='input-container'>
              <label htmlFor="fullName">Name</label>
              <input
                type="text"
                name='fullName'
                value={data.fullName}
                onChange={inputHandle}
              />
            </div>

            <div className='input-container'>
              <label htmlFor="description">Description</label>
              <textarea
                name='description'
                value={data.description}
                onChange={inputHandle}
              />
            </div>

            <button type="submit">
              { isLoading
                ? <Loader size={15} />
                : 'Send'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Details
