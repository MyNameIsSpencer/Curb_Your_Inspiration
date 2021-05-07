const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./api/routes/users/userRoutes');
const quotePicRouter = require('./api/routes/quotePics/quotePicsRoutes');

const app = express();

const path = require('path')

app.use('/', express.static(path.join(__dirname, 'build')))

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/quotepics',quotePicRouter );
// app.use('/api/notes', notesRouter);

// at the bottom of your server.js
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
});

const config = require('./api/config');

mongoose
  // .connect('mongodb://localhost:27017/curb-y-insp',
  .connect(config.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('running on: ' + config.PORT);
    });
  })
  .catch((err) => console.log(err));
