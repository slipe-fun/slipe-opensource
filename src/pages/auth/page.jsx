import WelcomeFeaturesSlider from "@/components/shared/auth/welcome/slider";
import { Button } from "@/components/ui/button";
import { SwiperSlide, Swiper } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import SignUpSlider from "@/components/shared/auth/sign-up/slider";
import LogInSlider from "@/components/shared/auth/log-in/log-in";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import isRegistrationDataCorrect from "@/lib/auth/signUp/isDataCorrect";
import auth from "@/lib/auth/auth";
import { toast } from "sonner";
import { useStorage } from "@/hooks/contexts/session";
import { fetcher } from "@/lib/utils";
import api from "@/constants/api";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Auth() {
	const [stage, setStage] = useState(0);
	const [signUpStage, setSignUpStage] = useState(0);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [displayname, setDisplayname] = useState("");
	const [avatar, setAvatar] = useState("");
	const [isContinue, setIsContinue] = useState(true);
	const { token, store } = useStorage();

	const swiperRef = useRef(null);

	const buttonText = () => {
		switch (stage) {
			case 1:
				if (signUpStage >= 3) {
					return "Start exploring";
				} else {
					return "Continue";
				}
			case 2:
				return "Sign in to account";
			default:
				return "Start blogging";
		}
	};

	const newSlide = () => {
		stage == 1 ? setSignUpStage(stage => stage + 1) : setStage(1);
	};

	// sign up button
	async function authButton(type) {
		if ([0, 1].includes(signUpStage) && stage > 0) {
			const isDataCorrect = isRegistrationDataCorrect(username, password)[signUpStage]
			if (!isDataCorrect?.success) {
				return toast.error(isDataCorrect?.message, { className: "bg-red text-red-foreground" });
			}
		}

		if (signUpStage === 0 && stage === 1) {
			const user = await fetcher(api.v1 + "/account/get/" + username, "get");
			
			if (user.error) return setSignUpStage(1)
			else if (user?.success[0]) return setStage(2)
		} else if ((stage === 1 && signUpStage === 1) || stage === 2) {
			return await auth(
				type,
				username,
				password,
				() => setIsContinue(false),
				token => {
					store.set("token", token)
					store.save()

					if (type === "signup") {
						setIsContinue(true);
						newSlide();
					} else {
						window.location.href = "/";
					}
				},
				error => {
					setIsContinue(true);
					toast.error(error, { className: "bg-red text-red-foreground" });
				}
			);
		} else if (signUpStage === 2) {
			const profileAvatar = await fetch(avatar).then(async res => await res.blob())

			const formData = new FormData();
			formData.append('avatar', new File([profileAvatar], "avatar.png", {
				type: profileAvatar?.type
			}));
			formData.append('username', username);
			formData.append('nickname', displayname);
	
			setIsContinue(false)
			await fetcher(api.v1 + `/settings/profile`, "post", formData, { "Authorization": "Bearer " + await store.get("token") });
			setIsContinue(true);
		}

		newSlide();
	}

	useEffect(() => {
		swiperRef?.current.swiper.slideTo(stage);
		if (stage === 1) setIsContinue(true);
	}, [stage]);

	// sign in inputs checks
	useEffect(() => {
		if (stage === 2) {
			if (username?.length > 0 && password?.length > 0) setIsContinue(true);
			else setIsContinue(false);
		}
	}, [stage, username, password]);

	return (
		<div className='h-full flex flex-col animate-[fadeIn_0.3s_ease-out]'>
			<div className='flex justify-center items-center h-full w-full'>
				<Swiper
					ref={swiperRef}
					creativeEffect={{
						prev: {
							opacity: 0,
							translate: ["-50%", 0, 0],
						},
						next: {
							opacity: 0,
							translate: ["50%", 0, 0],
						},
					}}
					allowTouchMove={false}
					effect='creative'
					modules={[EffectCreative]}
					className='w-full h-full'
				>
					<SwiperSlide className='!flex items-center'>
						<WelcomeFeaturesSlider />
					</SwiperSlide>
					<SwiperSlide className='!flex items-center'>
						<SignUpSlider
							signUpStage={signUpStage}
							isAccount={setStage}
							setAvatar={setAvatar}
							setPassword={setPassword}
							setUsername={setUsername}
							setDisplayname={setDisplayname}
						/>
					</SwiperSlide>
					<SwiperSlide className='!flex items-center'>
						<LogInSlider isAccount={setStage} password={password} setPassword={setPassword} />
					</SwiperSlide>
				</Swiper>
			</div>
			<div className='p-5 flex gap-5'>
				<Button
					data-isexpanded={signUpStage == 1 || stage == 2}
					className='data-[isexpanded=false]:-mr-[4.5rem] data-[isexpanded=false]:pointer-events-none data-[isexpanded=true]:-mr-0 data-[isexpanded=false]:opacity-0 data-[isexpanded=true]:opacity-100'
					onClick={() => signUpStage == 1 ? setSignUpStage(stage => stage - 1) : setStage(stage => stage - 1)}
					variant='secondary'
					size='icon'
				>
					<Svg icon={icons["chevronLeft"]} className='!w-7 !h-7' />
				</Button>
				{/* TODO: add text switching animation */}
				<Button disabled={!isContinue} onClick={async () => await authButton(stage === 2 ? "login" : "signup")} size='full'>
					{buttonText()}
				</Button>
			</div>
		</div>
	);
}
