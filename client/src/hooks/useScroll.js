import {useState, useRef, useEffect, useLayoutEffect} from 'react';

export function useScroll({activeChat, messages}) {
  const ref = useRef();

  const handleScroll = ()=>{
    console.log(ele.scrollTop);
  }

  // useEffect(()=>{
  //   const ele =ref.current;
  //   if(ele)
  //     ele.addEventListener('scroll',handleScroll)
  //   return ()=>{
  //     if(ele)
  //       ele.removeEventListener('scroll',handleScroll);
  //   }
  // },[ref]);

  useEffect(()=>{
    const ele =ref.current;
    if(ele && scroll){
      ele.scrollTop = ele.scrollHeight;
    }
  },[messages]);
  
  return ref;
}