import React, { useRef } from 'react'
import { Avatar, Badge, FormHelperText, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import GrassIcon from '@mui/icons-material/Grass';
import { lightenColor } from 'app/config/colorChange';
import { ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

const ImageForm = ({ formik, field, imageReturn, heightWidth = 180, variant = "rounded", main, color = "#017C07" }) => {
    const { t } = useTranslation()
    const IconHeightWidth = heightWidth / 1.5
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const themeColor = color
    const lightColor = lightenColor(themeColor, 0.9)
    return (
        <div style={{ textAlign: "center" }}>
            <input
                type="file"
                ref={fileInputRef}
                id={field}
                name={field}
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
                onChange={(event) => {
                    imageReturn(event.target.files[0]);
                    formik.handleChange(event);
                    formik.setFieldValue(field, URL.createObjectURL(event.target.files[0]))
                }}
            />

            <Badge style={{ position: 'relative' }}>
                <Avatar
                    variant={variant}
                    sx={{
                        width: heightWidth, height: heightWidth,
                        background: lightColor,
                        border: formik.errors[field] ? '1px solid red' : '0px solid transparent',

                    }}
                    src={formik?.values[field]}
                    onClick={handleButtonClick}>
                    <GrassIcon sx={{ width: IconHeightWidth, height: IconHeightWidth, color: formik.errors[field] ? "red" : themeColor }} />
                </Avatar>
                {
                    main
                }
                <IconButton
                    onClick={handleButtonClick}
                    sx={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        transition: 'all 0.3s',
                        boxShadow: 1,
                        color: '#fff',
                        backgroundColor: '#92d050',
                        '&:hover ': {
                            color: '#92d050',
                            backgroundColor: '#fff',
                        }
                    }}>
                    <CameraAltIcon />
                </IconButton>
            </Badge>
            <ErrorMessage name={field}>
                {(msg) => <FormHelperText style={{ textAlign: "center" }} error>{t(msg)}</FormHelperText>}
            </ErrorMessage>
        </div>
    )
}

export default ImageForm