const express = require("express");
const cors = require("cors");
const algorithms = require("./algorithms");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
    const { requests, head } = req.body;

    const result = {
        FCFS: algorithms.fcfs(requests, head),
        SSTF: algorithms.sstf(requests, head),
        SCAN: algorithms.scan(requests, head),
        CSCAN: algorithms.cscan(requests, head),
        LOOK: algorithms.look(requests, head),
        CLOOK: algorithms.clook(requests, head)
    };

    res.json(result);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
