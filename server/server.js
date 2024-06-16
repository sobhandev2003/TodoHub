const { configDotenv } = require("dotenv")
const express = require("express")
const dbConnection = require("./config/dbConfig")
const cors=require('cors')
const cookieParser = require('cookie-parser')
configDotenv()
const app = express()
const corsOptions = {
    origin: /^http:\/\/localhost:\d+$/,
    credentials: true // Allow cookies with CORS
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use("/user",require("./routes/userRoute"))
app.use("/task",require("./routes/taskRoutes"))
dbConnection()
app.use(require("./middilware/errorHendeler"))

const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Server is running on http://127.0.0.1:${port}`)
})