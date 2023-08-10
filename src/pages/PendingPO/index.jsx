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
import PendingOrderForm from './PendingOrderForm';



const PendingPO = () => {
    const [selectedPendingOrder, setSelectedPendingOrder] = React.useState(null);
    const [PendingOrder, setPendingOrder] = React.useState([]);

    const [showPendingForm, setshowPendingForm] = React.useState(false);
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const [rawMaterials, setRawMaterials] = useState([])
    const [finishedProduct, setFinishedProduct] = useState([])
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

    const getFinishedProducts = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetFinishProduct();
            dispatch(SetLoader(false));
            if (response.success) {
                setFinishedProduct(response.data)
                // console.log(response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

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
        getPurchase();
        getFinishedProducts();
        getRawMaterials();
    }, [])

    const filteredData = purchaseData.filter(item =>
        item.balanced_quantity != '0'
    );


    const columns = [
        {
            title: "S.NO",
            render: (text, record, index) => (
                <div className="py-4 h-[100%] text-center">{index + 1}</div>
            ),
        },
        {
            title: "PO Date",
            dataIndex: "po_no",
            render: (text, record) => {
                return <Link to={`/purchase-order-preview/${record._id}`}><p className='underline text-blue-500'>{record.po_no}</p></Link>

            }
        },
        {
            title: "Supplier Name",
            render: (text, record) => {
                return <div>{record.supplier?.supplier_name || record.supplier_name}</div>
            }
        },
        {
            title: "Order Quantity",
            dataIndex: "finish_product",
            render: (finishProduct) => {
                // Assuming that there's only one item in the finish_product array in this case
                return finishProduct.length > 0 ? finishProduct[0].finish_order_quantity : "-";
            },
        },
        {
            title: "Balanced Quantity",
            dataIndex: "balanced_quantity",
            // render: (finishProduct) => {
            //     // Assuming that there's only one item in the finish_product array in this case
            //     return finishProduct.length > 0 ? finishProduct[0].finish_order_quantity : "-";
            // },
        },
        {
            title: "Recevied Quantity",
            dataIndex: "recevied_quantity",
            // render: (finishProduct) => {
            //     // Assuming that there's only one item in the finish_product array in this case
            //     return finishProduct.length > 0 ? finishProduct[0].finish_order_quantity : "-";
            // },
        },
        {
            title: "Net Value",
            dataIndex: "finish_product",
            render: (finishProduct) => {
                // Assuming that there's only one item in the finish_product array in this case
                return finishProduct.length > 0 ? finishProduct[0].finish_purchase_value : "-";
            },
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
                                setSelectedPendingOrder(record);
                                setshowPendingForm(true)
                            }}
                        />
                    </div>
                )
            }
        },
    ]

    const [suppliers, setSuppliers] = useState([]);

    const getSupplier = async () => {
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

    useEffect(() => {
        getSupplier();
    }, [])

    return (
        <div>
            <div className="flex justify-end gap-4    mb-4">
                <div>
                    Search
                </div>
            </div>
            <Table
                size='large'
                className='scroll-bar px-4     w-full overflow-x-scroll rounded-md border-[1px] border-teal-600  h-[380px]'
                columns={columns}
                dataSource={filteredData}  // Use the filtered data
            />
            {setshowPendingForm && <PendingOrderForm setshowPendingForm={setshowPendingForm} showPendingForm={showPendingForm} getPurchase={getPurchase} selectedPendingOrder={selectedPendingOrder} />}
        </div>
    )
}

export default PendingPO;




