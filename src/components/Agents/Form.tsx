import React, { ChangeEvent, FC, FormEvent, Fragment, useEffect, useRef, useState } from 'react'
import { useHiddenBodyScroll, useOutsideClickDetector } from '../../hooks'
import { INewAgent } from '../../types/Agent'
import axios from 'axios'
import Loader from '../Loader'
import './Form.css'
import { urlValidator, whiteSpaceValidator } from '../utils'

interface Props {
    isVisible: boolean
    onClose: (fetch?: boolean) => void
}

const defaultAgent: INewAgent = {
  firstName: '',
  lastName: '',
  photoUrl: '',
  agentLicense: '',
  address: '',
  practiceAreas: '',
  aboutMe: ''
}

const Form: FC<Props> = ({
  isVisible, onClose
}) => {
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(defaultAgent)

  useOutsideClickDetector(contentWrapperRef, () => {
    onClose(false)
  })
  useHiddenBodyScroll(isVisible)

  useEffect(() => {
    if (isVisible) {
      setData(defaultAgent)
    }
    // eslint-disable-next-line
  }, [isVisible])

  const inputHandle = ({ target: { name, value } }: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>): void => {
    setData({
      ...data,
      [name]: value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setIsLoading(true)

      if (
        !data.firstName || !data.lastName ||
        !data.agentLicense || !data.address ||
        whiteSpaceValidator(data.firstName) || whiteSpaceValidator(data.lastName) ||
        whiteSpaceValidator(data.address) || whiteSpaceValidator(data.agentLicense)
      ) {
        return alert('Please complete all the fields.')
      }

      if((data.photoUrl && !urlValidator(data.photoUrl))){
        return alert('Image url invalid, please choose another one.')
      }

      await axios.post('/agents', { agent: data })
      onClose(true)
    } catch (error) {
      alert('Something went wrong, please try it again')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return <Fragment />

  return (
    <div className='popup'>
      <div ref={contentWrapperRef} className="form-content">
        <header>
          <h2>New member</h2>

          <button type='button' onClick={() => onClose()}>
                        x
          </button>
        </header>

        <form onSubmit={onSubmit}>
          <div className='input-container'>
            <label htmlFor="firstName">Firstname</label>
            <input
              type="text"
              name='firstName'
              value={data.firstName}
              onChange={inputHandle}
            />
          </div>

          <div className='input-container'>
            <label htmlFor="lastName">Lastname</label>
            <input
              type="text"
              name='lastName'
              value={data.lastName}
              onChange={inputHandle}
            />
          </div>

          <div className='input-container'>
            <label htmlFor="agentLicense">License</label>
            <input
              type="text"
              name='agentLicense'
              value={data.agentLicense}
              onChange={inputHandle}
            />
          </div>

          <div className='input-container'>
            <label htmlFor="photoUrl">Photo</label>
            <input
              type="text"
              name='photoUrl'
              value={data.photoUrl}
              onChange={inputHandle}
            />
          </div>

          <div className='input-container'>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name='address'
              value={data.address}
              onChange={inputHandle}
            />
          </div>

          <div className='input-container'>
            <label htmlFor="aboutMe">About</label>
            <textarea
              // type="text"
              name='aboutMe'
              value={data.aboutMe}
              onChange={inputHandle}
            />
          </div>

          <div className='input-container'>
            <label htmlFor="practiceAreas">Practice areas</label>
            <input
              type="text"
              name='practiceAreas'
              value={data.practiceAreas}
              onChange={inputHandle}
            />
          </div>

          <button type="submit">
            {isLoading
              ? <Loader size={15} />
              : 'Add'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
