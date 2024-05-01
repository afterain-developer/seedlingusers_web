import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CloseButton = ({ title = 'CANCEL', state, to }) => {
    const { t } = useTranslation()
    return (
        <Link to={to} state={state}>
            <Button variant="contained" type='rest' sx={{ ml: 2, textTransform: "none" }}> {t(title)} </Button>
        </Link>
    )
}

export default CloseButton