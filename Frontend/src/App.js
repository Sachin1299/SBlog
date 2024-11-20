import { useEffect, useState } from 'react';
import authService from './appwrite/auth'
import {useDispatch} from 'react-redux'
import {login, logout} from './store/authSlice'
import {Header, Footer} from "./component/index"
import { Outlet } from 'react-router-dom'
import './App.css';



function App() {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    authService.getCurrentUser().then((userdata)=>{
      if(userdata){
         dispatch(login({userdata}))
      }
      else{
        dispatch(logout())
      }
    }).finally(()=>{
      setLoading(false);
    })
  }, [])
  
  return !Loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet/> 
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App;
