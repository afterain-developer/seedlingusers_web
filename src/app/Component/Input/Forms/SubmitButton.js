import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const SubmitButton = ({ title = 'SAVE', ...props }) => {
    const { t } = useTranslation()
    return (
        <Button
            type='submit'
            variant="contained"
            sx={{ textTransform: "none" }}
            {...props}>
            {t(title)}
        </Button>
    )
}

export default SubmitButton