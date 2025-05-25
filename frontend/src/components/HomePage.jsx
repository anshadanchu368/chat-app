import React from 'react'
import { useChatStore } from '../store/useChatStore'

const HomePage = () => {
   const {selectedUser} = useChatStore();
  return (
    <div>
      nav
    </div>
  )
}

export default HomePage
