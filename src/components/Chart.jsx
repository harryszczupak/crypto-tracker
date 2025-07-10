import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/UI/loader';
import moment from 'moment';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	TimeScale
);
const ChartComponent = () => {
	const { id } = useParams();
	const { data, isLoading, error } = useQuery({
		queryKey: ['coinChart', id],
		queryFn: async () => {
			const response = await api.get(`/coins/${id}/market_chart`, {
				params: {
					vs_currency: 'usd',
					days: '30',
					interval: 'daily',
				},
			});
			return response.data;
		},
		enabled: !!id, // Zapytanie będzie aktywne tylko jeśli id jest dostępne
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
	if (isLoading) return <Loader />;
	if (error) return <div>Error loading chart data</div>;
	const coinChartData = data.prices.map((price) => ({
		x: price[0],
		y: price[1].toFixed(2), // Zaokrąglanie do 2 miejsc po przecinku
	}));
	const options = {
		responsive: true,
	};
	const coinData = {
		labels: coinChartData.map((point) => moment(point.x).format('MMM D')),
		datasets: [
			{
				label: id || 'Coin Price',
				data: coinChartData.map((point) => point.y),
				borderColor: 'rgba(255, 206, 86, 1)',
				backgroundColor: 'rgba(255, 206, 86, 0.2)',
				fill: true,
				tension: 0.4,
			},
		],
	};
	return <Line data={coinData} options={options} />;
};
export default ChartComponent;
