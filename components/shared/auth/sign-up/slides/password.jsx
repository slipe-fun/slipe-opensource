import { Input } from "@/components/ui/input";
import SlideTemplate from "../slide-template";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

export default function PasswordSlide({ password, setPassword }) {
	const [isPassword, setIsPassword] = useState(true);

	return (
		<>
			<div className='flex flex-col gap-4 px-4 items-center'>
				<SlideTemplate title='Your password here' img='/static/auth-assets/lock.png' />
				<div className='bg-foreground/[0.12] flex items-center w-full rounded-2xl'>
					<Input
						maxLength={32}
						onInput={element => setPassword(element.target.value)}
						value={password}
						type={isPassword ? "password" : "text"}
						className='bg-transparent rounded-none h-auto pr-0 p-4'
						placeholder='Password here'
					/>
					<Button
						onClick={() => setIsPassword(isPassword => !isPassword)}
						className='h-14 aspect-square !bg-transparent rounded-none relative flex justify-center items-center'
					>
						<Svg
							data-ispassword={isPassword}
							icon={icons["eye"]}
							className='absolute duration-200 ease-out data-[ispassword=false]:opacity-100 data-[ispassword=false]:translate-y-0 data-[ispassword=true]:translate-y-4 data-[ispassword=true]:opacity-0 text-foreground/50 !w-8 !h-8'
						/>
						<Svg
							data-ispassword={isPassword}
							icon={icons["slashedEye"]}
							className='absolute duration-200 data-[ispassword=true]:opacity-100 data-[ispassword=false]:opacity-0 data-[ispassword=false]:-translate-y-4 data-[ispassword=true]:translate-y-0 ease-out text-foreground/50 !w-8 !h-8'
						/>
					</Button>
				</div>
				<p className='text-foreground/50 text-center'>
					When you register you accept the{" "}
					<span onClick={() => isAccount(2)} className='text-foreground font-medium cursor-pointer'>
						ToS
					</span>{" "}
					and{" "}
					<span onClick={() => isAccount(2)} className='text-foreground font-medium cursor-pointer'>
						Privacy Policy
					</span>
				</p>
			</div>
		</>
	);
}
