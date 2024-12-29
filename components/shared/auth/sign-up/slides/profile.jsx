import { Input } from "@/components/ui/input";
import Counter from "@/components/shared/counter";
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
					<Counter
						data-focused={isFocused}
						value={displayname.length}
						className='text-base duration-200 ease-out data-[focused=true]:opacity-100 data-[focused=false]:opacity-0 p-4'
						maxValue={32}
					/>
				</div>
			</div>
		</>
	);
}
