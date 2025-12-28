import express from "express";
import users from "./MOCK_DATA.js";



const app = express();

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

let Users = users

app.get('/',(req,res)=>{
    return res.status(200)
     .json({
      message:"data sent succesfully",
      data:Users
     })
}) // getting all user detail

app.get("/:id",(req,res)=>{
  const  id  = Number(req.params.id)
 console.log(req.params);
 
const user = Users.find((item)=> item.id === id)
if(!user){
 return res.status(404)
  .json({message:"no such user exist"})
}
res.status(200).json(user)


})// for getting paticular user detail 

app.post("/",(req,res)=>{
   const {first_name,last_name,email,gender} = req.body

   if(!first_name || !last_name || !email || !gender){
   return res.status(404)
    .json({
      message:"info about user is missing "
    })
   }
  const userId = Users.length + 1;

  const user = {
    id:userId,
    first_name,
    last_name,
    email,
    gender
  }

  Users.push(user)
    
  return res.status(200)
    .json(Users)


}) // for creating id

app.patch("/:id",(req,res)=>{
   const {newEmail} = req.body
   const id = Number(req.params.id)
   if(!newEmail){
   return res.status(404)
    .json({
      message:"info about user email is missing "
    })
   } 

   const user = Users.find((item)=>{
       return item.id === id
   })
   if(!user){
  return res.status(404)
  .json({message:"no such user exist"})
}

   user.email=newEmail

   res.status(200)
   .json({user,
    message:"user updated succesfully"
   })

})// for updating id 

app.delete("/:id",(req,res)=>{
  const id = Number(req.params.id)

  const user = Users.find((item)=> item.id === id)

  if(!user){
  return res.status(404)
  .json({message:"no such user exist"})
}
Users =  Users.filter((item)=> item.id !== id)

return res.status(200)
 .json({message:"user succesfully delted",
 Users
 })

}) // for deleting id 


app.listen(7000, () => {
  console.log("Server Started succesfully ✔️");
});
