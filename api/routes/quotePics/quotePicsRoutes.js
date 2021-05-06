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



// router.route('/')
//   .get(async (req, res) => {
//     try {
//       res.json({ data: [] });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'internal server error' });
//     }
//   })
//   .post(async (req, res) => {
//     try {
//       const { body } = req;
//       if (!body.text || body.text === '') {
//         res.status(400).json({ message: 'text must be provided' });
//       }
//       const newNote = {
//         text: body.text,
//       }
//       const id = await createNote(newNote)
//       res.json({ data: { id }});
//     } catch(err) {
//       console.log(err);
//       res.status(500).json({ message: 'internal server error' });
//     }

//   });

// router.route('/:id')
//   .get(async (req, res) => {
//     try {
//       const { params } = req;
//       const quotePic = await getNoteById(params.id);
//       res.json({ data: quotePic });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'internal server error' });
//     }
//   })
//   .put(async (req, res) => {
//     try {
//       const { body, params } = req;
//       if (!body.text || body.text === '') {
//         res.status(400).json({ message: 'text must be provided' });
//       }

//       const newNote = await updateNoteById({
//         text: body.text,
//         id: params.id,
//       });

//       res.json({ data: newNote });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'internal server error' });
//     }
//   });






// .post(async (req, res) => {
//     try {
//       const { body } = req;
//       if (!body.text || body.text === '') {
//         res.status(400).json({ message: 'text must be provided' });
//       }
//       const newNote = {
//         text: body.text,
//       }
//       const id = await createNote(newNote)
//       res.json({ data: { id }});
//     } catch(err) {
//       console.log(err);
//       res.status(500).json({ message: 'internal server error' });
//     }

//   });


// router.route('/')
//   .get(async (req, res) => {
//     try {
//       const { id } = req.user;
//       const notes = await getNotesByUser(id);
//       console.log('notes:', notes);


//       res.json({ data: notes });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'internal server error' });
//     }
//   })
//   .post(async (req, res) => {



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
