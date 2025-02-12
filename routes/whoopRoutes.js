import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/sleep-data', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const response = await fetch(
            `${process.env.WHOOP_API_HOSTNAME}/developer/v1/user/cycle`,
            {
                headers: { Authorization: `Bearer ${req.user.accessToken}` },
            }
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sleep data' });
    }
});

export default router;
