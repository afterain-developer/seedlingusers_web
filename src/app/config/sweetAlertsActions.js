import React from "react";
import Swal from 'sweetalert2';

const sweetAlerts = (icon, message, theme) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });

    Toast.fire({
        icon: icon,
        title: message,
    });
};

const sweetAlertDelete = (title, text) => {
    const lg = localStorage.getItem('language')
    return Swal.fire({
        title: title || lg == 'en' ? 'Are you sure?' : '확실합니까?',
        text: text || lg == 'en' ? "You won't be able to revert this!" : '이 항목은 되돌릴 수 없습니다!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: lg == 'en' ? 'Yes, delete it!' : '응, 삭제해',
        cancelButtonText: lg == 'en' ? 'No, cancel!' : '아니요, 취소하세요!',
        confirmButtonColor: '#92d050',
        cancelButtonColor: 'red',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            return 'deleted';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return 'cancelled';
        }
    });
};

const sweetAlertQuestion = (title, text) => {
    const lg = localStorage.getItem('language')
    return Swal.fire({
        title: title || lg == 'en' ? 'Are you sure?' : '확실합니까?',
        text: text || lg == 'en' ? "You won't be able to revert this!" : '이 항목은 되돌릴 수 없습니다!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: lg == 'en' ? 'Yes, delete it!' : '응, 삭제해',
        cancelButtonText: lg == 'en' ? 'No, cancel!' : '아니요, 취소하세요!',
        confirmButtonColor: '#92d050',
        cancelButtonColor: 'red',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            return 'Yes';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return 'No';
        }
    });
};


export {
    sweetAlerts,
    sweetAlertDelete,
    sweetAlertQuestion
}