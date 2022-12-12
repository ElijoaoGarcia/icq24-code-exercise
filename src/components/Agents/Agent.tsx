import React, { FC, useEffect, useState } from 'react'
import { IAgent } from "../../types/Agent";
import { isImgUrl } from '../utils';
import './Agent.css'

interface Props {
  agent: IAgent
  showDeepDetails?: boolean
  onSelect: () => void
}

const Agent: FC<Props> = ({
  agent, showDeepDetails, onSelect
}) => {
  const [photo, setPhoto] = useState(agent.photoUrl)

  useEffect(() => {
    const action = async () => {
      const isValid = await isImgUrl(agent.photoUrl)
      if(!isValid)  setPhoto('/avatar.png')
    }
    action()
  }, [agent])

  return (
    <div className="container" onClick={onSelect}>
      <header>
        <div className="avatar-holder">
          <img src={photo} className="avatar" alt={agent.firstName} />
        </div>
        <h2 className="name">{agent.firstName + ' ' + agent.lastName}</h2>
        {showDeepDetails && (
          <p>
            <b>License: </b> {agent.agentLicense}
          </p>
        )}
      </header>

      {agent.aboutMe && (
        <div className="body">
          { showDeepDetails
            ? agent.aboutMe
            : agent.aboutMe.substring(0, 150)
          }
        </div>
      )}

      <footer>
        <div className="full-width-flex-box">
          <div className="one-third-flex-box">
            <span>{agent.address}</span>
          </div>
          { agent.practiceAreas && (
            <div className="one-third-flex-box">
              <span>Areas of Practice: {agent.practiceAreas}</span>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}

export default Agent