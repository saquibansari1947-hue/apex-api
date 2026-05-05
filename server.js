const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const APEX_URL = "https://apex.oracle.com/ords/saanifitness/emp/list";

app.get("/employees", async (req, res) => {
    try {
        const response = await fetch(APEX_URL, {
            headers: {
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0"
            }
        });

        const text = await response.text();

        // DEBUG (important)
        if (text.startsWith("<")) {
            return res.status(500).json({
                error: "APEX returned HTML instead of JSON",
                hint: "Check APEX privilege or URL",
                response: text.substring(0, 200)
            });
        }

        const data = JSON.parse(text);

        res.json({
            data: data.items
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});