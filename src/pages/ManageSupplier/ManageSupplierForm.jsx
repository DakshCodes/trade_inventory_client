import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react'
import { SetLoader } from "../../redux/loadersSlice"

import { AddSupplier, EditSupplier } from '../../apicalls/supplier'

const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
]
const ManageSupplierForm = ({ setShowSupplierForm, showSupplierForm, getData, selectedSupplier }) => {
    const rules = [
        {
            required: true,
            message: "Required",
        }
    ]

    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);

    useEffect(() => {
        if (selectedSupplier) {
            formRef.current.setFieldsValue(selectedSupplier)
        }
    }, [selectedSupplier])

    const onFinish = async (values) => {
        try {

            dispatch(SetLoader(true));

            let response = null;

            if (selectedSupplier) {
                response = await EditSupplier(selectedSupplier._id, values);
            } else {
                response = await AddSupplier(values);  //we need to specify the response vvariable otherwise it wont work
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowSupplierForm(false);
                formRef.current.resetFields();
            }
            else {
                message.error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message)
        }
    }

    return (
        <div>
            <Modal
                open={showSupplierForm}
                onCancel={() => setShowSupplierForm(false)}
                width={800}
                centered
                okText={`${selectedSupplier ? "Save Changes" : "Add Product"}`}
                onOk={() => {
                    formRef.current.submit();
                }}
                className='my-4 h-[90vh] overflow-y-scroll'
                
            >

                <div>
                    <h1 className='font-medium text-3xl mb-4'>Manage Supplier</h1>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                    >
                        <Form.Item label="Supplier Name" name="supplier_name" rules={rules}>
                            <Input className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="Supplier Name" />
                        </Form.Item>

                        <Row gutter={[16, 16]}>

                            <Col span={8}>
                                <Form.Item label="Mobile No." name="supplier_mobile_no" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Mobile Number" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="Supplier GST" name="supplier_GST" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Supplier GST" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                {/* <Form.Item label="Supplier State" name="supplier_state" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Bank Address" />
                                </Form.Item> */}
                                <Form.Item label="Supplier State" name="supplier_state" rules={rules}>
                                    <select className='w-[15rem] h-[2.5rem] focus:outline-none border border-gray-300 rounded-md px-2'>
                                        <option value=" ">Select</option>
                                        {
                                            states.map((item) => {
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Supplier Address" name="supplier_address" rules={rules}>
                            <TextArea type="text" placeholder="Supplier Address" className="!h-[6.5rem] placeholder-gray-500 " />
                        </Form.Item>





                        {/* Contact Person */}
                        <h1 className="text-3xl mt-8">Contact Person</h1>

                        <Form.Item label="Person Name" name="contact_person" rules={rules}>
                            <Input className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="Person Name" />
                        </Form.Item>
                        <Form.Item label="Email ID" name="person_email" rules={rules}>
                            <Input className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="Email Id" />
                        </Form.Item>

                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Form.Item label="Bank A/C no." name="person_bank_AC_no" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Bank A/C No." />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Bank Name" name="person_bank_name" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Bank Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Bank IFSC" name="person_bank_IFSC" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Bank IFSC" />
                                </Form.Item>
                            </Col>
                        </Row>


                    </Form>


                    {/* <Tabs.TabPane tab="Contact Person Details" key="2">
                            
                        </Tabs.TabPane> */}
                </div>
            </Modal>
        </div>
    )
}

export default ManageSupplierForm
