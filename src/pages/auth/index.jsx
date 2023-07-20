// import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import './auth.css'
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import {LoginUser, RegisterUser} from "../../apicalls/users"

const Auth = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[msg , setMsg] = React.useState("");

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

    const logInOnFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await LoginUser(values);
            dispatch(SetLoader(false));

            if (response.success) {
                message.success(response.message)
                localStorage.setItem("token", response.data);
                navigate("/")
            } else {
                throw new Error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false));
            console.log(error)
            message.error(error.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])

    const registerOnFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            console.log(import.meta.env.VITE_APP_SERVER_URL)
            const response = await RegisterUser(values);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message)
                setMsg(response.message)
                // navigate("/login")
            } else {
                throw new Error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false));

            message.error(error.message);
        }
    }


return (
    <>
        <div className='main-register'>
            <div className="form-structor">
                <div className="signup ">
                    <h2 className="form-title mb-8" id="signup" onClick={handlregisterpageopen}><span>or</span>Sign up</h2>
                    {/* This Div to remove */}
                    <Form
                        layout="vertical"
                        onFinish={registerOnFinish}
                        className='mt-20'
                    >
                        <Form.Item label="" name={"name"} rules={rules}>
                            <Input className=' h-[2.5rem] placeholder-gray-500 placeholder:font-semibold' placeholder='Name?' />
                        </Form.Item>
                        <Form.Item label="" name={"email"} rules={rules}>
                            <Input className='h-[2.5rem] placeholder-gray-500 placeholder:font-semibold' placeholder='Email?' />
                        </Form.Item>
                        <Form.Item label="" name={"password"} rules={rules}>
                            <Input className='h-[2.5rem] placeholder-gray-500 placeholder:font-semibold' type='password' placeholder='Password' />
                        </Form.Item>

                        {/* <Form.Item label="" name={"confirmpassword"} rules={rules}>
                            <Input className='h-[2.5rem] placeholder-gray-500 placeholder:font-semibold' type='confirmpassword' placeholder='Confirm Password' />
                        </Form.Item> */}


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
                            onFinish={logInOnFinish}
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