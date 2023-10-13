import React from 'react'
import { useSocket } from '../../../context/socket.context'

const Rooms = () => {
    const {socket} = useSocket()
  return (
    <div>this is {socket.id}</div>
  )
}

export default Rooms