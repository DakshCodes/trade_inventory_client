import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react'
import { SetLoader } from "../../redux/loadersSlice"

// import { AddSupplier, EditSupplier } from '../../apicalls/supplier'
// import { AddMaterial, EditMaterial } from '../../apicalls/rawmaterial'
// import { GetMaterialType } from '../../apicalls/materialtype'
// import { AddPProduct, EditPProduct, EditPProduct2 } from '../../apicalls/Proccess'



const Forms = ({ setShowForm, showForm, selectedProduct }) => {


    const rules = [
        {
            required: true,
            message: "Required",
        }
    ]


    return (
        <div>
            <Modal
                open={showForm}
                onCancel={() => setShowForm(false)}
                width={1000}
                centered 
                onOk={() => {
                    setShowForm(false)
                }}
                className=' h-[60vh] overflow-y-scroll'

            >

                <div>
                    <h1 className='font-medium text-3xl mb-7'>Your Inventory Details</h1>
                    <Form
                        layout="vertical" >
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Total Qty" name="total_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Total Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Use in Products" name="use_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Use  Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Reamaining Qty" name="remaining_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Reamin Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default Forms
