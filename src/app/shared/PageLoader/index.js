import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  circularProgressRoot: {
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
  },
}));

const PageLoader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.circularProgressRoot}>
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;