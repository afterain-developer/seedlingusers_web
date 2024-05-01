import React from 'react'
import { styled } from '@mui/system';
import { TextareaAutosize as BaseTextareaAutosize, } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useTranslation } from 'react-i18next';

const blue = {
  100: '#DAECFF',
  200: '#92d050',
  400: '#92d050',
  500: '#007FFF',
  600: '#92d050',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
const TextareaCompleted = styled(BaseTextareaAutosize)(
  ({ theme, error }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    border-color: ${error ? '#d32f2f' : theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    
    &:hover {
      border-color: ${error ? '#d32f2f' : '#000'};
    }

    &:focus {
      border-color: ${error ? '#d32f2f' : blue[400]};
      border: ${error ? '2px solid #d32f2f' : `2px solid ${blue[600]}`};
    }

    &::placeholder {
      color: ${error ? '#d32f2f' : grey[600]};
      font-size: 14px
    }

    &:focus-visible {
      outline: 0;
    }
  `,
);

const Textarea = ({ formik, label, field, minRows = 3, ...props }) => {
  const handleChange = (event) => {
    formik.setFieldValue(field, event.target.value);
  };
  const { t } = useTranslation();
  return (
    <>

      <TextareaCompleted
        aria-label={label}
        minRows={minRows}
        onChange={handleChange}
        value={formik.values[field]}
        onBlur={formik.handleBlur(field)}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        {...props}
      />
      <ErrorMessage name={field}>
        {(msg) => <div style={{ color: '#d32f2f', fontSize: "12px", marginLeft: '15px' }}>{t(msg)}</div>}
      </ErrorMessage>
    </>
  )
}

export default Textarea