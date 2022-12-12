import React, { FC } from 'react'
import { IAgent } from '../../types/Agent'
import Loader from '../Loader'
import Agent from './Agent'
import './Agents.css'

interface Props {
  agents: IAgent[]
  isLoading: boolean
  isSearching: boolean
  onSelect: (agent: IAgent) => void
}

const Agents: FC<Props> = ({
  agents, isLoading, isSearching,
  onSelect
}) => {

  if(isLoading){
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', marginTop: 10
      }}>
        <Loader size={45} purple />
      </div>
    )
  }

  if(isSearching && !agents.length) {
    return (
      <p className='without-results'>Without results.</p>
    )
  }

  return (
    <div className="agents">
      {agents.map((agent) => (
        <Agent
          onSelect={() => onSelect(agent)}
          key={agent.id}
          agent={agent}
        />
      ))}
    </div>
  )
}

export default Agents
