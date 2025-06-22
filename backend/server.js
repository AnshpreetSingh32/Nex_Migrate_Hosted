const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');
const cors = require('cors');


//middleware routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//Test Route
app.get('/', (req, res) => res.send('Backend working...'));

//test error
app.get('/cause-error', (req, res) => {
    throw new Error('Intentional error');
});



//middleware routes using
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);



//basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});


// Sync DB
// Use plain sync to avoid repeated alter/index creation
// Remove { alter: true } after schema is correct
// If you need to update schema in the future, use migrations or temporarily add { alter: true }
db.sequelize.sync().then(() =>
{
    console.log('✅ Sequelize models synced.');
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error('❌ Error syncing database:', err);
});
