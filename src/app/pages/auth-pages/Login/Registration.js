import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MainCard from 'app/Component/Cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
export default function Registration({ open, handleClose, handleAgree, title }) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{"You're not a member"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You're a new here. Would you like to register?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree} >Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}