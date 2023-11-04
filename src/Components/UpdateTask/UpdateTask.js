import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector,useDispatch } from 'react-redux'
import { updateTaskInServer} from '../../slices/TaskSlice'

function MyVerticallyCenteredModal(props) {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [id,setId] = useState(0)
    const dispatch = useDispatch()
    const { selectedTask } = useSelector((state)=>state.tasks)

    const updateTask = () => {
      props.onHide()
      dispatch(updateTaskInServer({id,title,description}))
  }

    useEffect(()=>{
      if(Object.keys(selectedTask).length !== 0){
        setTitle(selectedTask.title)
        setDescription(selectedTask.description)
        setId(selectedTask.id)
      }
    },[selectedTask])
    
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter Title..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Enter description..." />
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className='text-end'>
            <Button variant="primary" type="submit" onClick={()=>updateTask()}>Update Task</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default MyVerticallyCenteredModal