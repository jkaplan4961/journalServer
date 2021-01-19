let express = require('express');
let router = express.Router();

router.get('/practice', function (req, res)
{
    res.send("this is a practice route");   
});

module.exports = router