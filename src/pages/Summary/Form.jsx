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
                    <Form
                        layout="vertical" >
                        {/* proccess-1 */}
                        <h1 className='font-medium text-xl mb-7'>Proccess-1</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* proccess-2 */}
                        <h1 className='font-medium text-xl mb-7'>Proccess-2</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* proccess-3  */}
                        <h1 className='font-medium text-xl mb-7'>Proccess-3</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* proccess-4  */}
                        <h1 className='font-medium text-xl mb-7'>Proccess-4</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* proccess-5 */}
                        <h1 className='font-medium text-xl mb-7'>Proccess-5</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                         {/* proccess-6 */}
                         <h1 className='font-medium text-xl mb-7'>Proccess-6</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                         {/* proccess-7 */}
                         <h1 className='font-medium text-xl mb-7'>Proccess-7</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>
                        
                         {/* proccess-8 */}
                         <h1 className='font-medium text-xl mb-7'>Proccess-8</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                         {/* proccess-9 */}
                         <h1 className='font-medium text-xl mb-7'>Proccess-9</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                        </Row>

                         {/* proccess-10*/}
                         <h1 className='font-medium text-xl mb-7'>Proccess-10</h1>
                        <Row gutter={[30, 30]}>
                            <Col span={7}>
                                <Form.Item label="Input Qty" name="input_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Outcome Qty" name="out_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Garbage Qty" name="garbage_qty" >
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Input Qty" disabled="true" />
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
