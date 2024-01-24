import { Request, Response } from 'express';
import { getDashboardData } from '../services/admin.services';

export const getDashboardController = async (req: Request, res: Response) => {
    try {
        const dashboardData = await getDashboardData();

        return res.status(200).json({
            status: true,
            data: dashboardData
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while obtaining data from the dashboard."
        });
    }
}