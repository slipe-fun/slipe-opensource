import icons from "@/components/ui/icons/icons";
import Svg from "@/components/ui/icons/svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useState, useRef } from "react";

const SearchBar = forwardRef(({ placeholder = "", value, setValue, limit = 120, setFocus, focus, className = "", ...props }, ref) => {
	const [isFocus, setIsFocus] = useState(false);
	const [inputWidth, setInputWidth] = useState(0);
	const textMeasureRef = useRef(null);
	const inputRef = useRef(null);

	const handleFocus = () => {
		setIsFocus(true);
		setFocus ? setFocus(true) : null;
		inputRef.current?.focus();
	};

	const flushSearch = () => {
		setIsFocus(false);
		setFocus ? setFocus(false) : null;
		setValue("");
		inputRef.current?.blur();
	};
    
    useEffect(() => {
		setIsFocus(focus);
	}, [focus]);

	useEffect(() => {
		if (textMeasureRef.current && placeholder) {
			const width = textMeasureRef.current.offsetWidth;
			setInputWidth(width);
		}
	}, [placeholder]);

	return (
		<>
			<div
				ref={ref}
				onClick={handleFocus}
				className={cn("w-full h-14 bg-foreground/[0.12] gap-[0.625rem] px-4 flex justify-center items-center rounded-2xl", className)}
				{...props}
			>
				<Svg data-active={isFocus} className='!w-7 !h-7 min-w-7 opacity-50' icon={icons["search"]} />
				<div ref={textMeasureRef} className='absolute top-0 left-0 invisible whitespace-nowrap'>
					{placeholder}
				</div>
				<Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
					onBlur={() => {
						value ? null : setIsFocus(false);
						setFocus ? setFocus(false) : null;
					}}
					data-focus={isFocus}
					ref={inputRef}
					placeholder={placeholder}
					style={{ width: `${inputWidth}px` }}
					className='p-0 duration-300 ease data-[focus=true]:!w-full data-[focus=false]:w-auto h-full bg-transparent rounded-none'
				/>
			</div>{" "}
			<Button
				className='data-[focus=false]:-mr-[4.5rem] data-[focus=false]:pointer-events-none datafocus=true]:-mr-0 data-[focus=false]:opacity-0 data-[focus=true]:opacity-100'
				onClick={() => flushSearch()}
				variant='secondary'
                data-focus={isFocus ? isFocus : false}
				size='icon'
			>
				<Svg icon={icons["x"]} className='!w-[1.625rem] !h-[1.625rem]' />
			</Button>
		</>
	);
});

export default SearchBar;
