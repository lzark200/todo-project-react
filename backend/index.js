const express = require('express')
const app = express() ; 
const {createTodo , updateTodo} = require('./types');
const { mongoConnect } = require('./mongodb_connection/connection');
const { todo } = require('./models/db');


const port = 8001 ;

// json-body parsing middleware : 
app.use(express.json()) ; 

mongoConnect() ; 

app.post('/todo' , async (req ,res)=>{
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
        // put todo in the db : 
       const createdResponse =  await todo.create({
            title : todos.title , 
            description : todos.description , 
            completed : false
        })

        console.log(createdResponse)
        
        res.status(200).json({
            userInputTodo : response , 
            databaseResponse : createdResponse,
        })
    }

})


app.get('/get-todo' , async (req , res)=>{
    const id = req.body.todoId ;
    const response = updateTodo.safeParse(id);
    console.log(response) ; 
    if(!response.success){
            res.status(411).json({
            errorMessage : response.error , 
            clarification : "You sent the wrong inputs."
        })
    }
    else{
        const id = response.data.id ; 
        const getResponse =  await todo.findById(id)

        if(!getResponse){
           return res.status(400).json({
                msg : "user not found"
            })
        }
        
        return res.status(200).json({
            userResponse : response , 
            databaseResponse : getResponse,
        })
    }
})

app.put("/completed" , async (req , res)=>{
    const id = req.body.todoId ; 
    const response = updateTodo.safeParse(id) ; 
    if(!response.success){
        res.status(411).json({
            errorMessage : response.error ,
            clarification : "Your sent the wrong inputs"
        })
    }
    else{
        const user_id = response.data.id ; 
        const findUserResponse = await todo.findById(user_id)
        if(!findUserResponse){
           return res.status(400).json({
                msg : "user not found"
            })
        }
        else{
            
            await todo.updateOne({
                _id : user_id 
            } , {
                completed : true
            })

            res.status(200).json({
                status:"success" , 
                msg : "todo successfully marked completed."

            })
        }
    }
})


app.listen(port , ()=>{
    console.log(`server running at the port : ${port}\nvisit http://localhost:${port}`)
})


