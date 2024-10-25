const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

//admin
app.use('/admin', require('./Routes/admin/auth.routes'));
app.use('/admin/profileDetails', require('./Routes/ProjectDetails.routes'));


//Employee
app.use('/Employee', require('./Routes/Employee.routes'));
app.use('/Employee/attrition', require('./Routes/Attrition.routes'));



app.get("/", async (req, res) => {
  res.send("Welcome")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
