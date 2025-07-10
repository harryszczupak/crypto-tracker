import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../api/axios'; // Twój axios z baseURL do CoinGecko
import CoinsList from '../components/CoinsList'; // Twój komponent listy coinów
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loader from '../components/UI/loader';
const HomePage = () => {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
	} = useInfiniteQuery({
		queryKey: ['homeData'],
		queryFn: async ({ pageParam = 1 }) => {
			const response = await api.get('/coins/markets', {
				params: {
					vs_currency: 'usd',
					order: 'market_cap_desc',
					per_page: 100,
					page: pageParam,
					sparkline: false,
				},
			});
			return response.data;
		},
		getNextPageParam: (lastPage, allPages) => {
			// Jeśli ostatnia strona ma mniej niż 100 coinów, to koniec stron
			if (lastPage.length < 100) return undefined;
			return allPages.length + 1; // następna strona to aktualna liczba stron + 1
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
	const headerVariants = {
		hidden: { opacity: 0, y: -30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	const descriptionVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, delay: 0.5, ease: 'easeOut' },
		},
	};
	const coins = data?.pages.flat() ?? [];

	const loadMoreRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ rootMargin: '100px' }
		);

		if (loadMoreRef.current) observer.observe(loadMoreRef.current);

		return () => {
			if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
		};
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	if (isLoading) return <Loader />;

	return (
		<div className='bg-gray-900 min-h-screen text-white p-4'>
			<div className='mb-12 text-center max-w-4xl mx-auto px-4 min-h-[300px] sm:min-h-[400px] md:min-h-[400px] flex flex-col items-center justify-center'>
				<motion.h1
					className='text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide drop-shadow-lg'
					variants={headerVariants}
					initial='hidden'
					animate='visible'>
					<span className='bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent'>
						Crypto
					</span>
					<span className='bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent pl-3'>
						Insights
					</span>
				</motion.h1>

				<motion.p
					className='mt-4 text-sm sm:text-base md:text-lg text-gray-300 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0 pt-6 font-semibold'
					variants={descriptionVariants}
					initial='hidden'
					animate='visible'>
					We provide real-time cryptocurrency charts, in-depth statistics, and
					market analysis to empower your crypto decisions. Stay ahead with
					CryptoInsights — your trusted partner in the crypto world.
				</motion.p>
			</div>

			{error && (
				<p className='mt-2 text-red-500 text-center'>Error: {error.message}</p>
			)}

			<CoinsList data={coins} />

			{isFetchingNextPage && (
				<div className='flex items-center justify-center mt-4'>
					<div className='w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></div>
				</div>
			)}

			<div ref={loadMoreRef} style={{ height: '1px' }}></div>

			{!hasNextPage && (
				<p className='text-center mt-4 text-gray-400'>To już koniec listy.</p>
			)}
		</div>
	);
};

export default HomePage;
