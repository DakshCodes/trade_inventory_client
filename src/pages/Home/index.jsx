import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import FinishProduct from '../ManageFinishProduct/FinishProduct';
import ManageFirm from '../ManageFirm';
import ManageRaw from '../ManageRaw/ManageRaw';
import ManageSupplier from '../ManageSupplier';
import MaterialType from '../MaterialType/MaterialType';
import PendingPO from '../PendingPO';
import Proccess1 from '../Proccess-1';
import Proccess2 from '../Proccess-2';
import PurchasedOrder from '../PurchaseOrder';
import ReceviedOrder from '../ReceviedPO';














import Proccess3 from '../Proccess-3';
import Proccess4 from '../Proccess-4';
import Proccess5 from '../Proccess-5';
import Proccess6 from '../Proccess-6';

const Home = () => {
  const { user } = useSelector((state) => state.users);
  return (

    <div className='main-content '>
      <Tabs defaultActiveKey="1" className='mx-6' size="large">
        <Tabs.TabPane tab="Home" key="1">
          <div className='flex flex-col items-center text-center justify-center h-[50vh] w-[100%] m-auto text-4xl'>
            <h1 className='text-5xl font-semibold my-4'>Welcome</h1>
            <h1 className='my-2'>{user?.name} 🙏 </h1>
            <h1 className='font-extralight'>Explore Trade Inventory </h1>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Masters" key="2">
          <Tabs defaultActiveKey="1" size='small' >
            <Tabs.TabPane tab="Manage Firm" key="1">
              <ManageFirm />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Supplier" key="2">
              <ManageSupplier />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Raw Material" key="3">
              <ManageRaw />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Material Type Master" key="4">
              <MaterialType />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Finish Product Master" key="5">
              <FinishProduct />
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Manage Purchase" key="3">
          <Tabs defaultActiveKey="1" className='' >
            <Tabs.TabPane tab="Generate Purchase Orders" key="3">
              <PurchasedOrder />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Pending Purchase Orders" key="4">
              <PendingPO />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Recevied Purchase Orders" key="5">
              <ReceviedOrder />
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Proccess" key="4">
          <Tabs defaultActiveKey="1" className='' >
            <Tabs.TabPane tab="Proccess-1" key="6">
              <Proccess1 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-2" key="7">
              <Proccess2 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-3" key="8">
              <Proccess3 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-4" key="9">
              <Proccess4 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-5" key="10">
              <Proccess5 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-6" key="11">
              <Proccess6 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-7" key="12">
              <PurchasedOrder />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-8" key="13">
              <PurchasedOrder />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-9" key="14">
              <PurchasedOrder />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Proccess-10" key="15">
              <PurchasedOrder />
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Home
