const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const APEX_URL = "https://apex.oracle.com/ords/saanifitness/emp/list";

app.get("/employees", async (req, res) => {
    try {
        const response = await fetch(APEX_URL, {
            headers: {
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Referer": "https://apex.oracle.com/",
                "Origin": "https://apex.oracle.com"
            }
        });

        const text = await response.text();

        // 👇 Debug (agar HTML aaya to pakad lega)
        if (text.startsWith("<")) {
            return res.status(500).json({
                error: "APEX returned HTML (blocked)",
                response: text.substring(0, 200)
            });
        }

        const data = JSON.parse(text);

        res.json({
            success: true,
            count: data.items.length,
            data: data.items
        });

    } catch (err) {
        res.status(500).json({
            error: "Server error",
            message: err.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});