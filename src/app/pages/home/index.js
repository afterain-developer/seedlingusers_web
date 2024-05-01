import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { weatherFetchAPI, dailyFetchAPI, adsFetchListAPI } from 'app/services/home-services'
import { farmFetchListAPI } from 'app/services/preferences/farm-manager-services'
import AirIon from '@mui/icons-material/Air'
import FilterSelectFarm from 'app/Component/Input/Filters/FilterSelectFarm'
import { ADS_FETCH, FETCH_FARM, FETCH_FARM_RECORDS } from '@jumbo/constants/ActionTypes'
import GrassIcon from '@mui/icons-material/Grass';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import { useNavigate } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AdsSlider from './AdsSlider';
import { Girl } from '@mui/icons-material'

const Index = () => {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [singleDay, setSingleDay] = useState({})
    const [weekWeather, setWeekWeather] = useState([])
    const [adsList, setAdsList] = useState([])
    const [flag, setFlag] = useState(false)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const videosArray = ["01d", "01n", "02d", "02n", "03d_04d", "03d", "03n_04n", "09d_10d", "09d_10n", "011d_11n", "13d", "13n", "50d", "50n", "day", "night"]
    const { farmId, farmName, farmAddress, isMain, FarmDetails, FarmRecord } = useSelector((state) => state.FarmReducer)
    if (!farmId) {
        const tempFarm = JSON.parse(localStorage.getItem('farm'))
        if (tempFarm?.farmId) {
            dispatch({
                type: FETCH_FARM,
                farmId: tempFarm?.farmId,
                farmName: tempFarm?.farmName || '',
                farmAddress: tempFarm?.address || '',
                isMain: tempFarm["FarmUsers.isMain"],
                payload: tempFarm
            })

        } else {
            navigator('/admin/login')
            localStorage.clear()
        }
    }
    useEffect(() => {
        if (FarmRecord.length <= 0) {
            dispatch(farmFetchListAPI((res) => {
                dispatch({ type: FETCH_FARM_RECORDS, payload: res });
            }))
        }
        setFlag(false)
        dispatch(weatherFetchAPI({ lat: FarmDetails?.lat, long: FarmDetails?.long }, (res) => {
            setSingleDay({
                weatherData: res,
                dayTemp: res?.main?.temp?.toFixed(),
                weatherType: res?.weather[0]?.main,
                weatherDescription: res?.weather[0]?.description,
                cityName: res?.name,
                tempMax: res?.main?.temp_max?.toFixed(),
                tempMin: res?.main?.temp_min?.toFixed(),
                humidity: res?.main?.humidity?.toFixed(),
                windSpeed: res?.wind?.speed?.toFixed(),
                weatherIcon: res?.weather[0]?.icon,
                loading: false,
            });
            setFlag(true)
        }))

        dispatch(dailyFetchAPI({ lat: FarmDetails?.lat, long: FarmDetails?.long }, (res) => {
            const temp = []
            res?.list?.map((item) => {
                temp.push({
                    day: daysOfWeek[new Date(item?.dt * 1000).getDay()],
                    temp: parseInt(item.temp.eve),
                    tempMin: parseInt(item.temp.min),
                    tempMax: parseInt(item.temp.max),
                    icon: item.weather[0]?.icon,
                    humidity: parseInt(item?.humidity),
                    speed: parseInt(item?.speed)
                })
            })
            setWeekWeather(temp);
        }))
    }, [farmId, i18n?.language])

    useEffect(() => {
        dispatch(adsFetchListAPI((res) => {
            setAdsList(res);
            dispatch({ type: ADS_FETCH, payload: res });
        }))
    }, [])

    const SelectFarm = (selectFarmId) => {
        let Select = FarmRecord.filter((farm) => farm?.farmId === selectFarmId)[0]
        localStorage.setItem('farmId', Select?.farmId)
        localStorage.setItem('farm', JSON.stringify(Select))
        dispatch({
            type: FETCH_FARM,
            farmId: Select?.farmId,
            farmName: Select?.farmName || '',
            farmAddress: Select?.address || '',
            isMain: Select["FarmUsers.isMain"],
            payload: Select
        })
    }


    return (
        <>


            <div style={{
                alignSelf: "flex-end",
                marginBottom: 10
            }}>
                <FilterSelectFarm
                    width={"100%"}
                    defaultValues={[{ farmId: farmId, farmName: farmName }]}
                    title="filter"
                    labelKey={"farmName"}
                    valueKey={"farmId"}
                    MenuList={FarmRecord}
                    callAction={SelectFarm}
                />
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={8}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        borderRadius: "40px",
                        // padding: "15px",
                        // background: 'linear-gradient(to bottom,rgba(196, 242, 168, 0.3) , rgba(158,240, 85, 0.35) )',
                    }}>

                        <Box sx={{ color: '#fff', zIndex: 1 }}>
                            <Card sx={{
                                background: 'linear-gradient(to bottom,rgba(186, 216, 242, 0.1) , rgba(174,199, 240, 0.1) )',
                                backdropFilter: 'blur(30px)',
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 15px', borderRadius: '30px', color: '#FFF',
                                position: "relative",
                                zIndex: 1
                            }}>
                                {
                                    // console.log(singleDay?.weatherIcon,  , "@@@2")
                                }
                                {
                                    flag &&
                                    <video video loop muted autoPlay style={{ width: '100%', height: 'auto', position: "absolute", zIndex: -5 }}>
                                        <source src={`/videos/${videosArray.filter(item => item === singleDay?.weatherIcon).length > 0 ? singleDay?.weatherIcon : "day" || "01d"}.mp4`} type="video/mp4" />
                                    </video>

                                }


                                <div style={{
                                    // width: '100%',
                                    backdropFilter: 'blur(5px)',
                                    display: "flow-root",
                                    background: 'linear-gradient(to bottom,rgba(186, 216, 242, 0.1) , rgba(174,199, 240, 0.1) )',
                                }}>

                                    <CardMedia>
                                        <Typography variant="h1" sx={{
                                            textAlign: 'center',
                                            marginTop: '10px',
                                            color: '#FFF',
                                            fontSize: '26px'
                                        }}>{singleDay?.cityName}</Typography>
                                        <Typography variant="h4" sx={{ textAlign: 'center', color: '#FFF' }}>{singleDay?.weatherDescription}</Typography>
                                    </CardMedia >

                                    <CardMedia
                                        component="img"
                                        image={`/images/weather/png/${singleDay?.weatherIcon}.png`} // Replace with your image path
                                        alt={singleDay?.weatherDescription}
                                        sx={{ height: 80, width: 80, mx: 'auto' }}
                                    />

                                    <CardContent sx={{ textAlign: 'center' }}>

                                        <Typography variant="h5" color='#FFF' sx={{ fontSize: 40 }}>
                                            {singleDay?.dayTemp}°C
                                        </Typography>
                                        <div style={{ display: 'flex', placeContent: "center" }}>
                                            <div style={{ marginRight: "150px" }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}><DeviceThermostatIcon />{singleDay?.tempMax}°C</Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}><InvertColorsIcon />{singleDay?.humidity}%</Typography>
                                            </div>

                                            <div >
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}><DeviceThermostatIcon />{singleDay?.tempMin}°C</Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}><AirIon />{singleDay?.windSpeed} m/s</Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </Box>


                    </div >
                </Grid >
                <Grid item xs={12} md={6} lg={4}>
                    <div style={{
                        position: "relative",
                        borderRadius: "40px",
                        // padding: "15px",
                        // background: 'linear-gradient(to bottom,rgba(168, 227, 106, 0.65) , rgba(85,159, 6, 1) )',
                        // background: 'linear-gradient(to bottom,rgba(196, 242, 168, 0.3) , rgba(158,240, 85, 0.35) )',
                    }}
                        onClick={() => { navigator("/seedling/preferences/farm-manager/edit", { state: { ...FarmDetails, backToHome: true } }) }}>
                        <Avatar
                            variant="rounded"
                            sx={{ width: '100%', height: 320, borderRadius: "30px", }}
                            src={FarmDetails?.farmImage}
                        >
                            <GrassIcon sx={{ width: 200, height: 200, }} />
                        </Avatar>
                        {/* FarmDetails */}


                        <div style={{
                            bottom: 0,
                            zIndex: 10,
                            position: "absolute",
                            width: '100%',
                            background: "#00000099",
                            borderEndEndRadius: 27,
                            borderEndStartRadius: 27

                        }}>
                            <Typography sx={{ marginY: 1, padding: 0, textAlign: "center", color: "#fff", }} variant={"h4"}>
                                {FarmDetails?.farmName || ""}
                            </Typography>
                            <Typography sx={{ marginY: 1, padding: 0, textAlign: "center", color: "#fff", }} variant={"h6"}>
                                <LocationOnIcon fontSize='small' />    {FarmDetails?.city || ''},{FarmDetails?.province || ""}
                            </Typography>
                        </div>

                        {isMain == 1 &&
                            <span
                                style={{
                                    position: "absolute",
                                    background: "rgb(113, 190, 61)",
                                    top: "0px",
                                    right: "0px",
                                    // left: "-0px",
                                    fontSize: "12px",
                                    padding: "5px 15px",
                                    borderRadius: "5px",
                                    color: "white",
                                }}
                            >{t("MAIN")}</span>
                        }
                    </div>

                </Grid>
            </Grid >

            <div
                style={{
                    borderRadius: "40px",
                    padding: "15px",
                    width: "100%",
                    margin: "30px auto",
                    background: 'linear-gradient(to bottom,rgba(168, 227, 106, 0.65) , rgba(158,240, 85, 0.35))',
                }}>


                <Grid container
                    sx={{
                        padding: "15px",
                        borderRadius: "30px",
                        background: 'linear-gradient(to bottom, rgba(168, 227, 106, 0.65) , rgba(85,159, 6, 1))',
                    }}>
                    {
                        weekWeather.map((item, key) => {
                            return (
                                <Grid item sm={1.5}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>

                                        <Typography variant={"h3"} sx={{ marginY: 1, textAlign: "center", color: "#fff" }}>
                                            {t(item?.day) || ""}
                                        </Typography>
                                        <img
                                            style={{ width: 40, margin: 'auto' }}
                                            src={`/images/weather/png/${item?.icon}.png`}
                                            alt={item?.icon}
                                        />
                                        <Typography variant={"h5"} sx={{ marginY: 1, textAlign: "center", color: "#fff" }}>
                                            {item?.temp || ""}°C
                                        </Typography>
                                        <Typography variant={"h5"} sx={{ marginY: 1, textAlign: "center", color: "#fff" }}>
                                            {item?.humidity || ""}%
                                        </Typography>
                                    </div>
                                </Grid>
                            )
                        })
                    }
                </Grid >
            </div>
            {/* <AdsSlider adsList={adsList} /> */}
        </>
    )
}

export default Index