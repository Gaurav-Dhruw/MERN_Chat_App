import React , {useRef} from 'react';
import moment from 'moment';

const senderStyle = 'bg-blue-200 justify-self-end'; 
const receiverStyle = 'bg-gray-200 justify-self-start';

const Message = ({message,sender}) => {
 return (
    <div className='grid  p-2 m-2'>
        
        <div className={`${sender? senderStyle : receiverStyle} px-4 py-2 rounded-xl max-w-md `}>
          <div className='text-xs mb-1 text-gray-500 text-right'>
              {moment(message.createdAt).format('LT')}
          </div>
          <div className='text-sm'>
              {message.content}
          </div>
        </div>


    </div>
  )
};

export default Message