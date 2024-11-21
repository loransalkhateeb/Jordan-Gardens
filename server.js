const express = require('express');
const sequelize = require('./Config/dbConnect');
const userRoutes = require('./Routes/userRoutes');
const multer = require('./Config/multer');
const cors = require('cors');
require('dotenv').config();
const heroRoutes = require('./Routes/heroRoutes');
const aboutRoutes = require('./Routes/aboutroutes');
const servicesRoutes = require('./Routes/servicesroutes');
const featureservices = require('./Routes/featureservicesroutes')
const advantageRoutes = require('./Routes/advantagesroutes')
const projectsimages = require('./Routes/ProjectsImages')
const projects = require('./Routes/projectsroutes')
const blogsRoutes = require('./Routes/blogRoutes')
const feeBacksRoutes = require('./Routes/FeedBacksRoutes')
const contactsRoutes = require('./Routes/ContactsRoutes')
const AllContentsRoutres = require('./Routes/AllContentsRoutes')
const PrivacyPolicyRoutes = require('./Routes/PrivacyPolicyRoutes')

require('./Models/User');
require('./Models/Hero');
require('./Models/About');
require('./Models/services');
require('./Models/Project');
require('./Models/blogs');
require('./Models/ContactUs');
require('./Models/Careers');
require('./Models/About')
require('./Models/featureservices')
require('./Models/advantages')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/heroes', heroRoutes);
app.use('/about',aboutRoutes)
app.use('/services',servicesRoutes)
app.use('/featureservices',featureservices)
app.use('/advantages',advantageRoutes)
app.use('/projectsimages',projectsimages)
app.use('/projects',projects)
app.use('/blogs',blogsRoutes)
app.use('/feedbacks',feeBacksRoutes)
app.use('/contacts',contactsRoutes)
app.use('/allcontents',AllContentsRoutres)
app.use('/privacypolicy',PrivacyPolicyRoutes)







sequelize.sync({ force: false }).then(() => {
  console.log('Database connected and synced!');
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
