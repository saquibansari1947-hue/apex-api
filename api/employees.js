export default async function handler(req, res) {
    try {
        const response = await fetch("https://apex.oracle.com/ords/saanifitness/emp/list", {
            headers: {
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Referer": "https://apex.oracle.com/",
                "Origin": "https://apex.oracle.com"
            }
        });

        const text = await response.text();

        if (response.status !== 200) {
            return res.status(500).json({
                error: "Blocked by APEX",
                status: response.status,
                response: text.substring(0, 200)
            });
        }

        const data = JSON.parse(text);

        res.status(200).json({
            success: true,
            data: data.items
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}