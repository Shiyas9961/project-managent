import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    tasksList : [],
    selectedTask : {},
    isLoading : false,
    error : ''
}

const BASE_URL = 'http://localhost:4000/api/tasks'

//GET
export const getTaskFromServer = createAsyncThunk(
    "tasks/getTaskFromServer",
    async (_,{rejectWithValue}) => {
        const response = await fetch(BASE_URL)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error : "No tasks found !"})
        }
    }
)

//POST
export const addTaskToServer = createAsyncThunk(
    "tasks/addTaskToServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method:'POST',
            body: JSON.stringify(task),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL,options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error : "Task did'nt add !"})
        }

    }
)

//PUT
export const updateTaskInServer = createAsyncThunk(
    "tasks/updateTaskInServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method : 'PUT',
            body : JSON.stringify(task),
            headers : {
                "Content-type":"application/json; charset=UTF-8"
            }
        }
        const response = await fetch(`${BASE_URL}/${task._id}`,options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:"Not Upadted !"})
        }
    }
)

//DELETE
export const deleteTaskFromServer = createAsyncThunk(
    "tasks/deleteTaskFromServer",
    async (task,{rejectWithValue})=>{
        const options = {
            method : "DELETE",
        }
        const response = await fetch(`${BASE_URL}/${task._id}`,options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:"Not deleted"})
        }
    }
)


const taskslice = createSlice({
    name : 'tasksSlice',
    initialState : initialState,
    reducers : {
        deleteTaskFromList : (state,action) => {
            state.tasksList = state.tasksList.filter((task)=>{
                return task._id !== action.payload._id
            })
        },
        setTaskList : (state,action) => {
            state.selectedTask = action.payload
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(getTaskFromServer.pending,(state)=>{
            state.isLoading = true
        }).addCase(getTaskFromServer.fulfilled,(state,action)=>{
            state.isLoading = false
            state.error = ''
            state.tasksList = action.payload
        }).addCase(getTaskFromServer.rejected,(state,action)=>{
            state.error = action.payload.error
            state.isLoading = false
            state.tasksList = []
        }).addCase(addTaskToServer.pending,(state)=>{
            state.isLoading = true
        }).addCase(addTaskToServer.fulfilled,(state,action)=>{
            state.isLoading = false
            state.error = ''
            state.tasksList.push(action.payload)
        }).addCase(addTaskToServer.rejected,(state,action)=>{
            state.error = action.payload.error
            state.isLoading = false
        }).addCase(updateTaskInServer.pending,(state)=>{
            state.isLoading = true
        }).addCase(updateTaskInServer.fulfilled,(state,action)=>{
            state.isLoading = false
            state.error = ''
            state.tasksList = state.tasksList.map((item)=>{
                return item._id === action.payload._id ? action.payload : item
            })
        }).addCase(updateTaskInServer.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload.error
        }).addCase(deleteTaskFromServer.pending,(state)=>{
            state.isLoading = true
        }).addCase(deleteTaskFromServer.fulfilled,(state,action)=>{
            state.error = ''
            state.isLoading = false
        }).addCase(deleteTaskFromServer.rejected,(state,action)=>{
            state.error = action.payload.error
            state.isLoading = false
        })
    }
})


export const {addTaskToList,deleteTaskFromList,updateTaskInList,setTaskList} = taskslice.actions

export default taskslice.reducer