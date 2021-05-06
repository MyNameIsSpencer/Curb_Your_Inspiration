const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./api/routes/users/userRoutes');
const quotePicRouter = require('./api/routes/quotePics/quotePicsRoutes');

const app = express();
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/quotepics',quotePicRouter );
// app.use('/api/notes', notesRouter);

mongoose
  .connect('mongodb://localhost:27017/curb-y-insp',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    app.listen('8080', () => {
      console.log('server is running on port 8080');
    });
  })
  .catch((err) => console.log(err));


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// })