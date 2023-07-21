
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users';
import { Avatar, Badge, message, Tabs } from 'antd';
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
        <div className='h-[10vh]'>
          <div className='flex justify-between items-center bg-[#292a2e] p-3'>
            <div className='text-white cursor-pointer px-3'>
              <h1 className='text-2xl font-semibold'>Trade</h1>
              <span>Inventory</span>
              <div className='bg-[#068FFF] h-[0.2rem]'></div>
            </div>
            <div className='bg-white rounded-md   flex items-center '>
              <div className='flex items-center gap-2 px-4'>
                <span className='underline cursor-pointer'>Daksh</span>
              </div>
              <p className="text-md py-2 px-2 hover:rounded-md  text-black ri-logout-box-r-line cursor-pointer hover:bg-[#068fff] transition-all duration-300 hover:text-[#fff]">LogOut</p>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className='main-content '>
          <Tabs defaultActiveKey="1"  className='mx-7 my-3' size="large">
            <Tabs.TabPane tab="Home"  key="1">

            </Tabs.TabPane>
            <Tabs.TabPane tab="Masters" key="2">
              <Tabs defaultActiveKey="1" className='' >
                <Tabs.TabPane tab="Home" key="1">
                  Hom
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="2">
                  H
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="3">
                  ff
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="4">
                  Hodf
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="5">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="6">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="7">
                  Home
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Purchase" key="3">
              <Tabs defaultActiveKey="1" className='' >
                <Tabs.TabPane tab="Home" key="1">
                  Hom
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="2">
                  H
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="3">
                  ff
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="4">
                  Hodf
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="5">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="6">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="7">
                  Home
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Production" key="4">
              <Tabs defaultActiveKey="1" className='' >
                <Tabs.TabPane tab="Home" key="1">
                  Hom
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="2">
                  H
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="3">
                  ff
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="4">
                  Hodf
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="5">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="6">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="7">
                  Home
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Inventory" key="5">
              <Tabs defaultActiveKey="1" className='' >
                <Tabs.TabPane tab="Home" key="1">
                  Hom
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="2">
                  H
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="3">
                  ff
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="4">
                  Hodf
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="5">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="6">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="7">
                  Home
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sales" key="6">
              <Tabs defaultActiveKey="1" className='' >
                <Tabs.TabPane tab="Home" key="1">
                  Hom
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="2">
                  H
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="3">
                  ff
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="4">
                  Hodf
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="5">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="6">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="7">
                  Home
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Human Resource" key="7">
              <Tabs defaultActiveKey="1" className='' >
                <Tabs.TabPane tab="Home" key="1">
                  Hom
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="2">
                  H
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="3">
                  ff
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="4">
                  Hodf
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="5">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="6">
                  Home
                </Tabs.TabPane>
                <Tabs.TabPane tab="Home" key="7">
                  Home
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    )

  )
}

export default ProtectedPage
