const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://t63010040:kritkuea4095@cluster0.jaj57.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database connected')
})