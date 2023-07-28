import { Col, Form, Input, Modal, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react'
import { SetLoader } from "../../redux/loadersSlice"
import { AddPurchaseOrder, EditPurchaseOrder} from '../../apicalls/purchases'


const PurchaseOrderForm = ({rawMaterials,finishedProduct,getPurchase, suppliers, setShowPurchasedForm, showPurchasedForm, selectedPurchasedOrder }) => {
    const rules = [
        {
            required: true,
            message: "Required",
        }
    ]

    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);


    const [inputFields, setInputFields] = useState([
        {}
    ])

    const addFields = () => {
        let newfield = {}

        setInputFields([...inputFields, newfield])
    }

    useEffect(() => {
        if (selectedPurchasedOrder) {
            formRef.current.setFieldsValue(selectedPurchasedOrder)
        }
    }, [selectedPurchasedOrder])



    const onFinish = async (values) => {
        console.log(values)
        try {

            dispatch(SetLoader(true));

            let response = null;

            if (selectedPurchasedOrder) {
                response = await EditPurchaseOrder(selectedPurchasedOrder._id, values);
            } else {
                response = await AddPurchaseOrder(values);  //we need to specify the response vvariable otherwise it wont work
            }
            
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getPurchase();
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
                okText={`${selectedPurchasedOrder ? "Save Changes" : "Add Purchase Order"}`}
                onOk={() => {
                    formRef.current.submit();
                }}

                className='my-4 !w-[80vw]  h-[90vh] overflow-y-scroll'

            >

                <div>
                    <h1 className='font-medium text-3xl mb-4'>Purchase Order Manage</h1>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                    >
                        <Form.Item label="Purchase order NO" name="po_no" >
                            <Input disabled={true} className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="" />
                        </Form.Item>

                        <Row gutter={[16, 16]}>

                            <Col span={12}>
                                <Form.Item label="Order Date" name="order_date" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Order Date" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="Supplier Name" name="supplier_name" rules={rules}>
                                    <select className='w-[100%] border border-gray-300 p-2 px-2 rounded-md'>
                                        <option value=" ">Select</option>
                                        {
                                            suppliers.map((item) => {
                                                return (
                                                    <option value={item.supplier_name}>{item.supplier_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label="Refrence No." name="refrence_no" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Reference NO" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Delivery At" name="deliveryat" rules={rules}>
                                    <select className='w-[100%] border border-gray-300 p-2 px-2 rounded-md'>
                                        <option value="">select</option>
                                        <option value="test">Test</option>
                                    </select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Terms and Conditions" name="terms_condition" rules={rules}>
                            <TextArea type="text" placeholder="Terms and Conditions" className="!h-[6.5rem] placeholder-gray-500 " />
                        </Form.Item>

                        <h1 className='font-medium text-2xl mb-4'>Material Details</h1>
                        {inputFields.map((field, index) => (
                            <Row gutter={[25, 25]} key={index}>
                                <Col span={3}>
                                    <Form.Item
                                        label="Particulars"
                                        name={['materials', index, 'particulars']} // Use array notation for field names
                                        rules={rules}
                                    >
                                        <select>
                                            <option value="">Select-Material</option>
                                            {
                                                rawMaterials.map((item) => (
                                                    <option value={item.material_name}>{item.material_name}</option>
                                                ))
                                            }
                                        </select>
                                    </Form.Item>
                                </Col>
                                {/* Render other input fields in a similar manner */}
                                <Col span={6}>
                                    <Form.Item
                                        label="Description of Material"
                                        name={['materials', index, 'description_of_material']} // Use array notation for field names
                                        rules={rules}
                                    >
                                        <TextArea
                                            type="text"
                                            placeholder=""
                                            className="!h-[2.7rem]  placeholder-gray-500 "
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={4}>
                                    <Form.Item
                                        label="Order Quantity"
                                        name={['materials', index, 'order_quantity']} // Use array notation for field names
                                        rules={rules}
                                    >
                                        <Input
                                            type="text"
                                            className="h-[2.5rem] placeholder-gray-500"
                                            placeholder="0"
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={4}>
                                    <Form.Item
                                        label="Rate"
                                        name={['materials', index, 'rate']} // Use array notation for field names
                                        rules={rules}
                                    >
                                        <Input
                                            type="text"
                                            className="h-[2.5rem] placeholder-gray-500"
                                            placeholder="0"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        label="Purchase Value"
                                        name={['materials', index, 'purchase_value']} // Use array notation for field names
                                        rules={rules}
                                    >
                                        <Input
                                            type="text"
                                            className="h-[2.5rem] placeholder-gray-500"
                                            placeholder="0"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        ))}




                        <div className='flex justify-center items-center'>
                            <button id="addMore" onClick={addFields} className='border px-3 py-2 border-teal-400 rounded-xl text-black/60 hover:text-black transition-all duration-300' >Add more fields</button>
                        </div>
                        {/* </div> */}
                        <h1 className='font-medium text-2xl mb-4'>Finish Product</h1>
                        <div id="fieldList">
                            {/* <h1 className='font-medium text-sm mb-4'>Particulars</h1> */}
                            {inputFields.map((field, index) => (
                                <Row gutter={[25, 25]} key={index}>
                                    <Col span={3}>
                                        <Form.Item
                                            label="Particulars"
                                            name={['finish_product', index, 'finish_particulars']} // Use array notation for field names
                                            rules={rules}
                                        >
                                            <select>
                                                <option value="">Select-Material</option>
                                                {
                                                    finishedProduct.map((item) => (
                                                        <option value={item.product_name}>{item.product_name}</option>
                                                    ))
                                                }

                                            </select>
                                        </Form.Item>
                                    </Col>
                                    {/* Render other input fields in a similar manner */}
                                    <Col span={6}>
                                        <Form.Item
                                            label="Description of Material"
                                            name={['finish_product', index, 'finish_description_of_material']} // Use array notation for field names
                                            rules={rules}
                                        >
                                            <TextArea
                                                type="text"
                                                placeholder=""
                                                className="!h-[2.7rem]  placeholder-gray-500 "
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={4}>
                                        <Form.Item
                                            label="Order Quantity"
                                            name={['finish_product', index, 'finish_order_quantity']} // Use array notation for field names
                                            rules={rules}
                                        >
                                            <Input
                                                type="text"
                                                className="h-[2.5rem] placeholder-gray-500"
                                                placeholder="0"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={4}>
                                        <Form.Item
                                            label="Rate"
                                            name={['finish_product', index, 'finish_rate']} // Use array notation for field names
                                            rules={rules}
                                        >
                                            <Input
                                                type="text"
                                                className="h-[2.5rem] placeholder-gray-500"
                                                placeholder="0"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            label="Purchase Value"
                                            name={['finish_product', index, 'finish_purchase_value']} // Use array notation for field names
                                            rules={rules}
                                        >
                                            <Input
                                                type="text"
                                                className="h-[2.5rem] placeholder-gray-500"
                                                placeholder="0"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ))}
                            <div className='flex justify-center items-center'>
                                <button id="addMore" onClick={addFields} className='border px-3 py-2 border-teal-400 rounded-xl text-black/60 hover:text-black transition-all duration-300' >Add more fields</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div >
    )
}


export default PurchaseOrderForm