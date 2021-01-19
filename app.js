let express = require('express');
const app = express();
let sequelize = require("./db")
let journal = require("./controllers/journalcontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();

app.use(express.json());
app.use('/journal', journal);

app.use("/user",user);

app.listen(3000, function() {
    console.log('App is listening on port 3000');
});