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
    return <Loader size={10} />
  }

  if(isSearching && !agents.length) {
    return (
      <p>Without results.</p>
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
