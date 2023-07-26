import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react'
import { SetLoader } from "../../redux/loadersSlice"
import { AddMaterialType, EditMaterialType } from '../../apicalls/materialtype'

const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
]
const ManageMaterialTypeForm = ({ setShowMaterialTypeForm, showMaterialTypeForm, getData, selectedMaterialType }) => {
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
        if (selectedMaterialType) {
            formRef.current.setFieldsValue(selectedMaterialType)
        }
    }, [selectedMaterialType])

    const onFinish = async (values) => {
        try {

            dispatch(SetLoader(true));

            let response = null;

            if (selectedMaterialType) {
                response = await EditMaterialType(selectedMaterialType._id, values);
            } else {
                response = await AddMaterialType(values);  //we need to specify the response vvariable otherwise it wont work
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);

                getData();
                setShowMaterialTypeForm(false);
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
                open={showMaterialTypeForm}
                onCancel={() => setShowMaterialTypeForm(false)}
                width={800}
                centered
                okText={`${selectedMaterialType ? "Save Changes" : "Add Type"}`}
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
                                <Form.Item label="Type Name" name="type_name" rules={rules}>
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

export default ManageMaterialTypeForm
