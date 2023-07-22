import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
// import ProductsForms from './ProductsForms';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import ManageFirmForm from './ManageFirmForm';
import { DeleteFirm, GetFirms } from '../../apicalls/firms';
import { GrEdit } from "react-icons/gr"
import { RiDeleteBin4Fill } from "react-icons/Ri"
// import { DeleteProduct, GetProducts } from '../../../apicalls/products';





const ManageFirm = () => {
    const [selectedFirm, setSelectedFirm] = React.useState(null);
    const [firms, setFirms] = React.useState([]);

    const [showProductForm, setShowProductForm] = React.useState(false);
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const columns = [
        {
            title: "Firm Name",
            dataIndex: "firm_name",
        },
        {
            title: "Firm Code",
            dataIndex: "firm_code",
        },
        {
            title: "Firm M/No",
            dataIndex: "firm_mobile_no",
        },
        {
            title: "Firm Address",
            dataIndex: "firm_address",
        },
        {
            title: "Contact Person",
            dataIndex: "contact_person",
        },
        {
            title: "Email Id",
            dataIndex: "person_email",
        },

        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
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
                                setSelectedFirm(record);
                                setShowProductForm(true)
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
            const response = await GetFirms();
            dispatch(SetLoader(false));
            if (response.success) {
                setFirms(response.data);
                console.log(firms)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteFirm(id);
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
            <div className="flex gap-4 justify-end mb-4">

                <div className='flex p-2  border border-solid items-center justify-center cursor-pointer'
                    onClick={() => { window.location.reload(); }}
                >
                    Reload
                </div>
                <button
                    type='primary'
                    className='bg-sky-500 text-white px-2 rounded-md hover:transition-all duration-150 hover:bg-sky-400'
                    onClick={() => { setShowProductForm(true) }}
                >Add Firm {showProductForm}</button>
            </div>

            <Table size='middle' className='overflow-x-scroll rounded-md border border-solid border-gray-400' columns={columns} dataSource={firms} />


            {/* {showProductForm && <ProductsForms getData={getData} showProductForm={showProductForm} selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} />} */}
            {showProductForm && <ManageFirmForm getData={getData} setShowProductForm={setShowProductForm} showProductForm={showProductForm} selectedFirm={selectedFirm} />}
        </div>
    )
}

export default ManageFirm
