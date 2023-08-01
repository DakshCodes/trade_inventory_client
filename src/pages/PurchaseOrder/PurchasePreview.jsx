import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { useReactToPrint } from "react-to-print"
import { SetLoader } from '../../redux/loadersSlice';
import { GetPurchaseOrders } from '../../apicalls/purchases';
import { GetSuppliers } from '../../apicalls/supplier';
import { useDispatch } from 'react-redux';

const PurchasePreview = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Random PDF",
        onAfterPrint: () => alert("Printing Success")
    })

    const params = useParams();
    const url = params.id
    const dispatch = useDispatch();
    function numberToFigure(num) {
        const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        const places = ['', 'thousand', 'million'];

        if (num === 0) {
            return ones[0];
        }

        const toWords = (number) => {
            if (number === 0) {
                return '';
            } else if (number < 10) {
                return ones[number];
            } else if (number < 20) {
                return teens[number - 11];
            } else if (number < 100) {
                const tenDigit = Math.floor(number / 10);
                const oneDigit = number % 10;
                return tens[tenDigit] + (oneDigit !== 0 ? `-${ones[oneDigit]}` : '');
            } else {
                const hundredDigit = Math.floor(number / 100);
                const remainingNumber = number % 100;
                return ones[hundredDigit] + ' hundred' + (remainingNumber !== 0 ? ` and ${toWords(remainingNumber)}` : '');
            }
        };

        const numString = num.toString();
        const numChunks = [];
        for (let i = numString.length; i > 0; i -= 3) {
            numChunks.push(numString.slice(Math.max(i - 3, 0), i));
        }

        let result = '';
        for (let i = 0; i < numChunks.length; i++) {
            const chunkValue = parseInt(numChunks[i], 10);
            if (chunkValue !== 0) {
                result = toWords(chunkValue) + (places[i] ? ' ' + places[i] + ' ' : '') + result;
            }
        }

        return result.trim();
    }

    const [purchaseData, setPurchaseData] = useState([])
    const [suppliers, setSuppliers] = React.useState([]);
    const [totalAmount, setTotalAmount] = React.useState([]);

    const getPurchase = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetPurchaseOrders();
            dispatch(SetLoader(false));
            if (response.success) {
                setPurchaseData(response.data);
                console.log("preview purchase : ", response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const getSuppliers = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetSuppliers();
            dispatch(SetLoader(false));
            if (response.success) {
                console.log("Suppliers : ", response.data)
                setSuppliers(response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };


    useEffect(() => {
        getPurchase();
        getSuppliers();
    }, [])

    console.log("hey : ", purchaseData[3])


    const array = [1,2,3]
    console.table(array)

    return (
        <div>
            <div className='m-4 border border-black w-fit mb-8'>
                <button onClick={handlePrint} className='p-2 w-full h-full'>Download</button>
            </div>
            <div ref={componentRef} className='flex text-center mt-4'>
                <div className='m-auto h-fit w-[95%] border border-solid border-black'>
                    <h1 className='text-4xl p-4'>Minnovation Corp Pvt. Ltd.</h1>
                    {purchaseData.map((item, index) => {
                        if (item._id === url) {

                            return (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-left'>
                                        <div className='border p-2 m-2'>
                                            <h1 className='font-semibold '>PO NO.</h1>
                                            <p>{item.po_no}</p>
                                        </div>
                                        <div className='border p-2 m-2'>
                                            <h1 className='font-semibold '>Order Date</h1>
                                            <p>{item.order_date}</p>
                                        </div>
                                        <div className='border p-2 m-2'>
                                            <h1 className='font-semibold '>Supplier's Refrence NO.</h1>
                                            <p>{item.refrence_no}</p>
                                        </div>

                                    </div>

                                    {/* invoice details */}

                                    <div className='grid grid-cols-2 gap-4 text-left'>
                                        <div className="border p-2 m-2">
                                            <h1 className='font-semibold '>Invoice to</h1>
                                            <p>Minoovation Industries</p>
                                            <p><span className='font-semibold'>Contact us : </span>123456789 </p>
                                            <p><span className='font-semibold'>Email ID: </span>123456789 </p>
                                            <p><span className='font-semibold'>GST NO. </span>123456789 </p>

                                        </div>
                                        <div className="border p-2 m-2">
                                            <h1 className="font-semibold ">Supplier : </h1>
                                            {purchaseData.map((item) => {
                                                if (item._id === url) {
                                                    console.log("Item ID:", item._id);
                                                    console.table("Suppliers Array:", suppliers);

                                                    const selectedSupplier = suppliers.find((supplier) => supplier._id === item.supplier?._id);
                                                    console.log("Selected Supplier:", selectedSupplier);


                                                    if (selectedSupplier) {
                                                        return (
                                                            <div key={selectedSupplier._id}>
                                                                <p>
                                                                    <span className="font-semibold">Supplier Name: </span>{" "}
                                                                    {selectedSupplier.supplier_name}
                                                                </p>
                                                                <p>
                                                                    <span className="font-semibold">Mobile No.: </span>{" "}
                                                                    {selectedSupplier.supplier_mobile_no}
                                                                </p>
                                                                <p>
                                                                    <span className="font-semibold">Address: </span>{" "}
                                                                    {selectedSupplier.supplier_address}
                                                                </p>
                                                                <p>
                                                                    <span className="font-semibold">GST: </span>{" "}
                                                                    {selectedSupplier.supplier_GST}
                                                                </p>
                                                                {/* Add other supplier details as needed */}
                                                            </div>
                                                        );
                                                    } else {
                                                        return <div>Supplier not found</div>;
                                                    }
                                                }
                                            })}
                                        </div>
                                    </div>



                                    {/* Table for Raw materials and its details */}

                                    <table className='table-auto w-[95%] my-4 mx-2'>
                                        <thead className='border'>
                                            <tr>
                                                <th className='border border-black px-4 py-2'>S No.</th>
                                                <th className='border border-black px-4 py-2'>Description of Goods and packaging</th>
                                                <th className='border border-black px-4 py-2'>HSN Code</th>
                                                <th className='border border-black px-4 py-2'>Quantity</th>
                                                <th className='border border-black px-4 py-2'>Rate</th>
                                                <th className='border border-black px-4 py-2'>Amount in INR</th>
                                            </tr>
                                        </thead>

                                        <tbody className='border'>
                                            {item.materials.map((material, index) => (
                                                <tr key={`materials_${index}`}>
                                                    <td className='border border-black p-2'>{index + 1}</td>
                                                    <td className='border border-black p-2'>
                                                        <div>
                                                            <p>{material.particulars}</p>
                                                            <p>{material.description_of_material}</p>
                                                        </div>

                                                    </td>
                                                    <td className='border border-black p-2'>{material.hsn_code}</td>
                                                    <td className='border border-black p-2'>{material.order_quantity}</td>
                                                    <td className='border border-black p-2'>{material.rate}</td>
                                                    <td className='border border-black p-2'>{material.purchase_value}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className='border border-black p-2 font-semibold py-8' colSpan={6}>GST as per GOVT. NORMS</td>
                                            </tr>
                                            <tr>
                                                <td className='border border-black p-2' colSpan={3}>Total</td>
                                                <td className='border border-black p-2' colSpan={1}>
                                                    {item.materials.reduce((totalQuantity, material) => totalQuantity + parseFloat(material.order_quantity), 0)}
                                                </td>
                                                <td className='border border-black p-2' colSpan={2}>
                                                    {item.materials.reduce((totalAmount, material) => totalAmount + parseFloat(material.purchase_value), 0)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className='text-left mx-2'>
                                        <p>Total Value in words : <span className='font-semibold'>{numberToFigure(384).toUpperCase()}</span></p>
                                    </div>

                                    <div className='text-left mx-2'>
                                        <p>
                                            Terms and Conditions
                                            <p>{item.terms_condition}</p>
                                        </p>
                                    </div>
                                </>

                            )
                        }
                    })}
                </div>

                <div>
                    
                </div>
            </div>
        </div >
    )
}

export default PurchasePreview
