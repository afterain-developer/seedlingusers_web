import { ADS_FETCH, ADS_NEXT } from '@jumbo/constants/ActionTypes';
import { Box, Typography } from '@mui/material';
import { adsFetchListAPI } from 'app/services/home-services';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

const AdsComponent = () => {
    const dispatch = useDispatch()
    const { adsList, flag, number } = useSelector((state) => state.AdsReducer)
    var num = number || 0
    const [data, setData] = useState({})

    useEffect(() => {
        const myFunction = () => {
            if (flag && adsList.length > 0 && adsList.length > num) {
                setData(adsList[num])
                num = num + 1
                dispatch({ type: ADS_NEXT, payload: num + 1 });
            } else if (flag && adsList.length > 0) {
                num = 0
                dispatch({ type: ADS_NEXT, payload: 0 });
            } else {
                num = 0
                setData([])
            }

        }
        myFunction();
        const intervalId = setInterval(myFunction, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {/* {
                flag && adsList.length > 0 && adsList.map((item, key) => {
                    return (
                        <div style={{ alignSelf: "center", marginBottom: "80px" }}>
                            <img src={item?.adImage} style={{ width: "200px" }} />
                        </div >
                    )
                })
            } */}

            {
                flag && adsList.length > 0 &&
                <div style={{ alignSelf: "center", marginBottom: "80px" }}>

                    <a href={data?.url} target="_blank" style={{ cursor: "pointer" }} >
                        <img src={data?.adImage} style={{ width: "200px" }} />
                    </a>
                </div >

            }
        </>
    )
}

export default AdsComponent