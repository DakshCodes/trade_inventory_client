// import { useRouter } from 'next/navigation';
import React from 'react'
import './auth.css'
import { Button, Form, Input } from 'antd';
import {Link} from "react-router-dom"

const Auth = () => {
    // const router = useRouter();

    // const navigate = () => {
    //     router.push("/");
    // }
    const rules = [
        {
            required: true,
            message: "required"
        }
    ]


    const handlloginpageopen = (e) => {
        const signupBtn = document.getElementById('signup');
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }
    const handlregisterpageopen = (e) => {
        const loginBtn = document.getElementById('login');
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                loginBtn.parentNode.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }

    const onFinish = () => { }

    return (<>
        <div className='main-register'>
            <div className="form-structor">
                <div className="signup ">
                    <h2 className="form-title mb-8" id="signup" onClick={handlregisterpageopen}><span>or</span>Sign up</h2>
                    {/* This Div to remove */}
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        className='mt-20'
                    >
                        <Form.Item label="" name={"name"} rules={rules}>
                            <Input  className=' h-[2.5rem] placeholder-gray-500 placeholder:font-semibold'  placeholder='Name?' />
                        </Form.Item>
                        <Form.Item label="" name={"email"} rules={rules}>
                            <Input  className='h-[2.5rem] placeholder-gray-500 placeholder:font-semibold'  placeholder='Email?' />
                        </Form.Item>
                        <Form.Item label="" name={"password"} rules={rules}>
                            <Input  className='h-[2.5rem] placeholder-gray-500 placeholder:font-semibold' type='password' placeholder='Password' />
                        </Form.Item>

                        <Form.Item label="" name={"confirmpassword"} rules={rules}>
                            <Input   className='h-[2.5rem] placeholder-gray-500 placeholder:font-semibold' type='confirmpassword' placeholder='Confirm Password' />
                        </Form.Item>


                        <Button type='primary' className='submit-btn' block htmlType='submit'>Register</Button>


                    </Form>
                    {/* <button className="submit-btn">Sign up</button> */}
                </div>
                <div className="login slide-up">
                    <div className="center">
                        <h2 className="form-title font-semibold" id="login" onClick={handlloginpageopen}><span>or</span>Log in</h2>
                        {/* This Div to remove */}
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            className='mt-16'
                        >

                            <Form.Item label="" name={"LogEmail"} rules={rules}>
                                <Input className='placeholder-gray-500 placeholder:font-semibold focus:border-none hover:border-none h-[2.5rem]' placeholder='Email?' />
                            </Form.Item>
                            <Form.Item label="" name={"LogPassword"} rules={rules}>
                                <Input className='placeholder-gray-500 placeholder:font-semibold focus:border-none hover:border-none h-[2.5rem]' type='password' placeholder='Password?' />
                            </Form.Item>



                                <Button type='primary' className='submit-btn h-[40px]' block htmlType='submit'>Login</Button>


                        </Form>

                        <div className="mt-5 text-center">
                            <span className='text-gray-500'>
                                <Link to="/forget-password" className='text-primary underline'>Forgot Password ?</Link>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Auth