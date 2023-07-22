import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react'
import Image from './Image'
import { SetLoader } from "../../redux/loadersSlice"
import { AddFirm, EditFirm } from '../../apicalls/firms'


const ManageFirmForm = ({ setShowProductForm, showProductForm, getData, selectedFirm }) => {
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
        if (selectedFirm) {
            formRef.current.setFieldsValue(selectedFirm)
        }
    }, [selectedFirm])

    const onFinish = async (values) => {
        try {

            dispatch(SetLoader(true));

            let response = null;

            if (selectedFirm) {
                response = await EditFirm(selectedFirm._id, values);
            } else {
                response = await AddFirm(values);  //we need to specify the response vvariable otherwise it wont work
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowProductForm(false);
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
                open={showProductForm}
                onCancel={() => setShowProductForm(false)}
                width={800}
                centered
                okText={`${selectedFirm ? "Save Changes" : "Add Product"}`}
                onOk={() => {
                    formRef.current.submit();
                }}
            >

                <div>
                    <h1 className='font-medium text-3xl mb-4'>Add Firm</h1>
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                    >
                        <Form.Item label="Firm Name" name="firm_name" rules={rules}>
                            <Input className="h-[2.5rem] placeholder-gray-500" type="text" placeholder="Firm Name" />
                        </Form.Item>

                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label="Firm Code" name="firm_code" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Firm Code" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Firm Mobile No." name="firm_mobile_no" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Mobile Number" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Firm Address" name="firm_address" rules={rules}>
                            <TextArea type="text" placeholder="Contact Details" className="!h-[6.5rem] placeholder-gray-500 " />
                        </Form.Item>

                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label="Firm Bank A/C Name" name="firm_bank_AC_name" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Bank A/C Name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Firm Bank Address" name="firm_bank_address" rules={rules}>
                                    <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Bank Address" />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Header img */}
                        <Image title={"Header Image"} />

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

                        <Image title={"Footer Image"} />
                    </Form>


                    {/* <Tabs.TabPane tab="Contact Person Details" key="2">
                            
                        </Tabs.TabPane> */}
                </div>
            </Modal>
        </div>
    )
}

export default ManageFirmForm
