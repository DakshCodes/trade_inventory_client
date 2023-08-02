import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
// import ProductsForms from './ProductsForms';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';

import { GrEdit } from "react-icons/gr"
import { RiDeleteBin4Fill } from "react-icons/ri"
import "../../index.css"
import ManageRawForm from './ManageRawForm';
import { DeleteMaterial, GetMaterial } from '../../apicalls/rawmaterial';
import { GetMaterialType } from '../../apicalls/materialtype';




const ManageRaw = () => {
    const [selectedRawMaterial, setSelectedMaterial] = React.useState(null);
    const [RawMaterial, setRawMaterial] = React.useState([]);
    const [MaterialTypes, setMaterialTypes] = React.useState([]);
    const [showRawForm, setShowRawForm] = React.useState(false);
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
            title: "Material Name",
            dataIndex: "material_name",


        },
        {
            title: "Type",
            dataIndex: "material_type",

        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "GST(%)",
            dataIndex: "material_GST",
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
                                setSelectedMaterial(record);
                                setShowRawForm(true)
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
            const response = await GetMaterial();
            dispatch(SetLoader(false));
            if (response.success) {
                setRawMaterial(response.data);
                console.log(RawMaterial)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };



    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteMaterial(id);
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

    const getDatatype = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetMaterialType();
            dispatch(SetLoader(false));
            if (response.success) {
                console.log(RawMaterial)
                setMaterialTypes(response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };


    useEffect(() => {
        getData();
        // getDatatype();
    }, [])

    return (
        <div>
            <div className="flex  gap-4 justify-between   mb-4">
                <button
                    type='primary'
                    className='bg-sky-500 text-white my-4 px-2 h-[2.3rem] w-[9rem]  border-[1px] border-teal-600 border-solid hover:scale-105 rounded-md hover:transition-all duration-150 hover:bg-sky-400'
                    onClick={() => { setShowRawForm(true) }}
                >Add Raw Material</button>

                <div>
                    Search
                </div>

            </div>
            <Table size='large' className='scroll-bar px-2  w-full overflow-x-scroll rounded-md border-[1px] border-teal-600  h-[380px]' columns={columns} dataSource={RawMaterial} />
            {/* {showProductForm && <ProductsForms getData={getData} showProductForm={showProductForm} selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} />} */}
            {setShowRawForm && <ManageRawForm getDataType={getDatatype} MaterialTypes={MaterialTypes} getData={getData} setShowRawForm={setShowRawForm} showRawForm={showRawForm} selectedRawMaterial={selectedRawMaterial} />}
        </div>
    )
}

export default ManageRaw;
