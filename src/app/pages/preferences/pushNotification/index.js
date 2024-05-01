import { Grid, LinearProgress, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import MainCard from 'app/Component/Cards/MainCard'
import TextFieldForm from 'app/Component/Input/Forms/TextFieldForm'
import * as yup from 'yup';
import styled from "@mui/material/styles/styled";
import Div from '@jumbo/shared/Div'
import { lightenColor } from 'app/config/colorChange'





const Index = () => {
    const handleSubmit = (values) => {
        console.log(values, "valuesvaluesvalues");
    }
    const StyledLinearProgress = styled(LinearProgress)(({ colorValue, backgroundColor }) => ({
        '& .MuiLinearProgress-bar': {
            backgroundColor: colorValue,
        },
        '&.MuiLinearProgress-root': {
            backgroundColor: backgroundColor || 'transparent', // Set the overall background color
        },
        height: 6,
        borderRadius: 5,
        flex: 1,
    }));


    function calculatePercentageOfDay(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const totalMinutesInDay = 24 * 60;
        const percentageOfDay = (totalMinutes / totalMinutesInDay) * 100;
        return percentageOfDay.toFixed(1);
    }
    const siteAudiences = [
        { label: 'label1', value: calculatePercentageOfDay("08:00"), color: '#f39711' },
        { label: 'label2', value: calculatePercentageOfDay("04:00"), color: '#e44a77' },
        { label: 'label3', value: calculatePercentageOfDay("04:30"), color: '#3bd2a2' },
    ];

    return (
        <MainCard>
            {/* <Formik
                initialValues={{
                    title: '',
                    discription: '',
                }}
                validationSchema={yup.object().shape({
                    title: yup
                        .string()
                        .required('titleisrequired'),
                    discription: yup
                        .string()
                        .required('descriptionisrequired'),
                })}
                onSubmit={handleSubmit}>
                {
                    (formik) => {
                        return (
                            <Form noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12} >
                                        <TextFieldForm
                                            formik={formik}
                                            field={"title"}
                                            label={"subject"}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} >
                                        <TextFieldForm
                                            formik={formik}
                                            field={"discription"}
                                            label={"Discription"}
                                            multiline
                                            rows={20}
                                            maxRows={0}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }
                }
            </Formik> */}


            <Typography variant={"h5"}>Site Audience</Typography>
            {
                siteAudiences.map((item, index) => (
                    <React.Fragment key={index}>
                        <Typography variant={'body1'} color={'text.secondary'}>{item.label}</Typography>
                        <Div
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: .5
                            }}
                        >
                            <StyledLinearProgress
                                variant="determinate"
                                value={item?.value}
                                colorValue={item?.color}
                                backgroundColor={lightenColor(item.color, 0.7) || "#eee"}
                            />
                            <Typography
                                variant={'body1'}
                                color={'text.secondary'}
                                ml={1}
                            >{`${item.value}%`}</Typography>
                        </Div>
                    </React.Fragment>
                ))
            }

        </MainCard>
    )
}
export default Index