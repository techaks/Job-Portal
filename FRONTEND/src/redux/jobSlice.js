import {createSlice} from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'job',
    initialState:{
        allJobs: [],
        singleJob:null,
        adminJobs:[],
        query:""
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAdminJobs:(state,action)=>{
            state.adminJobs=action.payload
        },
        setQuery:(state,action)=>{
            state.query=action.payload
        }
    }

})

export const { setAllJobs ,setSingleJob,setAdminJobs,setQuery} = jobSlice.actions;

export default jobSlice.reducer