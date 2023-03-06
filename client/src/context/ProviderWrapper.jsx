import {BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider,QueryClient } from 'react-query'; 
import {ReactQueryDevtools} from 'react-query/devtools';
import ChatProvider from './ChatProvider';


const queryClient = new QueryClient();


export default function ProviderWrapper({children}) {
    
   return ( 
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID}>
          <QueryClientProvider client={queryClient}>
                <ChatProvider>
                    <BrowserRouter>

                        {children}
                        
                        <ReactQueryDevtools initialIsOpen={false} />
                    </BrowserRouter>
                </ChatProvider>
          </QueryClientProvider>
    </GoogleOAuthProvider>

   )
          
}
