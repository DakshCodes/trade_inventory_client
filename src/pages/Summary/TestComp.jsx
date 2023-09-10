import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { message } from 'antd';
import { GetPProduct } from '../../apicalls/Proccess';

const TestComp = () => {
    const [data , setData] = useState([]);

    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetPProduct();
            dispatch(SetLoader(false));
            if (response.success) {
                setData(response.data);
                console.log(response.data[0].stage);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(()=>{
        getData();
    },[]);


    return (
        <div>
            fnjdsfjbsdj
            <div>
                {data.stage.map((stage, index) => (
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
    )
}

export default TestComp
