import cors from 'cors';
import express from 'express'
import dotenv from "dotenv"
import * as indexRouter from './src/index.router.js'

dotenv.config({path:'./config/.env'})

const app = express()
const port = 5002
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

const baseurl=process.env.BASEURL
app.use(`${baseurl}`,indexRouter.feedbackRouter)
app.use(`${baseurl}`,indexRouter.contactRouter)

app.post('/api/v1/contact', (req, res) => {
    // Handle the contact form submission
    res.send('Contact form submitted!');
});


app.use('*',(req,res)=>{
    res.status(404).json({message:"page not found"})
})



app.listen(port, () => console.log(` app listening on port ${port}!`))