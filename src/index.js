require('dotenv').config();

const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3001;


db.sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});
    


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
//     }
// );
