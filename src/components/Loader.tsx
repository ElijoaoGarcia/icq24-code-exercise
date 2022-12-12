import React, { FC } from 'react'

interface Props {
  size: number,
  purple?: boolean 
}

const Loader: FC<Props> = ({ size, purple }) => {
  return (
    <span
      className="loader"
      style={{
        width: size,
        height: size,
        borderColor: purple ? '#9442ff' : '#fff',
        borderBottomColor: 'transparent'
      }}
    ></span>
  )
}

export default Loader
