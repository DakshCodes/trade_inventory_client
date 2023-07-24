import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react'
import { SetLoader } from "../../redux/loadersSlice"

// import { AddSupplier, EditSupplier } from '../../apicalls/supplier'
import { AddMaterial, EditMaterial } from '../../apicalls/rawmaterial'
import { AddMaterialType, EditMaterialType } from '../../apicalls/materialtype'

const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
]
const FinishProductForm = ({ setShowFinishProductForm,  showFinishProductForm, getData,  selectedFinishProduct }) => {
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
        if (selectedFinishProduct) {
            formRef.current.setFieldsValue(selectedFinishProduct)
        }
    }, [selectedFinishProduct])

    const onFinish = async (values) => {
        try {

            dispatch(SetLoader(true));

            let response = null;

            if (selectedFinishProduct) {
                response = await EditMaterialType(selectedFinishProduct._id, values);
            } else {
                response = await AddMaterialType(values);  //we need to specify the response vvariable otherwise it wont work
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowFinishProductForm(false);
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
                open={showFinishProductForm}
                onCancel={() => setShowFinishProductForm(false)}
                width={800}
                centered
                okText={`${selectedFinishProduct ? "Save Changes" : "Add Type"}`}
                onOk={() => {
                    formRef.current.submit();
                }}
                className='my-4'

            >

                <div>
                    <h1 className='font-medium text-3xl mb-4'>Manage Material Type</h1>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Form.Item label="Type Name" name="material_name" rules={rules}>
                                    <Input className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="Type Name" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default FinishProductForm