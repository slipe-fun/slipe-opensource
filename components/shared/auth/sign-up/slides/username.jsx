import { Input } from "@/components/ui/input";
import SlideTemplate from "../slide-template";
import { useState } from "react";

export default function UsernameSlide({ username, setUsername, isAccount }) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<>
			<div className='flex flex-col gap-4 px-4 items-center'>
				<SlideTemplate title='Your username here ' img='/static/auth-assets/pencil.png' />
				<div className='bg-foreground/[0.12] flex items-center w-full rounded-2xl'>
					<span className='text-foreground p-4 pr-0'>slipe.fun/</span>
					<Input
						maxLength={20}
						onInput={element => setUsername(element.target.value)}
						value={username}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						type='username'
						className='bg-transparent rounded-none h-auto py-4 px-0'
						placeholder='Username here'
					/>
					<span
						data-focused={isFocused}
						className='text-foreground/50 duration-200 ease-out data-[focused=true]:opacity-100 data-[focused=true]:translate-x-0 data-[focused=false]:opacity-0 data-[focused=false]:translate-x-4 p-4'
					>
						{username.length}/24
					</span>
				</div>
			</div>
		</>
	);
}
