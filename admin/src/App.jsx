import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import  {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/add'
import Orders from './pages/orders/orders'
import List from './pages/list/list'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url="https://tomato-mern-stjr.onrender.com"
  return (
    <div>
      <ToastContainer/>

      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>

          <Route path="/orders" element={<Orders url={url}/>}/>        </Routes>
      </div>


    </div>
  )
}

export default App