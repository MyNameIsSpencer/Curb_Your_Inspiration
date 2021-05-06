const QuotePic = require('./quotePicsModel');




// exports.createUser = async ({
//     email,
//     password,
//     firstName,
//     lastName,
//   }) => {
//     try {
//       const userDocument = new User({
//         email,
//         password,
//         firstName,
//         lastName,
//       });
//       await userDocument.save();
  
//       return userDocument;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

// exports.createNote = async (data) => {
//     try {
//       const newNote = new Notes(data);
//       const note = await newNote.save();
//       return note.id;
//     } catch (err) {
//       throw err;
//     }
//   };


// exports.createQuotePic = async (
//         imageUrl,
//         text,
//         textColour
//     ) => {
//     try {
//         const newQuotePic = new QuotePics({
//             imageUrl,
//             text,
//             textColour 
//         });
//         const quotePic = await newQuotePic.save();
//         return quotePic.id;
//     } catch (err) {
//         console.log(err);
//         throw err;
//     }
// };




exports.createQuotePic = async (data) => {
    try {
        const quotePic = new QuotePic(data);
        await quotePic.save();

        return quotePic;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getAllQuotePics = async () => {
    console.warn('get alll qutooeooeows')
    try {
        console.warn('Try quotes')
        const quotePicList = await QuotePic.find();
        return quotePicList;
    } catch(err) {
        console.error('ERRRR')
        console.error(err);
        throw err;
    }
}


// exports.getNotesByUser = async (userID) => {
//     try {
//       const notes = await Notes
//         .find({ userId: userID })
//         .populate({ path: 'userId', select: 'firstName lastName' });
  
  
//       return notes.map((note) => {
//         const { createdAt, _id, userId, text } = note;
  
//         const updatedNote = {
//           createdAt,
//           _id,
//           user: {
//             firstName: userId.firstName,
//             lastName: userId.lastName,
//           },
//           text,
//         };
  
//         return updatedNote;
//       });
//     } catch (err) {
//       throw err;
//     }
//   };



// exports.getQuotePics = async (id) => {
//     try {
//         const quotePic = await QuotePics

//     }
// }