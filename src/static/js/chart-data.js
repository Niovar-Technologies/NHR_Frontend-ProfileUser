'use strict';

$(document).ready(function () {

    function generateData(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
            ;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }


    //Pie Chart

    var pieCtx = document.getElementById("invoice_chart"),
        pieConfig = {
            colors: ['#DC3545', '#FFC107', '#00882E', '#0097ED'],
            series: [55, 40, 20, 10],
            chart: {
                width: 280,
                height: 200,
                type: 'donut',
            },
            labels: ['Paid', 'Unpaid', 'Overdue', 'Draft'],
            legend: {show: false},
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };


    //line chart

    var pieChart = new ApexCharts(pieCtx, pieConfig);
    pieChart.render();

    var options = {
        series: [{

            data: [20, 10, 60, 40, 50, 10, 60, 60, 66]
        }, {

            data: [20, 10, 60, 40, 50, 10, 60, 60, 66]
        }, {

            data: [20, 10, 60, 40, 50, 10, 60, 60, 66]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },

        fill: {
            opacity: 1,
            colors: ['#0097ED', '#FFC107', '#00882E'],
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();


//Polar Area Charts
    var pieCtxs = document.getElementById("polarchart"),
        pieConfigs = {
            series: [70, 85, 70, 40],

            chart: {
                width: 280,
                height: 345,
                type: 'polarArea'
            },
            labels: ['Business', 'Design', 'Development', 'Testing'],

            fill: {
                opacity: 1,
                colors: ['#00882E', '#0097ED', '#DC3545', '#FFC107'],
            },
            stroke: {
                width: 0,

            },
            yaxis: {
                show: false
            },
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 0
                    },
                    spokes: {
                        strokeWidth: 0
                    },
                }
            },
            theme: {
                monochrome: {
                    enabled: true,
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            }
        };
    var polarchart = new ApexCharts(pieCtxs, pieConfigs);
    polarchart.render();


    var options = {
        series: [44, 55, 13, 33],
        chart: {
            width: 380,
            type: 'donut',
        },
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
        }
    };
});