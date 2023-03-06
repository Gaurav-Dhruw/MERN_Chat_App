import React from 'react'

const Modal = ({isOpen,setIsOpen,chat,mutate}) => {

    if(!isOpen) return(<></>);

    return (
        <div className='absolute top-0 left-0 w-full h-full backdrop-blur-sm backdrop-brightness-75'>
                <div className='flex justify-center h-full'>
                    <div className='mt-40'>

                            <div className='shadow-lg bg-white p-8 rounded-lg'>
                                    <div className='mb-5'>
                                        <h2>Start a chat with <b className=''>{chat.name}</b> ?</h2>
                                    </div>
                                    
                                    
                                    <div className='flex justify-end'>

                                        <button onClick={()=>{setIsOpen(false)}} className='text-red-500 mx-2'>No</button>
                                        <button onClick={()=>{ 
                                            mutate({_id:chat._id});
                                            setIsOpen(false)}} className='mx-2'>
                                                Yes
                                        </button>
                                    </div>
                            </div>
                    </div>
                </div>
        </div>
    )
}

export default Modal