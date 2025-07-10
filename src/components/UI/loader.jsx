const Loader = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-900 flex-col'>
			<div className='w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></div>
			<p className='text-yellow-400 mt-3'>Loading...</p>
		</div>
	);
};
export default Loader;
