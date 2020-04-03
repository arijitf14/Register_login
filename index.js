const express = require('express')
const app = express()
const mongoose = require('mongoose')
//import routes
const authRoute =require('./routes/auth')
require('dotenv/config')



//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true,
    useUnifiedTopology: true },
    () => {
        console.log('Connected to DB!')
    })

    //Middleware
    app.use(express.json())


//Route Middlewares
app.use('/api/user', authRoute)

app.listen(3000, () => console.log('Server up and running'))