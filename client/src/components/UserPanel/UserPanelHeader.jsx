import React , {useState} from 'react'
import {useSearchUser} from '../../hooks';
import {useChat} from '../../context/ChatProvider'
import {IoIosNotifications, IoMdMenu, IoIosSearch} from 'react-icons/io'
const icons = [<IoIosNotifications/>,<IoMdMenu/>]


const UserPanelHeader = ({setIsOpen}) => {
  const {userInfo,setSearchList} = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const {mutate} = useSearchUser();

  const handleSearch = () =>{
    if(searchQuery.length===0) return;
    mutate(searchQuery);
  }
  return (
    <>
      <div className=' px-2 mb-5'>
              <div className='flex justify-between '>
                    <div onClick={()=>setIsOpen(prevState=>!prevState)} className='w-16 h-16 min-w-[4rem]  min-h-[4rem] rounded-full overflow-hidden cursor-pointer'>
                        <img src={userInfo.picture} />
                    </div>
                    <div className='ml-4'>

                      <div className='flex mb-2 justify-end'>
                        {icons.map((icon)=>(
                            <span className='text-2xl  p-1 mx-1'>
                              {icon}
                            </span>
                        ))}
                      </div>
                      <div className='flex items-center bg-gray-100 rounded-xl overflow-hidden  border focus:border-indigo-500' >
                        <span onClick={handleSearch} className='text-2xl opacity-30 border-r-2 p-1 px-2 outline-none cursor-pointer border-gray-200 '>
                          <IoIosSearch/>
                         </span> 
                         <input 
                              onChange={(e)=>{
                                  if(e.target.value.trim().length===0) setSearchList([]);
                                  setSearchQuery(e.target.value.trim())
                              }} 
                              type='search' placeholder='Search or start a new chat ' className='w-full text-sm p-1 px-2 outline-none bg-inherit'/>
                    </div>
                  </div>
            </div>
            
            
      </div>
        
    </>
    
  )
}

export default UserPanelHeader;