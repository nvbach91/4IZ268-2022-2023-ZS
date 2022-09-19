$(document).ready(() => {
    const myChart = $('#myChart').get(0);
    const canvasContext = myChart.getContext('2d');

    new Chart(canvasContext, {
        type: 'bar',
        data: {
            labels: ['jaro', 'leto', 'podzim', 'zima'],
            datasets: [
                {
                    data: [469, 124, 333, 664],
                    backgroundColor: [
                        'red',
                        'green',
                        'blue',
                        'purple',
                    ],
                    yAxisID: 'y',
                },
                {
                    data: [562, 224, 933, 464],
                    backgroundColor: [
                        'pink',
                        'yellow',
                        'orange',
                        'black',
                    ],
                    yAxisID: 'y2',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    });
});