import { Box, Card, CardActions, Hidden, Icon, makeStyles, Popover, Typography } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SettingsContext } from '../../../Context/SettingsContext';
import { openInNewTab } from '../../helperFunctions';
import Image from '../../Image/Image';

const useStyles = makeStyles({
  articleText: {
    paddingRight: '12px',
    alignSelf: 'center',
  },
  iconContainer: {
    marginLeft: 'auto',
    alignSelf: 'center',
    display: 'inline-flex',
  },
  articleCard: {
    transition: 'none',
    borderRadius: 0,
    width: '100%',
    padding: '5px',
  },
  articleCardHover: {
    cursor: 'pointer',
    zIndex: 2,
    position: 'relative',
    padding: '4px',
    boxShadow:
      '0px 2px 3px -1px rgba(0,0,0,0.2), 0px -2px 3px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12), inset 0 0 0 1px #f1f1f1',
  },
  articleListItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  articleListItemText: {
    marginLeft: '0.25em',
    width: 'auto',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  articleListItemTextGray: {
    color: 'gray',
    fontWeight: '300',
    marginLeft: '0.25em',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    borderRadius: 0,
  },
  popoverTitleWrapper: {
    padding: 5,
    maxHeight: 140,
    minHeight: 140,
    overflow: 'hidden',
  },
  popoverTitleContainer: {
    display: 'flex',
    marginBottom: 5,
  },
  popoverTitleText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  popoverContentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  popoverContentInnerContainer: {
    width: 'calc(50% - 2.5px)',
  },
  popoverContentImage: {
    maxHeight: 110,
    width: 'auto',
    maxWidth: '100%',
  },
});

export default function RssCard({
  title,
  src,
  url,
  date,
  content,
  rssRef,
  anchorOriginHorizontal,
  anchorOriginVertical,
  margin,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentWidth, setCurrentWidth] = useState(rssRef.current.clientWidth);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handlePopoverOpen = (event) => {
    setAnchorEl(rssRef.current);
  };

  const open = Boolean(anchorEl);

  return (
    <Card
      aria-haspopup="true"
      className={` ${classes.articleCard} ${open && classes.articleCardHover} 
        `}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}>
      <Typography variant="body2" component="div">
        <Box className={classes.articleText} onClick={() => openInNewTab(url)}>
          <div className={classes.articleListItem}>
            <Box fontWeight={'fontWeightBold'}>{date + ':'}</Box>
            <Box component="a" className={classes.articleListItemText}>
              <strong>{title}</strong>
              <span className={classes.articleListItemTextGray}>{content}</span>
            </Box>

            {open && (
              <div className={classes.iconContainer}>
                <OpenInNew style={{ fontSize: '1.2em' }} />
              </div>
            )}
          </div>
        </Box>
      </Typography>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        style={{ margin: margin }}
        elevation={18}
        open={open}
        anchorEl={anchorEl}
        classes={{
          paper: classes.paper,
        }}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <div className={classes.popoverTitleWrapper} style={{ width: currentWidth - 10 }}>
          <Typography variant="body1" className={classes.popoverTitleContainer}>
            <Box
              component="span"
              className={classes.popoverTitleText}
              fontWeight={'fontWeightBold'}
              style={{ width: currentWidth - 10 }}>
              {title}
            </Box>
          </Typography>
          <div className={classes.popoverContentContainer}>
            <div className={classes.popoverContentInnerContainer}>
              {src ? (
                <img src={src} className={classes.popoverContentImage} alt={title} />
              ) : (
                <img src={require('./aftonbladet.jpg')} className={classes.popoverContentImage} alt={title} />
              )}
            </div>
            <div className={classes.popoverContentInnerContainer}>
              <Typography variant="caption">{content}</Typography>
            </div>
          </div>
        </div>
      </Popover>
    </Card>
  );
}