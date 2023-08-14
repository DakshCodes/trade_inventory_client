import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
// import ProductsForms from './ProductsForms';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import ManageSupplierForm from '../ManageSupplier/ManageSupplierForm';
// import { DeleteSupplier, GetSuppliers } from '../../apicalls/supplier';
import { GrEdit } from "react-icons/gr"
import { RiDeleteBin4Fill } from "react-icons/ri"
import "../../index.css"
// import ManageRawForm from './ManageRawForm';
import { DeleteMaterial, GetMaterial } from '../../apicalls/rawmaterial';
import { Link } from "react-router-dom"
// import PurchaseOrderForm from './PurchaseOrderForm';
import { GetSuppliers } from '../../apicalls/supplier';
import { DeletePurchaseOrder, GetPurchaseOrders } from '../../apicalls/purchases';
import { GetFinishProduct } from '../../apicalls/finishproducts';
import { AiOutlineCheck } from 'react-icons/ai'



const ReceviedOrder = () => {
    // const [selectedReceviedOrder, setSelectedReceviedOrder] = React.useState(null);
    // const [ReceviedOrder, setReceviedOrder] = React.useState([]);

    const [showReceviedForm, setShowReceviedForm] = React.useState(false);
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();


    const [purchaseData, setPurchaseData] = useState([])
    const getPurchase = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetPurchaseOrders();
            dispatch(SetLoader(false));
            if (response.success) {
                setPurchaseData(response.data);
                console.log("purchase : ", response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const filteredData = purchaseData.filter(item =>
        item.balanced_quantity === '0'
    );

    useEffect(() => {
        getPurchase();
    }, [])

    const columns = [
        {
            title: "S.NO",
            align:"center",
            render: (text, record, index) => (
                <div className="py-4 h-[100%] text-center">{index + 1}</div>
            ),
        },
        {
            title: "PO Date",
            align:"center",

            dataIndex: "po_no",
            render: (text, record) => {
                return <Link to={`/purchase-order-preview/${record._id}`}><p className='underline text-blue-500'>{record.po_no}</p></Link>

            }
        },
        {
            title: "Supplier Name",
            align:"center",

            render: (text, record) => {
                return <div>{record.supplier?.supplier_name || record.supplier_name}</div>
            }
        },
        {
            title: "Finish Product Order Quantity",
            dataIndex: "finish_product",
            align :"center",
            render: (text, record) => {

                const totalOrderQuantity = record.finish_product.reduce(
                    (total, item) => total + parseInt(item.finish_order_quantity),
                    0
                );

                return <div className="text-center">{totalOrderQuantity}</div>;
            },
        },
        {
            title: "Net Value",
            dataIndex: "finish_product",
            align:"center",

            render: (text, record) => {

                const totalNetValue = record.finish_product.reduce(
                    (total, item) => total + parseInt(item.finish_purchase_value),
                    0
                );

                return <div className="text-center">{totalNetValue}</div>;
            },
        },
        {
            title: "Recevied Completed",
            align:"center",

            render: () => {
                // Assuming that there's only one item in the finish_product array in this case
                return <AiOutlineCheck className='text-3xl text-white rounded-md text-center bg-green-500 font-semibold' />;
            },
        }

    ]



    return (
        <div>
            <div className="flex  gap-4 justify-between   mb-4">
                <div>
                    Search
                </div>

            </div>
            <Table
                size='large'
                bordered
                className='scroll-bar px-4     w-full overflow-x-scroll rounded-md border-[1px] border-teal-600  h-[380px]'
                columns={columns}
                dataSource={filteredData}  // Use the filtered data
            />
        </div>
    )
}

export default ReceviedOrder;




