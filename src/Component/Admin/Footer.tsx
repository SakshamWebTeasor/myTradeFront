import React from 'react'

type Props = {}

function Footer({}: Props) {
  return (
    // <div className='bottom-0 absolute h-16 bg-slate-800 w-full text-white p-4'>Footer</div>
    <footer className="bottom-0 relative bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2024 Your Admin Dashboard. All rights reserved.</p>
    </footer>
  )
}

export default Footer