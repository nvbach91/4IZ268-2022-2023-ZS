$(document).ready(() => {
    const canvas = $('#myChart');

    const canvasContext = canvas.get(0).getContext('2d');

    const myChart = new Chart(canvasContext, {
        type: 'bar',
        data: {
            labels: ['jaro', 'leto', 'podzim', 'zima'],
            datasets: [
                {
                    label: 'teplota Praha',
                    data: [10, 30, 20, -5],
                    backgroundColor: ['red', 'red', 'red', 'red'],
                    borderWidth: 5,
                },
                {
                    label: 'teplota Moskva',
                    data: [-10, 20, 0, -20],
                    backgroundColor: ['green', 'green', 'green', 'green'],
                    borderWidth: 5,
                },
                {
                    label: 'teplota blabla',
                    data: [-10, 20, 0, -20],
                    backgroundColor: ['blue', 'blue', 'blue', 'blue'],
                    borderWidth: 5,
                }
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});