import { Col, Form, Input, Modal, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react'
import { SetLoader } from "../../redux/loadersSlice"
import { AddPurchaseOrder, EditPurchaseOrder } from '../../apicalls/purchases'


const PendingOrderForm = ({ setshowPendingForm, showPendingForm, selectedPendingOrder }) => {
    const rules = [
        {
            required: true,
            message: "Required",
        }
    ]
    let min = 10000000000000;
    let max = 99999999999999;

    console.log(showPendingForm)
    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const [po_no, setPo_no] = useState(Math.round(Math.random() * (max - min) + min))

    useEffect(() => {
        if (selectedPendingOrder) {
            formRef.current.setFieldsValue(selectedPendingOrder)
        }
        console.log({ selectedPurchasedOrder: selectedPendingOrder })


    }, [selectedPendingOrder])

    const onchangepo = () => {
        setPo_no(Math.round(Math.random() * (max - min) + min))
    }

    // const handleValueMaterial = (e) => {
    //     // console.log(e.target.value);
    //     setMaterialPV(e.target.value);
    // }
    // console.log(MaterialPV);
    // const handleValueMaterial2 = (e) => {
    //     // console.log(e.target.value);
    //     setMaterialPV((MaterialPV * e.target.value));
    // }
    // console.log(MaterialPV);
    // const handleValueFinish = (e) => {
    //     // console.log(e.target.value);
    //     setFinishPV(e.target.value);
    // }
    // console.log(FinishPV);
    // const handleValueFinish2 = (e) => {
    //     // console.log(e.target.value);
    //     setFinishPV((FinishPV * e.target.value));
    // }
    // console.log(FinishPV);

    // const handleValueMaterial2 = (e) => {
    //     setMaterialPV(...MaterialPV, e.target.value * MaterialPV);
    //     console.log(MaterialPV);
    // }

    const onFinish = async (values) => {
        // Update the materials and finish products in the form data
        values.materials.forEach((material, index) => {
            material.purchase_value = material.order_quantity * material.rate;
        });
        values.finish_product.forEach((finishProduct, index) => {
            finishProduct.finish_purchase_value = finishProduct.finish_order_quantity * finishProduct.finish_rate;
        });

        // Get the selected supplier ID from the dropdown
        const selectedSupplierId = values.supplier_name;

        // Add the supplier ID to the request body
        values.supplier = selectedSupplierId;

        try {
            dispatch(SetLoader(true));

            let response = null;

            if (selectedPendingOrder) {
                response = await EditPurchaseOrder(selectedPendingOrder._id, values);
            } else {
                response = await AddPurchaseOrder(values);
            }

            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getPurchase();
                setShowPurchasedForm(false);
                formRef.current.resetFields();
            } else {
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
                open={showPendingForm}
                onCancel={() => setshowPendingForm(false)}
                width={800}
                centered
                okText={`${selectedPendingOrder ? "Save Changes" : "Add Purchase Order"}`}
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
                        <Row  gutter={[20, 20]}>
                        <Form.Item span={4} label="Purchase order NO" initialValue={po_no} name="po_no" >
                            <Input disabled={true} className="h-[2.5rem] placeholder-gray-500" type="text" placeholder={po_no} />
                        </Form.Item>
                        <Col span={5}>
                            <Form.Item label="Order Date" name="order_date" rules={rules}>
                                <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Order Date" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Balanced Quantity" name="balanced_quantity" rules={rules}>
                                <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Balanced Quantity" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Recevied Quantity" name="recevied_quantity" rules={rules}>
                                <Input type="text" className="h-[2.5rem] placeholder-gray-500" placeholder="Order Date" />
                            </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </div >
    )
}


export default PendingOrderForm