import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react'
import { SetLoader } from "../../redux/loadersSlice"
import { GetPProduct } from '../../apicalls/Proccess'

// import { AddSupplier, EditSupplier } from '../../apicalls/supplier'
// import { AddMaterial, EditMaterial } from '../../apicalls/rawmaterial'
// import { GetMaterialType } from '../../apicalls/materialtype'
// import { AddPProduct, EditPProduct, EditPProduct2 } from '../../apicalls/Proccess'



const Forms = ({ setShowForm, showForm, selectedProduct }) => {


    const rules = [
        {
            required: true,
            message: "Required",
        }
    ]

    const [data , setData] = useState([]);
    const respIndex = selectedProduct - 1;
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetPProduct();
            dispatch(SetLoader(false));
            if (response.success) {
                setData(response.data);
                console.log("getdata : ",response.data[respIndex].stage);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(()=>{
        getData();
    },[]);
    console.log(selectedProduct)


    return (
        <div>
            <Modal
                open={showForm}
                onCancel={() => setShowForm(false)}
                width={1300}
                centered
                onOk={() => {
                    setShowForm(false)
                }}
                className=' h-[60vh] overflow-y-scroll'

            >

                <div>
                    fnjdsfjbsdj
                    <div>
                        {data?.stage?.map((stage, index) => (
                            <div key={index}>
                                <h2>Product Name: {stage.product_name}</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Particulars</th>
                                            <th>Applied Quantity</th>
                                            <th>Received Quantity</th>
                                            <th>Garbage Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stage.materials.map((material, materialIndex) => (
                                            <tr key={materialIndex}>
                                                <td>{material.particulars}</td>
                                                <td>{material.applied_product_quantity}</td>
                                                <td>{material.received_product_quantity}</td>
                                                <td>{material.garbage_quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Forms
