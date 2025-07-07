import { motion } from 'framer-motion';
import Coin from './Coin';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1, // opóźnienie między elementami
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0 },
};

const CoinsList = ({ data }) => {
	return (
		<motion.ul
			className='space-y-4'
			variants={containerVariants}
			initial='hidden'
			animate='visible'>
			{data.map((coin) => (
				<motion.li key={coin.id} variants={itemVariants}>
					<Coin coin={coin} />
				</motion.li>
			))}
		</motion.ul>
	);
};

export default CoinsList;
