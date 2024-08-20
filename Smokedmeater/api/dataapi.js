const express = require('express');
const router = express.Router();

const data = {
    squeezedCheese: 0,
    drunks:0
}

// Middleware to parse JSON request bodies
router.use(express.json());

// Takes cheese from a box and squeezes it.
router.post('/squeeze', (req, res) => {
    const { cheeseAmount } = req.body;

    // Check if the required variables are present
    if (!cheeseAmount || typeof cheeseAmount != 'number') {
        // Throw an error if a variable is missing
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields: cheeseAmount required'
        });
    }

    data.squeezedCheese += cheeseAmount;

    // If all variables are present, send a success response
    res.status(200).json({
        status: 'success',
        data: {
            squeezedCheese: data.squeezedCheese
        }
    });
});

// get data.squeezedCheese
router.get('/squeezedCheese', (req, res) => {
    res.json({
        message: "Cheese squeezed!"
    })
});

// reset data.squeezedCheese
router.post('/setSqueezedCheese', (req, res) => {
    const { cheeseAmount } = req.body;

    // Check if the required variables are present
    if (typeof cheeseAmount != 'number') {
        // Throw an error if a variable is missing
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields: cheeseAmount required'
        });
    }
    data.squeezedCheese = cheeseAmount;
    res.json({
        squeezedCheese:data.squeezedCheese
    })
});

// Get Leonard Cohen lyrics
router.get('/lyrics', (req, res) => {
    res.json({
        lyrics:"I'm Your Man"
    })
});


//  Detect drunk people
router.get('/detect-drunk', (req, res) => {
    const randomBoolean = Math.random() >= 0.5;

    if(randomBoolean){
        data.drunks +=1;
    }

    res.json({
        isDrunk:randomBoolean
    })
});

// Get Number of Drunk People
router.get('/get-drunks', (req, res) => {
    res.json({
        drunks:data.drunks
    })
});


// Cut potatoes
router.post('/cut', (req, res) => {

    const {size} = req.body;

    console.log(size);

    res.json({
        message:"Potatoes cut!"
    })
});

// Dip potatoes in syrup
router.post('/dip', (req, res) => {
    const {time} = req.body;

    console.log(time);

    res.json({
        message:"Potatoes dipped!"
    })
});

// Boil potatoes
router.post('/boil', (req, res) => {

    const {duration} = req.body;

    console.log(duration);

    res.json({
        message:"Potatoes boiled!"
    })
});

// Get potato softness level
router.get('/softness', (req, res) => {
    res.json({
        message:"soft-ish"
    })
});

// Fry potatoes
router.post('/fry', (req, res) => {

    const {oilType} = req.body;

    console.log(oilType);

    res.json({
        message:"Potatoes fried!"
    })
});

// Maintain temperature
router.post('/maintain-temperature', (req, res) => {
    const  {temperature} = req.body;

    console.log(temperature);

    res.json({
        message:"Temperature maintained!"
    })
});

// Mix ingredients
router.post('/mix', (req, res) => {

    const {ingredients} = req.body;

    console.log(ingredients);

    res.json({
        message:"Ingredients mixed!"
    })
});

// Send box to user
router.post('/send', (req, res) => {

    const { address } = req.body;

    console.log(address);

    res.json({
        message:"Box sent!"
    })
});


module.exports = router;