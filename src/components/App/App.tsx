import React, { FC, useEffect, useState } from 'react'
import { IAgent } from '../../types/Agent'
import Form from '../Agents/Form'
import Agents from '../Agents/Agents'
import Details from '../Agents/Details'
import axios from 'axios'
import './App.css'

export async function fetchAgents (): Promise<IAgent[]> {
  const response = await axios.get('/agents')
  return response.data as IAgent[]
}

const replaceSpecialChars = (text = ''): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

const defaultAgent: IAgent = {
  id: 0,
  firstName: '',
  lastName: '',
  photoUrl: '',
  agentLicense: '',
  address: '',
  practiceAreas: '',
  aboutMe: '',
  reviews: []
}

const matchText = (value: string, searchValue: string): any => replaceSpecialChars(value.toLowerCase())
  .match(searchValue.toLowerCase().replace(/\\/g, '\\\\'))

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [agents, setAgents] = useState<IAgent[]>([])
  const [showForm, setShowForm] = useState(false)
  const [agent, setAgent] = useState<IAgent>(defaultAgent)

  const isAgentSelected = agent.id > 0
  const isSearching = search.length > 0

  const onFetchAgents = async (): Promise<void> => {
    setIsLoading(true)
    const data = await fetchAgents()
    setAgents(data)
    setIsLoading(false)
  }

  useEffect(() => {
    onFetchAgents()
  }, [])

  const filterAgents = ({
    practiceAreas, firstName, lastName
  }: IAgent): Boolean => {
    if (
      (matchText(firstName, search) != null) ||
      (matchText(lastName, search) != null) ||
      (matchText(practiceAreas, search) != null)
    ) return true

    return false
  }

  return (
    <>
      <div className="app">

        <div className="top-content">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Type to search'
          />

          <button
            onClick={() => setShowForm(true)}
          >
            Join the team!
          </button>
        </div>

        <Agents
          agents={agents.filter(filterAgents)}
          isSearching={isSearching}
          isLoading={isLoading}
          onSelect={(a) => setAgent(a)}
        />

      </div>

      <Details
        isVisibe={isAgentSelected}
        agent={agent}
        onClose={(fetch) => {
          setAgent(defaultAgent)
          if (fetch) {
            onFetchAgents()
          }
        }}
      />

      <Form
        isVisible={showForm}
        onClose={(fetch) => {
          setShowForm(false)
          if (fetch) onFetchAgents()
        }}
      /> 
    </>
  )
}

export default App
