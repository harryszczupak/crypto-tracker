import { useQuery } from '@tanstack/react-query';
import Loader from '../components/UI/loader';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
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

	const marketData = data.market_data;

	return (
		<div className='bg-gradient-to-b from-gray-900 to-black min-h-screen text-white px-6 py-10'>
			<div className='max-w-7xl mx-auto'>
				{/* Header + Chart */}
				<div className='flex flex-col md:flex-row items-center md:items-start md:space-x-20'>
					{/* Left column */}
					<div className='flex flex-col items-center md:items-start w-full md:w-1/3'>
						<img
							src={data.image.large}
							alt={data.name}
							className='w-36 h-36 object-contain mb-6 drop-shadow-md'
						/>
						<h1 className='text-4xl md:text-5xl font-bold text-yellow-400 mb-2 text-center md:text-left'>
							{data.name}
						</h1>
						<p className='text-gray-400 uppercase tracking-widest text-sm mb-4'>
							{data.symbol}
						</p>
					</div>

					{/* Chart */}
					<div className='w-full md:w-2/3 bg-gray-800 rounded-xl p-4 shadow-lg'>
						<ChartComponent />
					</div>
				</div>

				{/* Stats and Description */}
				<div className='mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10'>
					{/* Market Stats */}
					<div className='bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700'>
						<h2 className='text-2xl font-semibold mb-6 text-yellow-300'>
							📊 Market Statistics
						</h2>
						<ul className='space-y-3 text-lg'>
							<li>
								<span className='text-gray-400'>Price:</span>{' '}
								<span className='font-medium'>
									${marketData.current_price.usd.toLocaleString()}
								</span>
							</li>
							<li>
								<span className='text-gray-400'>Change (24h):</span>{' '}
								<span
									className={
										marketData.price_change_percentage_24h >= 0
											? 'text-green-400'
											: 'text-red-400'
									}>
									{marketData.price_change_percentage_24h.toFixed(2)}%
								</span>
							</li>
							<li>
								<span className='text-gray-400'>Market Cap:</span> $
								{marketData.market_cap.usd.toLocaleString()}
							</li>
							<li>
								<span className='text-gray-400'>Volume (24h):</span> $
								{marketData.total_volume.usd.toLocaleString()}
							</li>
							<li>
								<span className='text-gray-400'>Circulating Supply:</span>{' '}
								{marketData.circulating_supply.toLocaleString()}
							</li>
							{marketData.max_supply && (
								<li>
									<span className='text-gray-400'>Max Supply:</span>{' '}
									{marketData.max_supply.toLocaleString()}
								</li>
							)}
						</ul>
					</div>

					{/* Description */}
					<div
						className='relative bg-cover bg-center rounded-lg overflow-hidden shadow-md border border-gray-700'
						style={{
							backgroundImage:
								'url("https://images.unsplash.com/photo-1621415161326-167cb8ad1fdd?auto=format&fit=crop&w=1500&q=80")',
						}}>
						<div className='bg-black bg-opacity-80 h-full w-full p-6'>
							<h2 className='text-2xl font-semibold mb-6 text-yellow-300'>
								ℹ️ About This Project
							</h2>
							<div
								className='text-sm text-gray-300 leading-relaxed max-h-80 overflow-y-auto pr-2'
								dangerouslySetInnerHTML={{
									__html: data.description.en || 'No description available.',
								}}
							/>
						</div>
					</div>
				</div>

				{/* Project Link */}
				{data.links.homepage[0] && (
					<div className='mt-12 text-center'>
						<a
							href={data.links.homepage[0]}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition'>
							🌐 Visit {data.name}'s Website
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default Detail;
