import React from 'react'
import { TodoWrapper } from './TodoWrapper'
import { TipsBlock } from './TipsBlock'

export const PageWrapper = () => {
  return (
    <div className='PageWrapper'>
      <TodoWrapper />
      <TipsBlock />
    </div>
  )
}
