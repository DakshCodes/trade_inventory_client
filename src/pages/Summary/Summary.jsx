import React, { useEffect, useState } from 'react'
import Forms from './Form';
import './Summary.css'
import { Table, message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { GetPProduct } from '../../apicalls/Proccess';
import moment from 'moment';



const Summary = () => {
    const [showForm, setShowForm] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const setfunction = (id)=>{
        setShowForm(!showForm)
        setSelectedProduct(id);
    }

    const [data , setData] = useState([]);

    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetPProduct();
            dispatch(SetLoader(false));
            if (response.success) {
                setData(response.data);
                console.log(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    useEffect(()=>{
        getData();
    },[]);

    const heading = [
        {
            title : "Name",
            dataIndex : "Name",
            render: (text, record) => {
                return (
                    <div className='flex gap-5 text-lg'>
                        <Link to={`/process-summary/${record._id}`}><span className='underline' >{record?.stage[0]?.product_name || record?.stage[1]?.product_name}</span></Link>
                    </div>
                )
            }
        },
        {
            title : "Created At",
            dataIndex : "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
        },

    ]
    // const data = [
    //     {
    //         "_id":"1",
    //         "Name": "Daksh",
    //         "Wins": "10",
    //         "Draw": "0",
    //         "Losses": "0",
    //     },
    //     {
    //         "_id":"2",
    //         "Name": "Aman",
    //         "Wins": "10",
    //         "Draw": "0",
    //         "Losses": "0",
    //     },
    //     {
    //         "_id":"3",
    //         "Name": "ARjuna",
    //         "Wins": "10",
    //         "Draw": "0",
    //         "Losses": "0",
    //     }

    // ]

    

    return (
        <div className="container">
            <Table bordered className='border border-black rounded-md w-[100%] p-4' columns={heading} dataSource={data} />
        </div>
    )
}

export default Summary
