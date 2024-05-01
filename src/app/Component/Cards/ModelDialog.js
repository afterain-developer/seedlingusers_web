import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import MainCard from '../Cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';

import { IconButton } from '@mui/material';
export default function ModalDialog({ open, handleClose, children, title }) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <MainCard title={title}
                    headerStyle={{ padding: "5px 20px", margin: 0 }}
                    button={
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon fontSize='sm' />
                        </IconButton>
                    }
                >
                    {children}
                </MainCard>
            </Dialog>
        </React.Fragment>
    );
}