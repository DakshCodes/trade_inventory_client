import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react'
import { SetLoader } from "../../redux/loadersSlice"

import { AddSupplier, EditSupplier } from '../../apicalls/supplier'


const PurchaseOrderForm = ({ setShowPurchasedForm, showPurchasedForm, getData, selectedPurchasedOrder }) => {
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
        if (selectedPurchasedOrder) {
            formRef.current.setFieldsValue(selectedPurchasedOrder)
        }
    }, [selectedPurchasedOrder])

    const onFinish = async (values) => {
        try {

            dispatch(SetLoader(true));

            let response = null;

            if (selectedPurchasedOrder) {
                response = await EditSupplier(selectedPurchasedOrder._id, values);
            } else {
                response = await AddSupplier(values);  //we need to specify the response vvariable otherwise it wont work
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowPurchasedForm(false);
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
                open={showPurchasedForm}
                onCancel={() => setShowPurchasedForm(false)}
                width={800}
                centered
                okText={`${selectedPurchasedOrder ? "Save Changes" : "Add Product"}`}
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
                        <Form.Item label="Purchase order NO" name="supplier_name" rules={rules}>
                            <Input className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="Supplier Name" />
                        </Form.Item>

                        <Row gutter={[16, 16]}>

                            <Col span={12}>
                                <Form.Item label="Order Date" name="supplier_mobile_no" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Order Date" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="Supplier Name" name="supplier_GST" rules={rules}>
                                    <select>
                                        <option value="">Input</option>
                                    </select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label="Refrence No." name="supplier_GST" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Reference NO" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Supplier Name" name="supplier_GST" rules={rules}>
                                    <select>
                                        <option value="">Input</option>
                                    </select>
                                </Form.Item>
                            </Col>



                        </Row>

                        <Form.Item label="Terms and Conditions" name="supplier_address" rules={rules}>
                            <TextArea type="text" placeholder="Terms and Conditions" className="!h-[6.5rem] placeholder-gray-500 " />
                        </Form.Item>



                    </Form>


                    {/* <Tabs.TabPane tab="Contact Person Details" key="2">
                            
                        </Tabs.TabPane> */}
                </div>
            </Modal>
        </div>
    )
}

export default PurchaseOrderForm