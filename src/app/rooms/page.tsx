import { getRooms } from '@/actions/getRooms'
import Link from 'next/link'

export default async function Rooms() {
  const { data, error } = await getRooms()

  if (error) {
    return <div className=''>{error}</div>
  }

  return (
    <section>
      <div
        className='absolute right-[120px] top-[100px] rounded-[20px] bg-primary-pink px-[80px]
          py-[50px]'>
        <div className='w-[486px] rounded-[20px] bg-white p-8'>
          <h2 className='mb-6 text-center text-lg font-bold'>Всі ваші Санти</h2>
          <ul>
            {data.map((room, index: number) => (
              <li
                className='flex items-center justify-between'
                key={room.id}>
                <div className='flex items-center gap-2'>
                  <span className='text-md'> {index + 1}</span>
                  <p className='text-md'>{room.title}</p>
                </div>
                <Link
                  className='px-5 py-2 text-sm text-blue'
                  href={`rooms/${room.id}`}>
                  Детальніше
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}