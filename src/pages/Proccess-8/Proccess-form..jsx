import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react'
import { SetLoader } from "../../redux/loadersSlice"

// import { AddSupplier, EditSupplier } from '../../apicalls/supplier'
import { AddMaterial, EditMaterial } from '../../apicalls/rawmaterial'
import { GetMaterialType } from '../../apicalls/materialtype'
import { AddPProduct, EditPProduct, EditPProduct2, EditProductOnceInitialised } from '../../apicalls/Proccess'



const P8Form = ({ rawMaterials, setShowP2Form, showP2Form, getData, selectedProcessID, MaterialTypes, getDataType, selectedProduct }) => {


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

    const addFields = (event) => {
        event.preventDefault();
        const newField = {
            particulars: "",
            applied_product_quantity: 0,
            received_product_quantity: 0,
            garbage_quantity: 0,
        };
        setInputFields([...inputFields, newField]);
    };

    const handleDelete = (indexToDelete) => {
        const updatedArray = inputFields.filter((item, index) => index !== indexToDelete);
        const updatedValuesArray = arrayfieldValues.materials.filter((item, index) => index !== indexToDelete);

        setInputFields(updatedArray);
        setArrayFieldValues({
            materials: updatedValuesArray,
        });
    };

    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);

    const [arrayfieldValues, setArrayFieldValues] = useState({
        materials: inputFields.map(() => ({
            particulars: "",
            applied_product_quantity: 0,
            received_product_quantity: 0,
            garbage_quantity: 0, // Initialize with default value
        })),
    })

    const handleValuesChange = (changedValues, allValues) => {
        const updatedFields = allValues.materials.map((field, index) => {
            const appliedQuantity = field.applied_product_quantity || 0;
            const receivedQuantity = field.received_product_quantity || 0;
            const garbageQuantity = appliedQuantity - receivedQuantity;
            console.log(garbageQuantity)

            return {
                ...field,
                garbage_quantity: garbageQuantity,
            };
        });

        setArrayFieldValues({
            materials: updatedFields,
        });
    };

    useEffect(() => {
        if (selectedProduct) {
            console.log(selectedProduct)
            if (!selectedProduct.stage[7]) {
                selectedProduct.stage.forEach((stage, index) => {
                    stage.materials.forEach((material, index) => {
                        material.applied_product_quantity = material.received_product_quantity;
                    })
                });
            }

            formRef?.current?.setFieldsValue(selectedProduct.stage[7] || selectedProduct.stage[6])
        }
    }, [selectedProduct])

    // useEffect(() => {
    //     getDataType();
    // }, [])
    // console.log(MaterialTypes)
    const onFinish = async (values) => {


        values.materials.forEach(material => {
            const appliedQuantity = material.applied_product_quantity || 0;
            const receivedQuantity = material.received_product_quantity || 0;
            material.garbage_quantity = appliedQuantity - receivedQuantity;
        });

        console.log(values)


        try {

            dispatch(SetLoader(true));

            let response = null;
            console.log("id :" + selectedProduct._id)


            if (selectedProduct.stage[7]) {
                response = await EditProductOnceInitialised(selectedProduct._id, values, 7);
            }
            else {
                // this is for editing the product details of next element(if exists) 
                response = await EditPProduct2(selectedProduct._id, values);
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowP2Form(false);
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
                open={showP2Form}
                onCancel={() => setShowP2Form(false)}
                width={1000}
                centered
                okText={`${selectedProduct ? "Save Changes" : "Add Material"}`}
                onOk={() => {
                    formRef.current.submit();
                }}
                className=' h-[60vh] overflow-y-scroll'

            >

                <div>
                    <h1 className='font-medium text-3xl mb-7'>Manage Product To Build</h1>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                        onValuesChange={(changedValues, allValues) => handleValuesChange(changedValues, allValues)}
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
                                        name={['materials', index, 'applied_product_quantity']} // Use array notation for field names
                                        rules={rules}
                                        className="!ml-6"
                                    >
                                        <Input
                                            type="number"
                                            className="h-[2.2rem] placeholder-gray-500"
                                            placeholder="0"
                                        // onChange={MaterialQuantityhandle}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Finish Product"
                                        name={['materials', index, 'received_product_quantity']} // Use array notation for field names
                                        className="!ml-6 "
                                    >
                                        <Input
                                            type="number"
                                            className="h-[2.2rem] placeholder-gray-500"
                                            placeholder="0"
                                        // onChange={handlegarbage}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Garbage of Material"
                                        name={['materials', index, 'garbage_quantity']} // Use array notation for field names
                                        // rules={rules}
                                        className="!ml-6"
                                    >
                                        <Input
                                            type="number"
                                            className="h-[2.2rem] placeholder-gray-500"
                                            value={arrayfieldValues.materials[index]?.garbage_quantity}
                                            placeholder={arrayfieldValues.materials[index]?.garbage_quantity}
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

export default P8Form
