import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    const rules = [
        {
            required: true,
            message: "required"
        }
    ]

    const onFinish = () =>{}
    return (
        <div>
            <div className='h-screen bg-[#191919] flex justify-center items-center'>
                <div className="bg-white p-5 w-[500px]">
                    <h1 className="text-primary text-2xl font-semibold text-center my-4">
                        Consistency Maintainer <span className='text-gray-500'>Forget Password</span>
                    </h1>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                    >

                        <Form.Item label="Email : " name={"email"} rules={rules}>
                            <Input placeholder='Email?' />
                        </Form.Item>

                        {/* <div className="my-2 bg-green-300 text-green-800">{msg}</div> */}

                        <Button type='primary' className='bg-black hover:bg-gray-900' block htmlType='submit'>Send Mail</Button>

                        <div className="mt-5 text-center">
                            <span className='text-gray-500'>
                                <Link to="/auth" className='text-primary underline'>Login Page</Link>
                            </span>
                        </div>
                    </Form>
                </div>

            </div>
        </div>
    )
}

export default ForgetPassword
