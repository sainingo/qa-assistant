import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
useEffect(()=>{
const banner = localStorage.getItem("Banner")
  if(banner!==null){
    toast.success("Logged In")
  }
localStorage.removeItem("Banner")
},[])
  return (
    <div>Home
    <ToastContainer
    position="top-left"
    autoClose={2000}
    hideProgressBar={true}
    closeOnClick
    />
    </div>
  )
}
export default Home
