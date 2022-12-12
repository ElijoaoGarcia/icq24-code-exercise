import React, { FC } from 'react'
import { IAgent } from "../../types/Agent";
import './Agent.css'

interface Props {
  agent: IAgent
  showDeepDetails?: boolean
  onSelect: () => void
}

const Agent: FC<Props> = ({
  agent, showDeepDetails, onSelect
}) => {
  const photo = agent.photoUrl ? agent.photoUrl : '/avatar.png'
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

      <div className="body">
        { showDeepDetails
          ? agent.aboutMe
          : agent.aboutMe.substring(0, 150)
        }
      </div>

      <footer>
        <div className="full-width-flex-box">
          <div className="one-third-flex-box">
            <span>{agent.address}</span>
          </div>
          <div className="one-third-flex-box">
            <span>Areas of Practice: {agent.practiceAreas}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Agent