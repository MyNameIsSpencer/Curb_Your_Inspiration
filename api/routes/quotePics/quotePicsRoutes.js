const express = require('express');
const { getAllQuotePics, createQuotePic } = require('./quotePicsController');


const router = express.Router();


router.route('/createquotepic')
    .post(async (req, res) => {
        console.warn('POSTer')
        const { imageUrl, text, textColour } = req.body;
        try {
            const quotePic = await createQuotePic({ imageUrl, text, textColour })
            res.status(201).json({ res });
        } catch (err) {
            console.warn('ERRRERERRR')
            console.error(err);
            res.status(500).json({ message: 'No good' });
        }
    })


router.route('/quotepiclist')
    .get(async (req, res) => {
        try {
            // const { params } = req;
            const quotes = await getAllQuotePics();
            res.json({
                data: quotes
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'internaler server error' });
        }
});

module.exports = router;
