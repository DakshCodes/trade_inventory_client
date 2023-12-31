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
import PurchaseOrderForm from './PurchaseOrderForm';
import { GetSuppliers } from '../../apicalls/supplier';
import { DeletePurchaseOrder, GetPurchaseOrders } from '../../apicalls/purchases';
import { GetFinishProduct } from '../../apicalls/finishproducts';



const PurchasedOrder = () => {
    const [selectedPurchasedOrder, setSelectedPurchasedOrder] = React.useState(null);
    const [PurchasedOrder, setPurchasedOrder] = React.useState([]);

    const [showPurchasedForm, setShowPurchasedForm] = React.useState(false);
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
            align :"center",

            render: (text, record) => {
                return <Link to={`/purchase-order-preview/${record._id}`}><p className='underline text-blue-500'>{record.po_no}</p></Link>

            }
        },
        {
            title: "Supplier Name",
            align :"center",

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
            align :"center",

            render: (text, record) => {

                const totalNetValue = record.finish_product.reduce(
                    (total, item) => total + parseInt(item.finish_purchase_value),
                    0
                );

                return <div className="text-center">{totalNetValue}</div>;
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
                                setSelectedPurchasedOrder(record);
                                setShowPurchasedForm(true)
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


    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeletePurchaseOrder(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                await getPurchase();
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

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
            <div className="flex  gap-4 justify-between   mb-4">
                <div>

                    <button
                        type='primary'
                        className='bg-sky-500 text-white my-4 px-2 h-[2.3rem] w-[10rem]  border-[1px] border-teal-600 border-solid hover:scale-105 rounded-md hover:transition-all duration-150 hover:bg-sky-400'
                        onClick={() => { setShowPurchasedForm(true) }}
                    >Add Purchase Order</button>

                    {/* <button
                            type='primary'
                            className='mx-2 bg-sky-500 text-white my-4 px- h-[2.3rem] w-fit  border-[1px] border-teal-600 border-solid hover:scale-105 rounded-md hover:transition-all duration-150 hover:bg-sky-400'
                            onClick={() => { setShowPurchasedForm(true) }}
                        >Preview</button> */}

                </div>
                <div>
                    Search
                </div>

            </div>
            <Table bordered={true} size='large' className='scroll-bar px-2  w-full overflow-x-scroll rounded-md border-[1px] border-teal-600  h-[380px]' columns={columns} dataSource={purchaseData} />
            {/* {showProductForm && <ProductsForms getData={getData} showProductForm={showProductForm} selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} />} */}
            {setShowPurchasedForm && <PurchaseOrderForm rawMaterials={rawMaterials}
                finishedProduct={finishedProduct}
                purchaseData={purchaseData} suppliers={suppliers} getPurchase={getPurchase} setShowPurchasedForm={setShowPurchasedForm} showPurchasedForm={showPurchasedForm} selectedPurchasedOrder={selectedPurchasedOrder} />}
        </div>
    )
}

export default PurchasedOrder;




