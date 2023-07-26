import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'

import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';

import { DeleteSupplier, GetSuppliers } from '../../apicalls/supplier';
import { GrEdit } from "react-icons/gr"
import { RiDeleteBin4Fill } from "react-icons/Ri"
import "../../index.css"

import ManageMaterialTypeForm from './ManageMaterialTypeForm';
import { DeleteMaterialType, GetMaterialType } from '../../apicalls/materialtype';



const MaterialType = () => {
    const [selectedMaterialType, setSelectedMaterialType] = React.useState(null);
    const [MaterialType, setMaterialType] = React.useState([]);

    const [showMaterialTypeForm, setShowMaterialTypeForm] = React.useState(false);
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
            title: "Material Type",
            dataIndex: "type_name",

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
                                setSelectedMaterialType(record);
                                setShowMaterialTypeForm(true)
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


    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetMaterialType();
            dispatch(SetLoader(false));
            if (response.success) {
                setMaterialType(response.data);
                
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteMaterialType(id);
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


    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className="flex  gap-4 justify-between   mb-4">
                <button
                    type='primary'
                    className='bg-sky-500 text-white my-4 px-2 h-[2.3rem] w-[10rem]  border-[1px] border-teal-600 border-solid hover:scale-105 rounded-md hover:transition-all duration-150 hover:bg-sky-400'
                    onClick={() => { setShowMaterialTypeForm(true) }}
                >Add Material Type</button>

                <div>
                    Search
                </div>

            </div>
            <Table size='large' className='scroll-bar px-2  w-full overflow-x-scroll rounded-md border-[1px] border-teal-600  h-[380px]' columns={columns} dataSource={MaterialType} />
            {/* {showProductForm && <ProductsForms getData={getData} showProductForm={showProductForm} selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} />} */}
            {setShowMaterialTypeForm && <ManageMaterialTypeForm getData={getData} setShowMaterialTypeForm={setShowMaterialTypeForm} showMaterialTypeForm={showMaterialTypeForm} selectedMaterialType={selectedMaterialType} />}
        </div>
    )
}

export default MaterialType;
