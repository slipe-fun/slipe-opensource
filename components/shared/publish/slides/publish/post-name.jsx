import { useRef, useState, useEffect } from "react";
import Counter from "@/components/shared/counter";
import { motion } from "framer-motion";

export default function PublishPostName({setName, name, focused, setFocused, blockVariants}) {
    const textareaRef = useRef(null);
	const hiddenDivRef = useRef(null);
	const [textareaHeight, setTextareaHeight] = useState("32px");

    const updateTextareaHeight = () => {
		if (textareaRef.current && hiddenDivRef.current) {
			hiddenDivRef.current.style.width = `${textareaRef.current.offsetWidth}px`;
			hiddenDivRef.current.textContent = name + "\n";
			const newHeight = hiddenDivRef.current.scrollHeight;
			setTextareaHeight(`${newHeight}px`);
		}
	};

	useEffect(() => {
		updateTextareaHeight();
	}, [name]);

	return (
		<motion.div
			onClick={() => textareaRef.current?.focus()}
			key='postName-container'
			variants={blockVariants}
			transition={{ type: "spring" }}
			whileTap={{ scale: 0.99, opacity: 0.8 }}
			className={`relative w-full h-[9.25rem] flex flex-col justify-between p-5 rounded-[1.25rem] bg-gradient-to-b from-[#C685FF] to-[#AF53FF] overflow-hidden ${
				focused ? "z-[20]" : ""
			}`}
		>
			<div className='w-full flex justify-between'>
				<span className='text-white/50 font-semibold'>Post name</span>
				<Counter className='text-base font-semibold' value={name.length} maxValue={32} />
			</div>
			<textarea
				ref={textareaRef}
				value={name}
				style={{ height: textareaHeight }}
				maxLength={32}
				placeholder='Type post name...'
				onChange={e => {
					setName(e.target.value);
					updateTextareaHeight();
				}}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				className='w-full bg-transparent placeholder:text-white/50 overflow-visible font-semibold text-white outline-none text-2xl resize-none'
			/>
			<div
				ref={hiddenDivRef}
				style={{
					position: "absolute",
					visibility: "hidden",
					whiteSpace: "pre-wrap",
					wordWrap: "break-word",
					fontSize: "1.5rem",
					lineHeight: "2rem",
					padding: "0",
				}}
			/>
		</motion.div>
	);
}
