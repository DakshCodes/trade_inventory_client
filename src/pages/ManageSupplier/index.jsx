import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
// import ProductsForms from './ProductsForms';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import ManageSupplierForm from '../ManageSupplier/ManageSupplierForm';
import { DeleteSupplier, GetSuppliers } from '../../apicalls/supplier';
import { GrEdit } from "react-icons/gr"
import { RiDeleteBin4Fill } from "react-icons/ri"
import "../../index.css"



const ManageSupplier = () => {
    const [selectedSupplier, setSelectedSupplier] = React.useState(null);
    const [suppliers, setSuppliers] = React.useState([]);
    

    const [showSupplierForm, setShowSupplierForm] = React.useState(false);
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
            title: "Supplier Name",
            dataIndex: "supplier_name",


        },
        {
            title: "Supplier GST",
            dataIndex: "supplier_GST",

        },
        {
            title: "Supplier M/No",
            dataIndex: "supplier_mobile_no",
        },
        {
            title: "Supplier Address",
            dataIndex: "supplier_address",
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
                                setSelectedSupplier(record);
                                setShowSupplierForm(true)
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
            const response = await GetSuppliers();
            dispatch(SetLoader(false));
            if (response.success) {
                setSuppliers(response.data);
                console.log(suppliers)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteSupplier(id);
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
                    className='bg-sky-500 text-white my-4 px-2 h-[2.3rem] w-[9rem]  border-[1px] border-teal-600 border-solid hover:scale-105 rounded-md hover:transition-all duration-150 hover:bg-sky-400'
                    onClick={() => { setShowSupplierForm(true) }}
                >Add Supplier</button>

                <div>
                    Search
                </div>

            </div>
            <Table
                size='large' className='scroll-bar px-2  w-full overflow-x-scroll rounded-md border-[1px] border-teal-600  h-[380px]'
                columns={columns} dataSource={suppliers}

            />



            {/* {showProductForm && <ProductsForms getData={getData} showProductForm={showProductForm} selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} />} */}
            {setShowSupplierForm && <ManageSupplierForm getData={getData} setShowSupplierForm={setShowSupplierForm} showSupplierForm={showSupplierForm} selectedSupplier={selectedSupplier} />}
        </div>
    )
}

export default ManageSupplier
