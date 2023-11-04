import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import MyVerticallyCenteredModal from '../UpdateTask/UpdateTask';
import { useSelector,useDispatch } from 'react-redux'
import { setTaskList,deleteTaskFromList,getTaskFromServer, deleteTaskFromServer } from '../../slices/TaskSlice';
import { useEffect } from 'react';

function TableComponent() {
    const [modalShow,setModalShow] = useState(false)
    const dispatch = useDispatch()
    const { tasksList } = useSelector((state)=>state.tasks)

    useEffect(()=>{
        dispatch(getTaskFromServer())
    },[dispatch])

    const updateTask = (task) => {
        setModalShow(true)
        dispatch(setTaskList(task))
    }
    const deleteTask = (task) => {
        dispatch(deleteTaskFromServer(task))
        dispatch(deleteTaskFromList(task))
    }
  return (
    <>
        <Table striped bordered hover>
            <thead>
                <tr className='text-center'>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasksList && tasksList.map((task,index)=>{
                        return (
                            <tr key={task.id} className='text-center'>
                                <td>{index+1}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td><Button onClick={()=>updateTask(task)} className='mx-3' variant="primary"><i className="bi bi-pencil-square"></i></Button><Button onClick={()=>deleteTask(task)} variant="primary"><i className="bi bi-trash3"></i></Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}/>
    </>
  )
}

export default TableComponent