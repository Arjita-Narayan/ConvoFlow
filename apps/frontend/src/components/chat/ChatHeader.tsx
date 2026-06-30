import { ArrowLeft } from "lucide-react"
export default function ChatHeader(){

  return(

    <>
    <div className="flex flex-row gap-4 bg-emerald-100 w-full p-4 items-center" >
      <ArrowLeft className="text-emerald-800 font-bold"/>
      <div className="flex flex-col">
<h1 className="text-emerald-800 font-bold text-2xl ">Chat Assistance</h1>
<p className="text-emerald-800">Welcome to convoFlow Assistance...</p>
      </div>

    </div>
    
    </>
  )

}