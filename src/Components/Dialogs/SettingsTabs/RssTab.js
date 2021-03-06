import { DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

export default function RssTab({ setSettings, settings }) {
  const { useComponent } = settings.rssReaderSettings;
  const [inUse, setInUse] = useState(useComponent);

  const toggleComponent = (e) => {
    e.preventDefault();
    updateFirestoreCollection({
      rssReaderSettings: {
        ...settings.rssReaderSettings,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      rssReaderSettings: {
        ...settings.rssReaderSettings,
        useComponent: !inUse,
      },
    });

    setInUse(!inUse);
  };

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          labelPlacement="start"
          control={<Switch checked={inUse} onChange={toggleComponent} />}
          label={inUse ? 'Disable Component' : 'Enable Component'}
        />
      </div>
      <DialogTitle>Rss Reader Settings</DialogTitle>
      {inUse && (
        <DialogContent>
          <DialogContentText>No settings yet...</DialogContentText>
        </DialogContent>
      )}
    </>
  );
}
