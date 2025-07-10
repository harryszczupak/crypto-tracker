import { useQuery } from '@tanstack/react-query';
import Loader from '../components/UI/loader';
import { useParams } from 'react-router-dom';
import api from '../api/axios'; // Twój axios z baseURL do CoinGecko
import ChartComponent from '../components/Chart';
const Detail = () => {
	const { id } = useParams();
	const { data, isLoading, error } = useQuery({
		queryKey: ['coinDetail', id],
		queryFn: async () => {
			const response = await api.get(`/coins/${id}`, {
				params: {
					localization: false,
					tickers: false,
					market_data: true,
					community_data: false,
					developer_data: false,
					sparkline: false,
				},
			});
			return response.data;
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	if (isLoading) return <Loader />;
	if (error) return <div>Error loading coin details</div>;
	return (
		<div className='bg-gray-900 min-h-screen text-white p-4 flex flex-col items-center'>
			<div className='w-full mx-auto h-screen flex justify-center pt-20'>
				<div className='flex w-8/12 space-x-20'>
					<div className='w-1/3 flex flex-col items-center'>
						<h1 className='text-5xl font-bold text-yellow-400 mb-4'>
							{data.name}
						</h1>
						<img
							src={data.image.large}
							alt={data.name}
							className='w-42 h-42 mb-6'
						/>
					</div>

					<div className='w-full flex  justify-center'>
						<ChartComponent />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Detail;
