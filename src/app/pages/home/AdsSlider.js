import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'app/style/slider.css';

import { Box, IconButton, Typography } from '@mui/material';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const AdsSlider = ({ adsList }) => {
    const settings = {
        dots: true,
        fade: true,
        waitForAnimate: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        slickNext: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const imageStyle = {
        zIndex: -10,
        height: "600px",
        display: "block",
        justifyContent: "center",
        alignItems: "center",
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <IconButton
                sx={{
                    zIndex: 50,
                    color: "#fff",
                    position: "absolute",
                    top: "45%",
                    right: "10px"
                }}
                onClick={onClick} aria-label="next" >
                <KeyboardArrowRightIcon style={{ fontSize: 50 }} />
            </IconButton>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <IconButton

                sx={{
                    zIndex: 50,
                    color: "#fff",
                    position: "absolute",
                    top: "45%",
                    left: "10px"
                }}
                onClick={onClick} aria-label="prev" >
                <KeyboardArrowLeftIcon style={{ fontSize: 50 }} />
            </IconButton>
        );
    }

    return (
        <Slider {...settings}>
            {
                adsList && adsList?.length > 0 && adsList.map((item, key) => {
                    return (
                        <>
                            <Box key={key} sx={{ display: "relative", borderRadius: 10 }}>
                                <Box sx={{
                                    borderEndEndRadius: 40,
                                    borderEndStartRadius: 40,
                                    color: "#fff",
                                    position: "absolute",
                                    bottom: "0", left: "50%",
                                    transform: "translate(-50%, -0%)",
                                    background: "rgba(0, 0, 0, 0.7)",
                                    width: '100%'
                                }}>
                                    <Typography sx={{ fontSize: "40px", margin: "0", color: "#feb800", textAlignLast: "center" }}>{item?.adName || ''}</Typography>
                                    <Typography sx={{ fontSize: "20px", margin: "0", color: "#fff", textAlignLast: "center" }}>{item?.productName}</Typography>
                                    <Typography sx={{ fontSize: "15px", margin: "10px 0", color: "#fff", textAlignLast: "center" }}>
                                        {item?.city || ''} {item?.province || ''}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    ...imageStyle,
                                    borderRadius: 10,
                                    background: `url(${item?.adImage}) center/cover no-repeat`
                                }} />
                            </Box>

                        </>
                    )
                })
            }
        </Slider>
    );
};

export default AdsSlider;
