

const userModule = require('./routes/user');

app.use('/user', userModule.userRouter);
