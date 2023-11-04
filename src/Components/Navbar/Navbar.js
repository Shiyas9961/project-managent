import React from 'react'
import {useSelector} from 'react-redux'

function Navbar() {
  const { error,tasksList } = useSelector((state)=>state.tasks)
  return (
    <>
        <h1 className='text-center my-4 text-primary'>Project Management</h1>
        <p className='text-center lead'>{`Currently ${tasksList.length} task(s) completed`}</p>
        {
          error.length !== '' ? <h5 className='text-center text-danger'>{error}</h5> : null
        }
    </>
  )
}

export default Navbar