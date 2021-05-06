import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

export default function QuotePicList() {
  const [ quotePicList, setQuotePics ] = useState([]);
  const [ activeQuotePic, setActiveQuotePic ] = useState(null);

  const getQuotePics = async () => {
    try {
      await fetch('/api/quotepics/quotepiclist')
        .then(function(response) {
          return response.json();
        })
        .then((result) => {
          setQuotePics(result.data);
        })
      
    } catch (err) {
      throw err;
    }
  }

  const viewQuotePic = (e, index) => {
    setActiveQuotePic(quotePicList[index]);
  }

  const clearQuotePic = () => {
    setActiveQuotePic(null);
  }
  
  useEffect(() => {
    getQuotePics();
  }, []);

  return (
      <div>
          {activeQuotePic && <div className="active-quotepic-overlay" onClick={() => clearQuotePic()} >
            <div className="active-quotepic-combo">
              <div className="text-over-image" style={{color: activeQuotePic.textColour}}>
                  {activeQuotePic.text}
              </div>
              <img src={activeQuotePic.imageUrl} 
                className="active-pic"
              />
            </div>
          </div>}
          <div className="ml-20">
            <Grid container spacing={2}>
              {
                quotePicList.map((quotePic, index) => {
                  return(
                    <img src={quotePic.imageUrl}
                      className="mt-20 image-option"
                      onClick={e => { viewQuotePic(e, index) }}
                    />
                  )
                })
              }
            </Grid>
          </div>
      </div>
  );
}
