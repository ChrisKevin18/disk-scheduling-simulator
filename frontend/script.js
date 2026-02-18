let chart;

async function calculate() {

    const errorElement = document.getElementById("error");
    errorElement.innerText = "";

    const requestInput = document.getElementById("requests").value.trim();
    const headInput = document.getElementById("head").value.trim();

    if (!requestInput || !headInput) {
        errorElement.innerText = "⚠ Please enter both request sequence and head position.";
        return;
    }

    const requests = requestInput.split(",").map(Number);
    const head = Number(headInput);

    if (requests.some(isNaN) || isNaN(head)) {
        errorElement.innerText = "⚠ Only numeric values are allowed.";
        return;
    }

    if (requests.some(r => r < 0 || r > 199)) {
        errorElement.innerText = "⚠ Request values must be between 0 and 199.";
        return;
    }

    if (head < 0 || head > 199) {
        errorElement.innerText = "⚠ Head position must be between 0 and 199.";
        return;
    }

    const response = await fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requests, head })
    });

    const data = await response.json();

    generateTable(data);
    createChart(data);
}


function generateTable(data) {

    const tbody = document.querySelector("#resultTable tbody");
    tbody.innerHTML = "";

    const minValue = Math.min(...Object.values(data));

    for (let algo in data) {
        const row = document.createElement("tr");

        if (data[algo] === minValue) {
            row.classList.add("best");
        }

        row.innerHTML = `
            <td>${algo}</td>
            <td>${data[algo]}</td>
            <td>${data[algo] === minValue ? "Best Performance" : "-"}</td>
        `;

        tbody.appendChild(row);
    }
}

function createChart(data) {

    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: "Total Head Movement",
                data: Object.values(data),
                backgroundColor: [
                    "#00d4ff",
                    "#00ffb3",
                    "#ff4c4c",
                    "#9b59b6",
                    "#f39c12",
                    "#1abc9c"
                ]
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Algorithm Comparison",
                    color: "white"
                }
            },
            scales: {
                x: {
                    ticks: { color: "white" }
                },
                y: {
                    ticks: { color: "white" },
                    beginAtZero: true
                }
            }
        }
    });
}
