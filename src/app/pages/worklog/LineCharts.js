import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import offlineExporting from 'highcharts/modules/offline-exporting';
import * as HighchartsExportData from 'highcharts/modules/export-data';

exporting(Highcharts);
offlineExporting(Highcharts);
HighchartsExportData(Highcharts);
const LineCharts = ({ categories, values, title, titleValue }) => {


    const chartOptions = {
        title: {
            text: title || 'Line Chart'
        },
        xAxis: {
            categories: categories,
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: titleValue || 'Total Count / Day'
            }
        },
        legend: {
            verticalAlign: 'top',
        },
        series: [
            {
                data: values,
                type: 'line',
                name: title
            }
        ],
        legend: {
            verticalAlign: 'top',
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: [
                        'printChart',
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG',
                        'separator',
                        'downloadCSV',
                        'downloadXLS',
                        'viewData'
                    ]
                }
            }
        },
    };


    return (
        <>
            <div style={{ marginTop: 5 }}>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
        </>
    )
}

export default LineCharts