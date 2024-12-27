import { Input } from "@/components/ui/input";
import SlideTemplate from "../slide-template";
import { useState } from "react";

export default function ProfileSlide({ displayname, setDisplayname, avatar, setAvatar }) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<>
			<div className='flex flex-col gap-5 px-5 items-center'>
				<SlideTemplate uploadedAvatar={setAvatar} isAvatar title='Let’s setup profile' img={avatar ? avatar : '/static/auth-assets/picture.png'} />
				<div className='bg-foreground/[0.12] flex items-center w-full rounded-2xl'>
					<Input
						maxLength={32}
						onInput={element => setDisplayname(element.target.value)}
						value={displayname}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						type='username'
						className='bg-transparent rounded-none h-auto p-4 pr-0'
						placeholder='Display name here'
					/>
					<span
						data-focused={isFocused}
						className='text-foreground/50 duration-200 ease-out data-[focused=true]:opacity-100 data-[focused=true]:translate-x-0 data-[focused=false]:opacity-0 data-[focused=false]:translate-x-4 p-4'
					>
						{displayname.length}/32
					</span>
				</div>
			</div>
		</>
	);
}
