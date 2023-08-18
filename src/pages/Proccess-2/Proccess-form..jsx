import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react'
import { SetLoader } from "../../redux/loadersSlice"

// import { AddSupplier, EditSupplier } from '../../apicalls/supplier'
import { AddMaterial, EditMaterial } from '../../apicalls/rawmaterial'
import { GetMaterialType } from '../../apicalls/materialtype'
import { AddPProduct, EditPProduct } from '../../apicalls/Proccess'



const P2Form = ({ rawMaterials, setShowP1Form, showP1Form, getData, MaterialTypes, getDataType, selectedProduct }) => {


    const rules = [
        {
            required: true,
            message: "Required",
        }
    ]

    const [Garbage, setGarbage] = useState(0)
    const [MaterialQuantity, setMaterialQuantity] = useState(0)
    const MaterialQuantityhandle = (e) => {
        // console.log(e.target.value);
        setMaterialQuantity(e.target.value);
    }
    const handlegarbage = (e) => {
        // console.log(e.target.value);
        setGarbage(MaterialQuantity - e.target.value);
    }
    const [inputFields, setInputFields] = useState([
        {},
    ])

    const addFields = () => {
        let newfield = {}
        setInputFields([...inputFields, newfield])
    }


    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);



    useEffect(() => {
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct)
        }
    }, [selectedProduct])

    // useEffect(() => {
    //     getDataType();
    // }, [])

    // console.log(MaterialTypes)
    const onFinish = async (values) => {
        try {

            dispatch(SetLoader(true));

            let response = null;

            if (selectedProduct) {
                response = await EditPProduct(selectedProduct._id, values);
            } else {
                response = await AddPProduct(values);  //we need to specify the response vvariable otherwise it wont work
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowP1Form(false);
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
                open={showP1Form}
                onCancel={() => setShowP1Form(false)}
                width={800}
                centered
                okText={`${selectedProduct ? "Save Changes" : "Add Material"}`}
                onOk={() => {
                    formRef.current.submit();
                }}
                className=' !w-[65vw]  h-[60vh] overflow-y-scroll'

            >

                <div>
                    <h1 className='font-medium text-3xl mb-7'>Manage Product To Build</h1>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                    >
                        <div className="mb-3">
                            <Row gutter={[20, 20]}>
                                <Col span={10}>
                                    <Form.Item label="Product Name" name="product_name" rules={rules}>
                                        <Input className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="Product Name" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                        <h1 className='font-medium text-2xl mb-10'>Material In and Out</h1>
                        <Row gutter={[45, 45]} className="!ml-1">
                            {inputFields.map((field, index) => (
                                <Row gutter={[40, 40]} key={index} className="!ml-1">
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
                                    <Form.Item
                                        label="Material Quantity"
                                        name={['materials', index, 'order_quantity']} // Use array notation for field names
                                        rules={rules}
                                        className="!ml-6"
                                    >
                                        <Input
                                            type="number"
                                            className="h-[2.2rem] placeholder-gray-500"
                                            placeholder="0"
                                            onChange={MaterialQuantityhandle}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Finish Product"
                                        name={['materials', index, 'finish_product']} // Use array notation for field names
                                        className="!ml-6 "
                                    >
                                        <Input
                                            type="number"
                                            className="h-[2.2rem] placeholder-gray-500"
                                            placeholder="0"
                                            onChange={handlegarbage}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Garbage of Material"
                                        name={['materials', index, 'garbage_quantity']} // Use array notation for field names
                                        // rules={rules}
                                        className="!ml-6"
                                    >
                                        <Input
                                            value={Garbage}
                                            type="number"
                                            className="h-[2.2rem] placeholder-gray-500"
                                            placeholder={Garbage}
                                            disabled="true"
                                        />
                                    </Form.Item>
                                    <div className='flex justify-center items-center  ml-10'>
                                        <button id="addMore" className='border px-3 py-2 border-teal-400 rounded-xl text-black/60 hover:text-black transition-all duration-300' onClick={() => handleDelete(index)} >Delete</button>
                                    </div>
                                </Row>
                            ))}
                            <div className='flex justify-center items-center  ml-10'>
                                <button id="addMore" onClick={addFields} className='border px-3 py-2 border-teal-400 rounded-xl text-black/60 hover:text-black transition-all duration-300' >Add more fields</button>
                            </div>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default P2Form
