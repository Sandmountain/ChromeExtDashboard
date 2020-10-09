import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Button,
} from '@material-ui/core';

export default function WallpaperTab(props) {
  const { settings, setSettings, testChanges } = props;
  const { collectionID, windowSize, customURL, imageType } = settings;

  const [url, setUrl] = useState(customURL);
  const [colID, setColID] = useState(collectionID);

  const [imgType, setImgType] = useState(imageType);

  const handleUnisplashID = (event) => {
    setColID(event.target.value);
    setSettings({ ...settings, collectionID: event.target.value, imageType: 'unisplash' });
  };

  const handleCustomURL = (event) => {
    setUrl(event.target.value);
    setSettings({ ...settings, customURL: event.target.value, imageType: 'custom' });
  };

  const handleRadioInput = (e) => {
    console.log(e.target.value);
    setImgType(e.target.value);
    setSettings({ ...settings, imageType: e.target.value });
  };

  return (
    <>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Wallpaper settings
          <Button variant="outlined" onClick={() => testChanges()}>
            {' '}
            Test Changes
          </Button>
        </div>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>Please enter your screen resolution</DialogContentText>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <TextField label={`Width`} value={windowSize[0]}></TextField>
          <TextField label="Height" value={windowSize[1]}></TextField>
        </div>
      </DialogContent>

      <DialogContent>
        <FormGroup row component="fieldset" style={{ marginBottom: 20 }}>
          <RadioGroup row aria-label="position" name="position" value={imgType} onChange={handleRadioInput}>
            <FormControlLabel
              value="unisplash"
              control={<Radio color="primary" />}
              label=" Use unisplash images"
              labelPlacement="end"
            />
            <FormControlLabel
              value="custom"
              control={<Radio color="primary" />}
              label=" Use custom Image"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormGroup>
        <div>
          {imgType === 'unisplash' ? (
            <>
              <Typography style={{ marginBottom: 12 }}>
                Entering a{' '}
                <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">
                  Unsplash
                </a>{' '}
                collection id in the input below will change the background images.
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Enter Collection ID"
                type="ID"
                fullWidth
                value={colID}
                onChange={handleUnisplashID}
              />
              <Typography variant="body2">
                Tip: Create a{' '}
                <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">
                  Unsplash
                </a>{' '}
                account and make your own collection.
              </Typography>
            </>
          ) : (
            <>
              <Typography>To use a custom image, enter the url below</Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Enter a custom image url"
                type="url"
                fullWidth
                value={url}
                onChange={handleCustomURL}
              />
            </>
          )}
        </div>
      </DialogContent>
    </>
  );
}
