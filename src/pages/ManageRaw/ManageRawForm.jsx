import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react'
import { SetLoader } from "../../redux/loadersSlice"

// import { AddSupplier, EditSupplier } from '../../apicalls/supplier'
import { AddMaterial, EditMaterial } from '../../apicalls/rawmaterial'
import { GetMaterialType } from '../../apicalls/materialtype'



const ManageRawForm = ({ setShowRawForm, showRawForm, getData,MaterialTypes,getDataType, selectedRawMaterial }) => {
    
  
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
    
        if (selectedRawMaterial) {
            formRef.current.setFieldsValue(selectedRawMaterial)
        }
    }, [selectedRawMaterial])

    useEffect(()=>{
        getDataType();
    },[])

    // console.log(MaterialTypes)
    const onFinish = async (values) => {
        try {

            dispatch(SetLoader(true));

            let response = null;

            if (selectedRawMaterial) {
                response = await EditMaterial(selectedRawMaterial._id, values);
            } else {
                response = await AddMaterial(values);  //we need to specify the response vvariable otherwise it wont work
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowRawForm(false);
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
                open={showRawForm}
                onCancel={() => setShowRawForm(false)}
                width={800}
                centered
                okText={`${selectedRawMaterial ? "Save Changes" : "Add Material"}`}
                onOk={() => {
                    formRef.current.submit();
                }}
                className='my-4'

            >

                <div>
                    <h1 className='font-medium text-3xl mb-4'>Manage Raw Material</h1>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Form.Item label="Material Name" name="material_name" rules={rules}>
                                    <Input className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="Material Name" />
                                </Form.Item>
                            </Col>

                            <Col span={16}>
                                <Form.Item label="Description" name="description" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Description" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>

                            <Col span={8}>
                                <Form.Item label="Type" name="material_type" rules={rules}>
                                    <select className='w-[15rem] h-[2.5rem] focus:outline-none border border-gray-300 rounded-md px-2'>
                                        <option value=" ">Select</option>
                                        {
                                            MaterialTypes.map((item, index) => {
                                                return (
                                                    <option value={item.type_name} key={index}>{item.type_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="GST" name="material_GST" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="G.S.T." />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default ManageRawForm
