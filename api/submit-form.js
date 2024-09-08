const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '../data/data.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const data = req.body;

            // Read existing data
            let existingData = [];
            if (fs.existsSync(dataFilePath)) {
                existingData = JSON.parse(fs.readFileSync(dataFilePath));
            }

            // Append new data
            existingData.push(data);
            fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

            // Respond with a success message
            res.status(200).json({ message: 'Form submitted successfully!' });
        } catch (error) {
            // Handle errors
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Method Not Allowed
        res.status(405).json({ message: 'Method not allowed' });
    }
}
