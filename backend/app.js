const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const userModel = require("./models/userModel");

//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

app.post("/api/signup",async(req,res)=>{
    let user = new userModel(req.body);
    let result = await user.save();
    res.send(result);
})

// email

// Define your route handler for sending emails
app.post('/api/send-email', async (req, res) => {
    try {
        const { userEmail, status } = req.body; // Get user's email and status from request body

        // Send email using Nodemailer
        await sendEmail(userEmail, status );

        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send email");
    }
});

// Function to send email
async function sendEmail(userEmail, status) {
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'quickjobscompany01@gmail.com', // Replace with your Gmail email
            pass: 'svea mohl sgwe wnen' // Replace with your Gmail password
        }
    });

    // Send email
    let info = await transporter.sendMail({
        from: '"Quick Jobs" <quickjobscompany01@gmail.com>',
        to: userEmail,
        subject: 'Job Application Status Update',
        text: `Your job application status has been \nupdated to: ${status} \ncheck your Job Applied Section , \nThanks for Join with us !`
    });

    console.log("Message sent: %s", info.messageId);
}

// email

//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//     res.send("Hello from Node Js");
// })
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);

// error middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});