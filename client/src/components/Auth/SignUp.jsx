
import React, {useState, useRef} from 'react';
import {BiHide, BiShow} from 'react-icons/bi';
import {FcGoogle} from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { useOAuth, useSignUpUser } from '../../hooks';



const SignUp = () => {

    const {data,mutate} = useSignUpUser();
    const OAuth = useOAuth();
    const [showPassword, setShowPassword] = useState(false);
    const passwordEle = useRef();
    const emailEle = useRef();
    const nameEle = useRef();
    const navigate = useNavigate();


    const handleSignUp = (event)=>{
        event.preventDefault();
        const userData=  {
            name:nameEle.current.value,
            email:emailEle.current.value,
            password:passwordEle.current.value
        };
        mutate(userData);
    }

    const googleSignUp = useGoogleLogin({
            onSuccess: (tokenResponse)=>{
                const {access_token} = tokenResponse;
                OAuth.mutate({access_token});
            }
        });
    

  return (
    <>
        
        <form onSubmit={handleSignUp}
            className='bg-white w-[18rem] md:w-80 mt-20 rounded-lg shadow-lg text-sm mx-auto 0 p-5 flex flex-col '>
                <h2 className='font-bold text-xl  border-b-2 border-gray-500 pb-4 px-1 mx-4'>Sign Up</h2>
                <div>
                    <div className='my-5 grid '>
                        <input 
                            ref={nameEle}
                            type="name" 
                            placeholder="User Name" 
                            required 
                            className='border-2 w-5/6 mx-auto mt-5 rounded-md p-2 outline-none '/>
                        <input 
                            ref={emailEle}
                            type="email" 
                            placeholder="Email" 
                            required 
                            className='border-2 w-5/6 mx-auto mt-5 rounded-md p-2 outline-none '/>
                        <div className={`flex items-center justify-between w-5/6 border-2 mx-auto my-5 rounded-md `}>
                            <input 
                                ref={passwordEle}
                                type={showPassword?"text":"password"} 
                                placeholder="Password" 
                                required 
                                className='rounded-l-md outline-none w-5/6 p-2 border-r-2 '/>
                            <span onClick={()=>setShowPassword(showPassword=>!showPassword)} className='flex opacity-60 h-full items-center cursor-pointer justify-center scale-125  w-1/6 '>
                                {showPassword?<BiHide/>:<BiShow/>}
                            </span>

                        </div>
                        
                    </div>
                    
                </div>
                <div className='flex justify-center mb-5 '>
                        <button 
                            className='rounded-lg w-40 bg-gray-800  active:outline-none active:bg-gray-700 shadow-lg text-white'>Sign Up</button>
                </div>
                <div className='grid justify-items-center mt-8 '>
                        <span className='text-xs text-gray-400'>Or signup with</span>
                        <span className="transition rounded-full mt-2 shadow-lg duration-200 ease p-1 text-2xl hover:scale-110 cursor-pointer" onClick={()=>googleSignUp()}><FcGoogle/></span>

                    </div>
                <div className='text-xs text-center mt-2'>
                    <Link to='/auth/login'>
                        <span 
                            className='transition duration-200 text-gray-400 cursor-pointer hover:text-pink-500 hover:underline underline-offset-4'>
                                Already have an account
                        </span>
                    </Link>    
                </div>
                
        </form>

    </>
  )
}


export default SignUp;