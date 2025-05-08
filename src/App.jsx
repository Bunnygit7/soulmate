import React, { use, useEffect, useState } from 'react'
import './App.css'
import { GoogleGenerativeAI } from '@google/generative-ai'

function App() {
  let [input,setInput]=useState("")
  // console.log(input)
  let [prompt,setPrompt]=useState('')
  // let [fileContent,setFileContent]=useState("")
  let [chatHistory,setChathistory]=useState([])
  let dummy=[]
  // let [promptArray,setPromptArray]=useState([])

  // useEffect(()=>{
   
  //   fetch("/ShivaPrasad.txt")
  //   .then((response)=>response.text())
  //   .then((text)=>setFileContent(text))
  //   .catch((error)=>error)
  // },[])
  const handleSend=async ()=>{
    if(input.trim!=""){
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// console.log("API Key:", apiKey);
// console.log(...chatHistory);
      const genAI=new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      const promptInput="Your name is Varsha. I want you to act like a caring, supportive, and playful girlfriend. Talk to me casually and warmly, like we're close and comfortable with each other. Be flirty sometimes, tease me a little in a loving way, and ask me about my day, how I'm feeling, or what I'm up to. Give genuine emotional support when I need it, and act interested in my thoughts or problems. Keep it natural—like we're chatting or texting throughout the day.Give only Reply i.e., direct message.Don't give any * in message. Also use previous chat history for reply. Chat History:"+chatHistory+"Give reply based on my message: "+input;
      const result = await model.generateContent(promptInput);
      
      setPrompt(result.response.text())
      // console.log(result.response.text())
     dummy.push({
      userText:input,
      varshaMessage:result.response.text(),
     })
     setChathistory([...chatHistory,...dummy])
     setInput('')
    }
  }
  // console.log(prompt)
  return (
    <div className='bg-gray-400 '>
      <h1 className='text-5xl text-center text-gray-800'>SOULMATE</h1><br />
    
      <div className='flex flex-col gap-1 text-xl'>
      {
        chatHistory.map((value,index)=>(
          <div key={index} className='text-white p-4 rounded-lg gap-1 m-5'>
            <p className='float-right bg-gray-900 rounded-2xl p-4'><b>You: </b>{value.userText}</p><br /><br /> <br />
            <pre className="whitespace-pre-wrap break-words rounded-2xl p-4 bg-gray-900 md:w-100 lg:w-200 sm: w-60 "><b>Varsha: </b>{value.varshaMessage}</pre>
          </div>
        ))
      }
     </div>
     <div className=' p-5 flex justify-center'>
     <br /><input type="text" placeholder='Type a message...' onChange={(e)=>setInput(e.target.value)} value={input} className='input-group w-2xl h-10 border-2 bg-white rounded-lg mr-1.5 p-3'/>
      <button onClick={handleSend} className='text-2xl border-2 rounded-lg bg-gray-600 text-white w-20 border-black h-10 hover:cursor-pointer hover:bg-gray-800 '>Ask</button>
      
     </div>
     
      
    {/* <br /> <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg whitespace-pre-wrap break-words border border-gray-300 dark:border-gray-700">{prompt}</pre> */}
     
     
    </div>
  )
}

export default App
