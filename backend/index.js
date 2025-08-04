const express = require('express')
const app = express() ; 
const {createTodo , updateTodo} = require('./types')
const port = 8001 ;

// json-body parsing middleware : 
app.use(express.json()) ; 

app.post('/todo' , (req ,res)=>{
    // add todo

    const todos = req.body.todos ; 

    // input validation using the createTodo schemma
    const response = createTodo.safeParse(todos)  ; 
    if(!response.success){
        res.status(411).json({
            errorMessage : response.error , 
            clarification : "You sent the wrong inputs."
        })
    }
    else{
        
        res.status(200).json({
            response , 
        })
    }

})


app.get('/get-todo' , (req , res)=>{
    const id = req.body.todoId ;
    console.log(id) ; 
    const response = updateTodo.safeParse(id);
    if(!response.success){
            res.status(411).json({
            errorMessage : response.error , 
            clarification : "You sent the wrong inputs."
        })
    }
    else{
        res.status(200).json({
            response , 
        })
    }
})

app.put("/completed" , (req , res)=>{
    
})


app.listen(port , ()=>{
    console.log(`server running at the port : ${port}\nvisit http://localhost:${port}`)
})


