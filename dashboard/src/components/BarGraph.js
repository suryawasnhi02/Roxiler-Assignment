import { months } from "../services/config";
import { CChart } from '@coreui/react-chartjs';

export function BarGraph({ selectedMonth, barData }) {
    return (
        <CChart
            className="mt-5"
            type="bar"
            data={{
                labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'],
                datasets: [
                    {
                        label: `Bar Chat Status ${months[selectedMonth]}`,
                        backgroundColor: '#f87979',
                        data: barData,
                    },
                ],
            }}

        />
    )
}