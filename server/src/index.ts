import express, {Express} from 'express'
import authRouter from './routes/auth.routes';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/tasks.routes';
import userRouter from './routes/user.routes';
import testimonialsRouter from './routes/testimonials.routes';
const app :Express= express()


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
const allowedOrigins = ['https://tasky-full-stack-project.vercel.app'];
app.use(cors({
origin:allowedOrigins,
methods:["PUT","GET","POST","DELETE","PATCH"] ,
credentials: true,   
}))


app.get('/',(_req,res)=>{

    res.send('<h1>Welcome to Tasky API </h1>')
})
app.use("/api/auth",authRouter )
app.use("/api",taskRouter)
app.use("/api",userRouter)
app.use("/api",testimonialsRouter)







 const port= process.env.PORT || 5678
 app.listen(port,()=>{
    console.log (`app is live on port ${port}`)
 })