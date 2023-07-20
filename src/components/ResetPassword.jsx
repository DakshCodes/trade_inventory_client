import React, { useEffect, useState } from 'react'
import { ResetPasswordHandler } from '../apicalls/users';
import { useParams } from 'react-router';
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'

const rules = [
    {
        required: true,
        message: "required"
    }
]

const ResetPassword = () => {

    const { id, token } = useParams();
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch()


    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true))
            const response = await ResetPasswordHandler(values, id, token)
            dispatch(SetLoader(false))
            
            if (response.success) {
                message.success(response.message)
                setStatus(true);
                navigate("/auth");
            }
            else {
                throw new Error(response.message);
            }
            
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }
    
    
    return (
        <div>
            <div className='h-screen bg-[#252424] flex justify-center items-center'>
                <div className="bg-white p-5 w-[500px]">
                    <h1 className="text-primary text-2xl font-semibold text-center my-4">
                        Trade Inventory <span className='text-gray-500'>Reset Password</span>
                    </h1>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                    >

                        <Form.Item label="Password : " name={"password"} rules={rules}>
                            <Input type='password' placeholder='Password?' rules={rules} />
                        </Form.Item>

                        {status && <div className='bg-green-300 text-green-800 m-2 p-2'>Your Password has been updated Successfully</div>}

                        <Button type='primary' className='bg-black hover:bg-gray-900' block htmlType='submit'>Reset Password</Button>

                    </Form>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword;
