import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
// import ProductsForms from './ProductsForms';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';

import { GrEdit } from "react-icons/gr"
import { RiDeleteBin4Fill } from "react-icons/ri"
import "../../index.css"
// import ManageRawForm from './ManageRawForm';
import { DeleteMaterial, GetMaterial } from '../../apicalls/rawmaterial';
import { GetMaterialType } from '../../apicalls/materialtype';
import { DeletePProduct, GetPProduct, NextStageIncr } from '../../apicalls/Proccess';
// import P2Form from './Proccess-1-form.';
import P3Form from './Proccess-form.';




const Proccess3 = () => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [selectedProcessID, setSelectedProcessID] = React.useState(null);
    const [p2Products, setp2Products] = React.useState([]);
    const [rawMaterials, setRawMaterials] = React.useState([])
    const [MaterialTypes, setMaterialTypes] = React.useState([]);
    const [showP2Form, setShowP2Form] = React.useState(false);
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const columns = [
        {
            title: "S.NO",
            render: (text, record, index) => (
                <div className="py-4 h-[100%] text-center">{index + 1}</div>
            )

        },
        {
            title: "Product Name",
            render: (text, record) => {
                return (
                    <div className='flex gap-5 text-lg'>
                        <span >{record?.stage[0]?.product_name || record?.stage[1]?.product_name}</span>
                    </div>
                )
            }


        },

        {
            title: "Action",
            dataIndex: "action",
            // align : "center",
            render: (text, record) => {
                return (
                    <div className='flex gap-5 text-lg'>
                        <button title='send to next process' onClick={() => handleNextProcess(record._id)} className='border hover:transition-all hover:duration-300 text-sm border-green-800 py-2 px-4 rounded-md hover:bg-green-300 hover:text-green-800'>Send to next process</button>
                    </div>
                )
            }
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className='flex gap-5 text-lg'>
                        <GrEdit
                            className='ri-pencil-line cursor-pointer'
                            onClick={() => {
                                setSelectedProduct(record);
                                setShowP2Form(true)
                            }}
                        />
                        <RiDeleteBin4Fill
                            className='ri-delete-bin-line cursor-pointer hover:text-red-500'
                            onClick={() => {
                                deleteProduct(record._id);
                            }}
                        />

                    </div>
                )
            }
        },
        
    ]

    const handleNextProcess = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await NextStageIncr(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message)
                getData();
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetPProduct();
            dispatch(SetLoader(false));
            if (response.success) {
                let products = response.data.filter((data) => {
                    return data.nextStageValues === 3;
                })
                setp2Products(products);
                console.log("cool : ", products)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    console.log(selectedProduct)

    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeletePProduct(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const getRawMaterials = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetMaterial();

            dispatch(SetLoader(false));
            if (response.success) {
                setRawMaterials(response.data)
                // console.log(response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
        getRawMaterials();
        // getDatatype();
    }, [])

    return (
        <div>
            <div className="flex  gap-4 justify-between   mb-4">
                {/* <button
                    type='primary'
                    className='bg-sky-500 text-white my-4 px-2 h-[2.3rem] w-[9rem]  border-[1px] border-teal-600 border-solid hover:scale-105 rounded-md hover:transition-all duration-150 hover:bg-sky-400'
                    onClick={() => { setShowP2Form(true) }}
                >Add Product</button> */}
                <div>
                    Search
                </div>

            </div>
            <Table size='large' className='scroll-bar px-2  w-full overflow-x-scroll rounded-md border-[1px] border-teal-600  h-[380px]' columns={columns} dataSource={p2Products} />
            {/* {showProductForm && <ProductsForms getData={getData} showProductForm={showProductForm} selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} />} */}
            {setShowP2Form && <P3Form rawMaterials={rawMaterials} selectedProcessID={selectedProcessID} MaterialTypes={MaterialTypes} getData={getData} setShowP2Form={setShowP2Form} showP2Form={showP2Form} selectedProduct={selectedProduct} />}
        </div>
    )
}

export default Proccess3;
