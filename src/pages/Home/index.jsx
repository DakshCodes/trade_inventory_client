import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import ManageFirm from '../ManageFirm';
import ManageSupplier from '../ManageSupplier';

const Home = () => {
  const { user } = useSelector((state) => state.users);
  return (

    <div className='main-content '>
      <Tabs defaultActiveKey="1" className='mx-7 my-3' size="large">
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
              {/* <ManageSupplier /> */}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Raw Material" key="3">
              ff
            </Tabs.TabPane>
            <Tabs.TabPane tab="Material Type Master" key="4">
              Hodf
            </Tabs.TabPane>
            <Tabs.TabPane tab="State Master" key="5">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Supplier" key="6">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Finish Product Master" key="7">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Financial Year Master" key="8">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Authorised Signature" key="9">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Production Shift" key="10">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Purchase Terms" key="11">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Manage Sales Terms" key="12">
              Home
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Manage Purchase" key="3">
          <Tabs defaultActiveKey="1" className='' >
            <Tabs.TabPane tab="Manage RFQ" key="1">
              Hom
            </Tabs.TabPane>
            <Tabs.TabPane tab="RFQ Comparison" key="2">
              H
            </Tabs.TabPane>
            <Tabs.TabPane tab="Generate Purchase Orders" key="3">
              ff
            </Tabs.TabPane>
            <Tabs.TabPane tab="Purchase Orders Approvals" key="4">
              Hodf
            </Tabs.TabPane>
            <Tabs.TabPane tab="Raw Material Quality Check" key="5">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Material Requirement Planning" key="6">
              Home
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Production" key="4">
          <Tabs defaultActiveKey="1" className='' >
            <Tabs.TabPane tab="Production Scheduling" key="1">
              Hom
            </Tabs.TabPane>
            <Tabs.TabPane tab="Blending of raw Material" key="2">
              H
            </Tabs.TabPane>
            <Tabs.TabPane tab="Quantity & Quality Tracking" key="3">
              ff
            </Tabs.TabPane>
            <Tabs.TabPane tab="Electricity Unit Management" key="4">
              Hodf
            </Tabs.TabPane>
            <Tabs.TabPane tab="Production Cost Sheet" key="5">
              Home
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inventory" key="5">
          <Tabs defaultActiveKey="1" className='' >
            <Tabs.TabPane tab="Purchase item Recevie" key="1">
              Hom
            </Tabs.TabPane>
            <Tabs.TabPane tab="Stock item Issue" key="2">
              H
            </Tabs.TabPane>
            <Tabs.TabPane tab="Stock item Return" key="3">
              ff
            </Tabs.TabPane>
            <Tabs.TabPane tab="Store item Tracking" key="4">
              Hodf
            </Tabs.TabPane>
            <Tabs.TabPane tab="Warehouse Management" key="5">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Stock Balance" key="6">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Low Inventory items" key="7">
              Home
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Sales" key="6">
          <Tabs defaultActiveKey="1" className='' >
            <Tabs.TabPane tab="Quotation Generation" key="1">
              Hom
            </Tabs.TabPane>
            <Tabs.TabPane tab="Quotation Apporval" key="2">
              H
            </Tabs.TabPane>
            <Tabs.TabPane tab="Domestic Order Generation" key="3">
              ff
            </Tabs.TabPane>
            <Tabs.TabPane tab="Order Approval" key="4">
              Hodf
            </Tabs.TabPane>
            <Tabs.TabPane tab="Invoice Generation" key="5">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Packing" key="6">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Documents Generation" key="7">
              Home
            </Tabs.TabPane>
            <Tabs.TabPane tab="Transport Tracking" key="8">
              Home
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Human Resource" key="7">
          <Tabs defaultActiveKey="1" className='' >
            <Tabs.TabPane tab="Manage Employee" key="1">
              Hom
            </Tabs.TabPane>
            <Tabs.TabPane tab="Employee Type Master" key="2">
              H
            </Tabs.TabPane>
            <Tabs.TabPane tab="Atttendance Management" key="3">
              ff
            </Tabs.TabPane>
            <Tabs.TabPane tab="Payroll Management" key="4">
              Hodf
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Front Office" key="8">
          <Tabs defaultActiveKey="1" className='' >
            <Tabs.TabPane tab="Dak Dispatch" key="1">
              Hom
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Home
