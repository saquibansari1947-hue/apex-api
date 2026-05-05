const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const APEX_URL = "https://apex.oracle.com/ords/saanifitness/emp/list";

app.get("/employees", async (req, res) => {
    try {
        const response = await fetch(APEX_URL, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0"
            }
        });

        // ❗ status check
        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch APEX",
                status: response.status
            });
        }

        const contentType = response.headers.get("content-type");

        // ❗ ensure JSON response
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            return res.status(500).json({
                error: "APEX returned non-JSON",
                contentType: contentType,
                preview: text.substring(0, 200)
            });
        }

        const data = await response.json();

        res.json({
            success: true,
            count: data.items.length,
            data: data.items
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});