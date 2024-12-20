'use client'

import { useEffect, useState } from 'react'
import { useSantaSocketStore } from '@/stores/useSantaSocketStore'
import { Room } from '@/types/room'
import io from 'socket.io-client'

import SantaMembersList from './components/SantaMembersList/SantaMembersList'
import SantaInfo from './components/SantasInfo'

interface RoomComponentProps {
  roomId: string
  room: Room
  session: string | undefined
}

export default function RoomComponent({
  roomId,
  room,
  session
}: RoomComponentProps) {
  const [currentRoom, setCurrentRoom] = useState<Room>(room)
  const { setSocket } = useSantaSocketStore()

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL)
    setSocket(socket)

    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    socket.emit('connect-room', roomId)

    socket.on('room', room => console.log(room))

    socket.on('room-updated', updatedRoom => {
      console.log('User joined room:', updatedRoom)
      setCurrentRoom(updatedRoom)
    })

    return () => {
      socket.off('connect-room')
      socket.off('user-joined')
      socket.off('room')
      socket.disconnect()
      setSocket(null)
    }
  }, [roomId])

  return (
    <section>
      <div
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px]
          bg-primary-pink px-[80px] py-[50px]'>
        <div className='w-[ w-[1065px] rounded-[20px] bg-white p-8'>
          <SantaInfo santa={currentRoom} />
          <SantaMembersList santa={currentRoom} />
        </div>
      </div>
    </section>
  )
}
