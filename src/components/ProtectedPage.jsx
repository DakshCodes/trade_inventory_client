
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users';
import { Avatar, Badge, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';
import './navbar.css'

const ProtectedPage = ({ children }) => {

  const [state, setstate] = useState(1)
  const active = (number) => {
    setstate(number)
  }


  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {

    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));

      if (response.success) {
        dispatch(SetUser(response.data))
        navigate("/")
      }
      else {
        navigate("/")
        // message.error(response.message)
        // window.ref
      }

    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/")
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      message.error("Please Login to Continue");
      navigate("/")
    }

  }, [])
  return (

    !user && (
      <>
        {/* header */}
        <div className='h-[13vh]'>
          <div className='flex justify-between items-center bg-[#292a2e] p-5'>
            <div className='text-white cursor-pointer'>
              <h1 className='text-2xl font-semibold'>Trade</h1>
              <span>Inventory</span>
              <div className='bg-[#068FFF] h-[0.2rem]'></div>
            </div>
            <div className='bg-white rounded-md py-2 px-5 flex items-center gap-8'>
              <div className='flex items-center gap-2'>
                <span className='underline cursor-pointer'>Daksh</span>
              </div>
              <p className="text-md text-black ri-logout-box-r-line cursor-pointer">LogOut</p>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className='main-content'>
          <div className="horizontal-tabs">
            <a href="#" onClick={() => active(1)} className={`${state === 1 && "active"}`}>Home</a>
            <a href="#" onClick={() => active(2)} className={`${state === 2 && "active"}`}>Masters</a>
            <a href="#" onClick={() => active(3)} className={`${state === 3 && "active"}`}>Manage Purchase</a>
            <a href="#" onClick={() => active(4)} className={`${state === 4 && "active"}`}>Production</a>
            <a href="#" onClick={() => active(5)} className={`${state === 5 && "active"}`}>Inventory</a>
            <a href="#" onClick={() => active(6)} className={`${state === 6 && "active"}`}>Sales</a>
            <a href="#" onClick={() => active(7)} className={`${state === 7 && "active"}`}>Human Resource</a>
            <a href="#" onClick={() => active(8)} className={`${state === 8 && "active"}`}>Front Office</a>
            <a href="#" onClick={() => active(9)} className={`${state === 9 && "active"}`}>Transport</a>
          </div>
          <div className="content-tabs">
            <div className={state === 1 ? "content  active-content" : "content"}>
              <h2>Content 1 bujbvujyjv</h2>
            </div>
            <div className={state === 2 ? "content  active-content" : "content"}>
              <h2>Content 2</h2>
            </div>
          </div>
        </div>
      </>
    )

  )
}

export default ProtectedPage
