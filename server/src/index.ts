import express, {Express} from 'express'
import authRouter from './routes/auth.routes';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/tasks.routes';
import userRouter from './routes/user.routes';
const app :Express= express()


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
origin:["http://localhost:5174"],
methods:["PUT","GET","POST","DELETE","PATCH"] ,
credentials: true,   
}))


app.get('/',(_req,res)=>{

    res.send('<h1>Welcome to Tasky API </h1>')
})
app.use("/api/auth",authRouter )
app.use("/api",taskRouter)
app.use("/api",userRouter)







 const port= process.env.PORT || 5678
 app.listen(port,()=>{
    console.log (`app is live on port ${port}`)
 })