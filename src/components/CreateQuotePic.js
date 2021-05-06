import React, { useState, useEffect } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default function CreateQuotePic() {
  const [ itemData, setItemData ] = useState({
    apiQuote: {},
    blankedQuote: '',
    selectedImgNum: 0,
    blanksArr: [],
    filledQuote: ``,
    imageArray: [],
    selectedColour: ''
  });

  const colourArr = ['black', 'dodgerblue', 'crimson', 'lightslategray',
    'mediumspringgreen', 'mediumpurple', 'orange', 'pink', 'lightcoral', 'white', 'gold',
  ];

  const getRandomPic = () => {
    const rando = (Math.floor(Math.random() * 500));
    fetch(`https://source.unsplash.com/random?sig=${rando}`).then( data => {
      itemData.imageArray.push(data.url);
    });
  }
  
  const blankOutQuote = (incomingQuote) => {
    let quotey = incomingQuote.split(' ');
    const cutCount = Math.floor(quotey.length * 0.30);
    const quoteyLength = quotey.length;
    const blanksArr = [];
    let remainingWordIndices = [...Array(quoteyLength).keys()];
    for (let i = 0; i < cutCount; i++) {
      const markedIndex = Math.floor(Math.random() * remainingWordIndices.length);
      quotey.splice(remainingWordIndices[markedIndex], 1, '____');
      blanksArr.push('');
      remainingWordIndices.splice(markedIndex, 1);
    }
    quotey = quotey.join(' ');
    let altObj = {...itemData};
    altObj.blankedQuote = quotey;
    altObj.filledQuote = quotey;
    altObj.blanksArr = blanksArr;
    setItemData(altObj);
  }

  const createSubmission = async (dataObj) => {
    console.warn('CREat Sub')
    try {
      const url = 'api/quotePics/createquotepic';
      const method = 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj)
      });
      await response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn('HANDLE SUBMIT')
    const dataObj = {
      imageUrl: itemData.imageArray[itemData.selectedImgNum],
      text: itemData.filledQuote,
      textColour: itemData.selectedColour
    };
    createSubmission(dataObj);
    window.location.href = "http://localhost:3000/quotepics";
  };
  
  const selectImage = (event, selectedNum) => {
    let altObj = {...itemData};
    altObj.selectedImgNum = selectedNum;
    setItemData(altObj);
  }

  const rewriteFilledQuote = () => {
    let tempQuote = '' + itemData.blankedQuote;
    for (let i = 0; i < itemData.blanksArr.length; i++) {
      const newText = itemData.blanksArr[i] === '' ? '+++===---' : itemData.blanksArr[i];
      tempQuote = tempQuote.replace('____', newText);
    }
    tempQuote = tempQuote.replaceAll('+++===---', '____');
    return tempQuote;
  }

  const setBlankValue = (index, newVal) => {
    itemData.blanksArr[index] = newVal;
    itemData.filledQuote = rewriteFilledQuote();
    const altObj = {...itemData}
    setItemData(altObj);
  }

  const selectTextColour = (colour) => {
    console.log(colour)
    const altObj = {...itemData}
    altObj.selectedColour = colour;
    setItemData(altObj);
    console.log(itemData.selectedColour)
  }

  
    async function initNewQuotePicForm() {
        try {
          await fetch("https://type.fit/api/quotes")
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            const randomizer = Math.floor(Math.random() * data.length);
            const tempItemData = itemData;
            tempItemData.apiQuote = data[randomizer];
            setItemData(tempItemData);
          })
          .then(function() {
            for (let i = 0; i < 5; i++) {
              getRandomPic();
            }
          })
          .then(function() {
            blankOutQuote(itemData.apiQuote.text);
            console.log(itemData)
          });
        } catch (err) {
          console.error(err);
          throw err;
        }
      }

      useEffect(() => {
        if (itemData.blankedQuote === '') {
          initNewQuotePicForm();
        }
      }, []);

    return (
        <div className="ml-20 mr-20">
            <div className="mt-20"> {itemData.apiQuote.text} </div>
            <div className="mt-20"> {itemData.blankedQuote} </div>
            <div className="mt-20 submit-button" onClick={e => handleSubmit(e)}>Submit</div>

            <form className="mt-20 quote-blanks-form">

              <Grid container spacing={2}>
                {
                  itemData.blanksArr.map((textBlank, index) => {
                    return (
                      <Grid xs={false} sm={6} md={3} item key={`blank${index}`} >
                          <TextField
                            autoComplete={`blank${index}`}
                            size="small"
                            name={`blank${index}`}
                            variant="outlined"
                            fullWidth
                            id={`blank${index}`}
                            label={`Blank ${index + 1}`}
                            autoFocus
                            value={itemData.blanksArr[index]}
                            onChange={e => setBlankValue(index, e.target.value)}
                          />
                        </Grid>
                    );
                  })
                }
              </Grid>
            </form>

            <div className="mt-20"></div>
            <Grid container spacing={2} justify="center">

              {
                colourArr.map(colour => {
                  return (
                    <Grid item>
                      <div
                        className="colour-opt-btn"
                        style={{backgroundColor: colour}}
                        onClick={e => { selectTextColour(colour) }}
                      />
                    </Grid>
                  );
                })
              }
             
            </Grid>
            <div className="full-width images-container centre-container">
              <div className="mt-20 selected-image-container centre-container">
                <div className="text-over-image" style={{color: itemData.selectedColour}}>
                    {itemData.filledQuote}
                </div>
                <img src={itemData.imageArray[itemData.selectedImgNum]} className="full-width selected-image" />
              </div>
              <div className="mt-20 image-opt-container centre-container">
                {
                  itemData.imageArray.map((img, index) => {
                    return (
                      <img src={itemData.imageArray[index]}
                        className={itemData.selectedImgNum === index ? 'image-option selected-option' : 'image-option'}
                        onClick={e => { selectImage(e, index) }}
                      />
                    );
                  })
                }
              </div>
            </div>
        </div>
    )
}
