import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users';
import { Avatar, Badge, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';

const ProtectedPage = ({ children }) => {

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
        navigate("/auth")
        // message.error(response.message)
        // window.ref
      }

    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/auth")
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      message.error("Please Login to Continue");
      navigate("/auth")
    }

  }, [])
  return (

    user && (
      <div>
        {/* header */}
        <div className='flex justify-between items-center bg-[#292a2e] p-5'>
          <div className='text-white cursor-pointer' onClick={() => { navigate("/") }}>
            <h1 className='text-2xl font-semibold'>Trade</h1>
            <span>Inventory</span>
            <div className='bg-sky-500 h-[0.2rem]'></div>
          </div>
          <div className='bg-white rounded-md py-2 px-5 flex items-center gap-8'>
            <div className='flex items-center gap-2'>
              <img className='w-8' src={user.profilePic} alt="" />
              <span className='underline cursor-pointer' onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                }
                else {
                  navigate("/admin");
                }
              }}>{user?.name}</span>

            </div>
            <p className="text-md text-black ri-logout-box-r-line cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
              }}
            >LogOut</p>
          </div>
        </div>
        <div className="p-5">{children}</div>



      </div>
    )

  )
}

export default ProtectedPage