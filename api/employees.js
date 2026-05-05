export default async function handler(req, res) {
    const APEX_URL = "https://apex.oracle.com/ords/saanifitness/emp/list";

    try {
        const response = await fetch(APEX_URL, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://apex.oracle.com/",
                "Origin": "https://apex.oracle.com"
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch APEX",
                status: response.status
            });
        }

        const data = await response.json();

        return res.status(200).json({
            success: true,
            count: data.items.length,
            data: data.items
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}