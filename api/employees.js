export default async function handler(req, res) {
    try {
        const response = await fetch("https://apex.oracle.com/ords/saanifitness/emp/list", {
            headers: {
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://apex.oracle.com/"
            }
        });

        if (!response.ok) {
            return res.status(500).json({
                error: "Failed to fetch APEX",
                status: response.status
            });
        }

        const data = await response.json();

        res.status(200).json({
            success: true,
            data: data.items
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}