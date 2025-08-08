import { useState } from 'react'
export function CreateTodo(props){
    // react-query : using the local state variable : 
    const [title , setTitle] =  useState("") ; 
    const [desc , setDesc] = useState("") ; 
    
    return <div>
        <input  id="title" style={{
            padding : 10 , 
            margin : 10
        }} type="text" placeholder="title" onChange={(e)=>{
            const value = e.target.value ; 
            setTitle(value) ; 
        }} /><br />
        <input  id="description" style={{
            padding : 10 , 
            margin : 10
        }} type="text" placeholder="description" onChange={(e)=>{
            const value = e.target.value ; 
            setDesc(value) ; 
        }}
        /><br />

        <button style={{
            padding : 5 , 
            margin : 10
        }} onClick={()=>{
            fetch("http://localhost:8001/todo" , {
                method : "POST" , 
                body:JSON.stringify({
                    todos : {
                         title : title , 
                         description : desc ,
                    }
                   
                }) , 
                headers : {
                    "Content-type" : "application/json"
                }
            })
            .then(async function (res){
                const json = await res.json() ; 
                alert("Todo added!")
            })
        }} >Add todo</button>
    </div>
}
