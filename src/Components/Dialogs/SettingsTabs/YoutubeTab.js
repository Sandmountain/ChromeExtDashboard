import {
  Button,
  Checkbox,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
} from '@material-ui/core';

import React, { useState } from 'react';

const marks = (min, max) => {
  return [
    {
      value: min,
      label: min,
    },
    {
      value: max,
      label: max,
    },
  ];
};

export default function YoutubeTab({ settings, testChanges, setSettings, toggleMovement }) {
  const { nrOfVideos, youtubeVideoInfo } = settings.youtubeSettings;

  const [videos, setNrOfVideos] = useState(nrOfVideos);
  const [ytbInfo, setYoutubeInfo] = useState(youtubeVideoInfo);
  const handleChange = (e, val) => {
    setNrOfVideos(val);
    if (val !== settings.nrOfMails) {
      setSettings({ ...settings, youtubeSettings: { ...settings.youtubeSettings, nrOfVideos: videos } });
    }
  };

  const testValue = () => {
    testChanges();
  };
  //TODO: Funkar inte med checkboxarna, lös. Den blir inverterad mot vad som visas på skärm
  const handleCheckboxes = (type) => {
    console.log(type);
    setYoutubeInfo({ ...ytbInfo, [type]: !ytbInfo[type] });
    console.log(ytbInfo);
    setSettings({ ...settings, youtubeSettings: { ...settings.youtubeSettings, youtubeVideoInfo: ytbInfo } });
  };

  return (
    <>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Youtube Settings
          <Button variant="outlined" onClick={() => testValue()}>
            {' '}
            Test Changes
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Change the number of imported videos</DialogContentText>
        <Typography gutterBottom>Number of videos</Typography>
        <Slider
          value={videos}
          onChange={(e, val) => handleChange(e, val)}
          valueLabelDisplay="auto"
          marks={marks(3, 18)}
          step={1}
          min={3}
          max={18}
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText>Other options</DialogContentText>
        <FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={ytbInfo.showTitle} onChange={() => handleCheckboxes('showTitle')} name="channel" />
              }
              label="Show the video title"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ytbInfo.showChannel}
                  onChange={() => handleCheckboxes('showChannel')}
                  name="channel"
                />
              }
              label="Show channel name"
            />
            <FormControlLabel
              control={
                <Checkbox checked={ytbInfo.showViews} onChange={() => handleCheckboxes('showViews')} name="views" />
              }
              label="Show views"
            />

            <FormControlLabel
              control={
                <Checkbox checked={ytbInfo.showUpload} onChange={() => handleCheckboxes('showUpload')} name="upload" />
              }
              label="Show upload time"
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
    </>
  );
}