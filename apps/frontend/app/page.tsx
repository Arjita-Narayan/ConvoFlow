import ChatContainer from '@/src/components/chat/ChatContainer';
import { MessageSquare, User, Settings, Bell } from 'lucide-react';

export default function Home(){
return(
  <>
 <div className="bg-amber-50 h-screen flex flex-col items-center ">

  <div className="flex flex-row items-center justify-center gap-4 pt-20">
    <p className='text-emerald-800 font-bold'>......</p>
<h1 className="text-emerald-800 text-center font-bold text-3xl">CovoFlow</h1>
<MessageSquare className='w-6 h-6 text-emerald-800 font-bold'/>
<p className='text-emerald-800 font-bold'>......</p>
  </div>
  <ChatContainer/>
  

 </div>
  </>
)
}