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



const CoinsList = ({ data }) => {
	return (
		<motion.ul
			className='space-y-4'
			variants={containerVariants}
			initial='hidden'
			animate='visible'>
			{data.map((coin) => (
				
					<Coin coin={coin} />
	
			))}
		</motion.ul>
	);
};

export default CoinsList;
