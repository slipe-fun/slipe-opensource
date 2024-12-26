import { SwiperSlide, Swiper } from "swiper/react";

import SlideTemplate from "../sign-up/slide-template";
import { Input } from "@/components/ui/input";
import Svg from "@/components/ui/icons/svg";
import { Button } from "@/components/ui/button";
import icons from "@/components/ui/icons/icons";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/effect-creative";

export default function LogInSlider({ isAccount, password, setPassword }) {
	const [logInPassword, setLogInPassword] = useState("");
	const [isPassword, setIsPassword] = useState(true);

	useEffect(() => {
		setPassword(logInPassword);
	}, [logInPassword]);

	useEffect(() => {
		setLogInPassword(password);
	}, [password])

	return (
		<Swiper
			autoHeight
			allowTouchMove={false}
			className='w-full'
		>
			<SwiperSlide>
				<div className='flex flex-col gap-4 px-4 items-center'>
					<SlideTemplate title='Welcome back!' img='/static/auth-assets/chain.png' />
					<div className='bg-foreground/[0.12] flex items-center w-full rounded-2xl'>
						<Input
							maxLength={32}
							onInput={element => setLogInPassword(element.target.value)}
							value={logInPassword}
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
						Don’t have an account?{" "}
						<span onClick={() => isAccount(1)} className='text-foreground font-medium cursor-pointer'>
							Sign up
						</span>
					</p>
				</div>
			</SwiperSlide>
		</Swiper>
	);
}
