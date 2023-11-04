import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addTaskToServer } from '../../slices/TaskSlice';
import { useDispatch } from 'react-redux'

function AddTask() {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(addTaskToServer({title,description}))
    setTitle('')
    setDescription('')
  }
  return (
    <section className='my-5'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter Title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Enter description..." />
        </Form.Group>
        <div className='text-end'>
          <Button variant="primary" type="submit" onClick={(e)=>handleClick(e)}>Add Task</Button>
        </div>
      </Form>
    </section>
  )
}

export default AddTask