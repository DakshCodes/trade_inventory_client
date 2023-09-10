import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { SetLoader } from '../../redux/loadersSlice';
import { GetPProductID } from '../../apicalls/Proccess';
import { message } from 'antd';
import moment from 'moment';

const SummaryPreview = () => {
    const params = useParams();
    const url = params.id;
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const calculateTotals = () => {
        const materialTotals = {};

        data?.stage?.forEach((process, index) => {
            process.materials.forEach((material) => {
                const materialName = material.particulars;

                const inwardQuantity = index === 0 ? parseInt(material.applied_product_quantity) : 0;
                const receivedQuantity = index === data.stage.length - 1 ? parseInt(material.received_product_quantity) : 0;
                const garbageQuantity = parseInt(material.garbage_quantity);

                if (!materialTotals[materialName]) {
                    materialTotals[materialName] = {
                        inward: 0,
                        received: 0,
                        garbage: 0,
                    };
                }

                materialTotals[materialName].inward += inwardQuantity;
                materialTotals[materialName].received = receivedQuantity; // Overwrite for the last process
                materialTotals[materialName].garbage += garbageQuantity;
            });
        });

        return materialTotals;
    };


    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetPProductID(url);
            dispatch(SetLoader(false));
            if (response.success) {
                setData(response?.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const materialTotals = calculateTotals();

    return (
        <div>
            <div className="border p-2 bg-blue-500 text-white font-semibold text-center">
                Process Preview
            </div>
            <div className="border p-4 mx-4 my-4 h-fit">
                <div className="border flex md:flex-row flex-col items-center justify-between mb-4 h-fit">
                    <span className="">Product ID : {data._id}</span>
                    <span className="">
                        Created On : {moment(data.createdAt).format('DD-MM-YYYY hh:mm A')}
                    </span>
                </div>

                <span className="my-4 text-2xl font-medium">Details</span>

                {/* Table Starts */}
                <div className="overflow-scroll">
                    <table className="font-normal border table-auto w-full">
                        <thead>
                            <tr>
                                <th className="border border-black h-16 px-4 py-2">Processes Sequence</th>
                                <th className="border border-black h-16 px-4 py-2">Particulars</th>
                                <th className="border border-black h-16 px-4 py-2">Inward Quantity(gram)</th>
                                <th className="border border-black h-16 px-4 py-2">Finish Product Quantity (gram)</th>
                                <th className="border border-black h-16 px-4 py-2">Garbage Generated (gram)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.stage?.map((element, elementIndex) =>
                                element.materials.map((item, index) => (
                                    <tr key={index}>
                                        {index === 0 && (
                                            <td
                                                rowSpan={element.materials.length}
                                                className="border border-black px-4 py-2 text-center"
                                            >
                                                {elementIndex + 1}
                                            </td>
                                        )}
                                        <td className="border border-black px-4 py-2 text-center">
                                            {item.particulars}
                                        </td>
                                        <td className="border border-black px-4 py-2 text-center">
                                            {item.applied_product_quantity}
                                        </td>
                                        <td className="border border-black px-4 py-2 text-center">
                                            {item.received_product_quantity}
                                        </td>
                                        <td className="border border-black px-4 py-2 text-center">
                                            {item.garbage_quantity}
                                        </td>
                                    </tr>
                                ))
                            )}


                            <tr>
                                <td colSpan={5} className="border h-[6rem] border-black px-4 py-2 text-center">
                                    Total (in grams)
                                </td>
                            </tr>


                            <tr>
                                <td colSpan={2} className="border border-black px-4 py-2 text-center">
                                    Materials Used in processes
                                </td>
                                <td colSpan={1} className="border border-black px-4 py-2 text-center">
                                    Total raw material applied (in grams)
                                </td>
                                <td colSpan={1} className="border border-black px-4 py-2 text-center">
                                    Total finish product Generated (in grams)
                                </td>
                                <td colSpan={5} className="border border-black px-4 py-2 text-center">
                                    Total Garbage Generated(in grams)
                                </td>
                            </tr>
                            {
                                Object.keys(materialTotals).map((materialName, index) => (
                                    <tr key={index}>
                                        <td colSpan={2} className="border border-black px-4 py-2 text-center">
                                            {materialName}
                                        </td>
                                        <td className="border border-black px-4 py-2 text-center">
                                            {materialTotals[materialName].inward}
                                        </td>
                                        <td className="border border-black px-4 py-2 text-center">
                                            {materialTotals[materialName].received}
                                        </td>
                                        <td className="border border-black px-4 py-2 text-center">
                                            {materialTotals[materialName].garbage}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SummaryPreview;
