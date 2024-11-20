const express = require('express');
const sequelize = require('./Config/dbConnect');
const userRoutes = require('./Routes/userRoutes');
const multer = require('./Config/multer');
const cors = require('cors');
require('dotenv').config();
const heroRoutes = require('./Routes/heroRoutes');
const aboutRoutes = require('./Routes/aboutroutes');
const servicesRoutes = require('./Routes/servicesroutes');
require('./Models/User');
require('./Models/Hero');
require('./Models/About');
require('./Models/Services');
require('./Models/Project');
require('./Models/Blog');
require('./Models/ContactUs');
require('./Models/Careers');
require('./Models/About')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/heroes', heroRoutes);
app.use('/about',aboutRoutes)
app.use('/services',servicesRoutes)
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected and synced!');
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
