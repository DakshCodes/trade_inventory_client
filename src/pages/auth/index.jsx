// import { useRouter } from 'next/navigation';
import React from 'react'
import './auth.css'

const Auth = () => {
    // const router = useRouter();

    // const navigate = () => {
    //     router.push("/");
    // }


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

    return (<>
        <div className='main-register'>
            <div class="form-structor">
                <div class="signup ">
                    <h2 class="form-title" id="signup" onClick={handlregisterpageopen}><span>or</span>Sign up</h2>
                    {/* This Div to remove */}
                    {/* <div class="form-holder">
                        <input type="text" class="input" placeholder="Name" />
                        <input type="email" class="input" placeholder="Email" />
                        <input type="password" class="input" placeholder="Password" />
                    </div> */}
                    <button class="submit-btn">Sign up</button>
                </div>
                <div class="login slide-up">
                    <div class="center">
                        <h2 class="form-title" id="login" onClick={handlloginpageopen}><span>or</span>Log in</h2>
                         {/* This Div to remove */}
                        {/* <div class="form-holder">
                            <input type="email" class="input" placeholder="Email" />
                            <input type="password" class="input" placeholder="Password" />
                        </div> */}
                        <button class="submit-btn">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Auth