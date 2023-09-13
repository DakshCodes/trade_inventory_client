import { Col, Form, Input, Modal, Row, Tabs, message, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react'
import Image from './Image'
import { SetLoader } from "../../redux/loadersSlice"
import { AddFirm, EditFirm } from '../../apicalls/firms'
import { Button } from 'antd'
import { IoMdAdd } from "react-icons/io"
import { UploadFirmImage } from '../../apicalls/firms'


const ManageFirmForm = ({ setShowProductForm, showProductForm, getData, selectedFirm }) => {
    const rules = [
        {
            required: true,
            message: "Required",
        }
    ]

    const [headerImage, setheaderImage] = React.useState('')
    const [FooterImage, setFooterImage] = React.useState('')
    const [file = null, setFile] = React.useState(null);
    const [file2 = null, setFile2] = React.useState(null);
    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);

    useEffect(() => {
        if (selectedFirm) {
            formRef.current.setFieldsValue(selectedFirm)
        }
    }, [selectedFirm])

    const upload = async () => {
        try {
            if (!file) {
                console.log("All fields are required");
                return;
            }
            dispatch(SetLoader(true));
            // uploading image to cloudinary
            // Image upload process
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "trade-inventory");
            data.append("cloud_name", "dwsoscqeu");

            const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dwsoscqeu/image/upload', {
                method: "POST",
                body: data
            });
            if (!uploadResponse.ok) {
                toast.error("Error uploading the image");
                return;
            }

            const uploadData = await uploadResponse.json();
            const imageUrl = uploadData.url;
            setheaderImage(imageUrl)
            dispatch(SetLoader(false));
            message.success("Upload header");

        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message)
        }
    }
    const upload2 = async () => {
        try {
            if (!file2) {
                console.log("All fields are required");
                return;
            }
            dispatch(SetLoader(true));
            // uploading image to cloudinary
            // Image upload process
            const data = new FormData();
            data.append("file", file2);
            data.append("upload_preset", "trade-inventory");
            data.append("cloud_name", "dwsoscqeu");

            const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dwsoscqeu/image/upload', {
                method: "POST",
                body: data
            });
            if (!uploadResponse.ok) {
                toast.error("Error uploading the image");
                return;
            }

            const uploadData = await uploadResponse.json();
            const imageUrl = uploadData.url;
            setFooterImage(imageUrl)
            // const response = await UploadFirmImage(formData);
            dispatch(SetLoader(false));
            message.success("Upload Footer");

        } catch (error) {
            // dispatch(SetLoader(false));
            // message.error(error.message)
        }
    }

    const onFinish = async (values) => {
        console.log(values)
        // values.forEach((firm, index) => {
        //     material.purchase_value = material.order_quantity * material.rate;
        //   });
        values.header_img = headerImage;
        values.footer_img = FooterImage;
        console.log(values)
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
                        <div className=' border border-dashed border-sky-500 p-4 '>

                            <Upload
                                listType='picture'
                                beforeUpload={() => false}
                                onChange={(info) => {
                                    setFile(info.file)
                                }}

                            >
                                <div className='rounded-full p-2 border border-dashed border-sky-500  '>
                                    <IoMdAdd className='text-2xl' />
                                </div>
                            </Upload>
                            <div>
                                Header Image
                            </div>

                            <div className="flex justify-end gap-5 mt-5">
                                <button
                                    className='bg-sky-500 text-white rounded-md hover:bg-sky-400 px-3 py-1 '
                                    disabled={!file}
                                    onClick={upload}
                                >Upload</button>

                            </div>
                        </div>

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

                        <div className=' border border-dashed border-sky-500 p-4 '>
                            <Upload
                                listType='picture'
                                beforeUpload={() => false}
                                onChange={(info) => {
                                    setFile2(info.file)
                                    // setShowPreview(true);
                                }}
                            // fileList={file ? [file] : []}
                            // showUploadList={showPreview}

                            >
                                <div className='rounded-full p-2 border border-dashed border-sky-500  '>
                                    <IoMdAdd className='text-2xl' />
                                </div>
                            </Upload>
                            <div>
                                Footer Image
                            </div>

                            <div className="flex justify-end gap-5 mt-5">
                                <button
                                    className='bg-sky-500 text-white rounded-md hover:bg-sky-400 px-3 py-1 '
                                    disabled={!file2}
                                    onClick={upload2}
                                >Upload</button>

                            </div>
                        </div>
                    </Form>


                    {/* <Tabs.TabPane tab="Contact Person Details" key="2">
                            
                        </Tabs.TabPane> */}
                </div>
            </Modal>
        </div>
    )
}

export default ManageFirmForm
