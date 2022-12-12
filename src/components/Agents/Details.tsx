import React, { FC, Fragment, useRef } from 'react'
import { useOutsideClickDetector } from '../../hooks'
import { IAgent } from '../../types/Agent'
import Agent from './Agent'
import './Details.css'

interface Props {
  isVisibe: boolean
  onClose: (fetch?: boolean) => void
  agent: IAgent
}

const Details: FC<Props> = ({
  isVisibe, onClose, agent
}) => {
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  useOutsideClickDetector(contentWrapperRef, () => {
    onClose()
  })

  if (!isVisibe) return <Fragment />

  return (
    <div className='popup'>
      <div ref={contentWrapperRef} className="details-content details">
        <header className='header'>
          <h2>{agent.firstName}&apos; profile</h2>

          <button type='button' onClick={() => onClose()}>
                        x
          </button>
        </header>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Agent
            showDeepDetails
            onSelect={() => {}}
            agent={agent}
          />
        </div>
      </div>
    </div>
  )
}

export default Details
