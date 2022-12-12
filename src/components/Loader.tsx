import React, { FC } from 'react'

interface Props {
  size: number
}

const Loader: FC<Props> = ({ size }) => {
  return (
    <div className="loader" style={{ width: size, height: size }} />
  )
}

export default Loader
