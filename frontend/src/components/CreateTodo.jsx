export function CreateTodo(){
    return <div>
        <input style={{
            padding : 10 , 
            margin : 10
        }} type="text" placeholder="title" /><br />
        <input style={{
            padding : 10 , 
            margin : 10
        }} type="text" placeholder="description" /><br />

        <button style={{
            padding : 5 , 
            margin : 10
        }}>Add todo</button>
    </div>
}
