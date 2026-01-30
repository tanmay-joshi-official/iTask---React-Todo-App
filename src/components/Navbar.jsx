import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between p-4  bg-gradient-to-r from-violet-700 from-10% to-pink-500 text-white font-medium items-center'>
        <div className="logo cursor-pointer text-xl mx-10">iTask</div>
        <ul className='flex gap-2 md:gap-0'>
            <li className='cursor-pointer hover:scale-105 transition-all'>Home</li>
            <li className='cursor-pointer hover:scale-105 transition-all md:mx-10 sm:mx-5 mx-3 min-w-fit'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar