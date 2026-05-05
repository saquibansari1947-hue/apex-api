const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const APEX_URL = "https://apex.oracle.com/ords/saanifitness/emp/list";

app.get("/employees", async (req, res) => {
    try {
        const response = await fetch(APEX_URL);
        const data = await response.json();

        res.json({
            data: data.items
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});