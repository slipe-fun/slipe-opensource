import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { useEffect, useState } from "react";

const textVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.02,
		},
	},
	clicked: {
		transition: {
			staggerChildren: 0.02,
		},
	},
	exit: {
		transition: {
			staggerChildren: 0.02,
			staggerDirection: -1,
		},
	},
};

const letterVariants = {
	hidden: { opacity: 0, y: -12, scale: 0.8 },
	visible: { opacity: 0.5, y: 0, scale: 1 },
	clicked: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: 12, scale: 0.8 },
};

const easterGigaWords = [
	"I can't figure out how to publish a blog 😭",
	"Click on this text 100 times trust me",
	"There's supposed to be an easter eggs but there isn't 🍔",
	"Bro really thought there was gonna be an easter egg in here 😭🙏",
	"01010000 01100101 01101110 01101001 01110011",
	"Using this app you will feel better every day just trust me",
];

const PublishBottomText = () => {
	const [clicked, setClicked] = useState(false);
    const [seed, setSeed] = useState(Math.floor(Math.random() * easterGigaWords.length));

	return (
		<AnimatePresence>
			<motion.p
				variants={textVariants}
				className='text-foreground text-center font-semibold'
				animate={clicked ? "clicked" : "visible"}
				initial='hidden'
				exit='exit'
				onClick={() => setClicked(prev => !prev)}
			>
				{easterGigaWords[seed].split("").map((letter, index) => (
					<motion.span transition={{ duration: 0.3 }} key={index} variants={letterVariants}>
						{letter}
					</motion.span>
				))}
			</motion.p>
		</AnimatePresence>
	);
}

export default memo(PublishBottomText)
