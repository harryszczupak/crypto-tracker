const Coin = ({ coin }) => {
	return (
		<li
			key={coin.id}
			className='flex items-center space-x-4 p-3 bg-gray-900 rounded-lg shadow hover:shadow-yellow-500/50 transition border-gray-700 border cursor-pointer'>
			<img
				src={coin.image}
				alt={coin.name}
				className='w-8 h-8 rounded-full'
				loading='lazy'
			/>
			<div>
				<p className='font-semibold text-lg text-yellow-400'>{coin.name}</p>
				<p className='text-gray-400 text-sm'>{coin.symbol.toUpperCase()}</p>
			</div>
			<div className='ml-auto font-mono font-semibold text-yellow-300'>
				${coin.current_price.toLocaleString()}
			</div>
		</li>
	);
};
export default Coin;
