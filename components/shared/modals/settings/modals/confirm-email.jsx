import { PageModal } from "@/components/shared/modals";
import Svg from "@/components/ui/icons/svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import icons from "@/components/ui/icons/icons";
import emailRegex from "@/constants/regex/emailRegex";
import { fetcher } from "@/lib/utils";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { toast } from "sonner";

export default function ConfirmEmailModal({ open, user, setUser, setActiveModal }) {
	const [isEmailValid, setEmailValid] = useState(false);
	const [email, setEmail] = useState("");
	const { token, store } = useStorage();
	const [isEmailSent, setIsEmailSent] = useState(false);

    useEffect(() => setEmailValid(emailRegex.test(email)), [email]);

	async function sendEmail () {
		if (!isEmailSent) {
			const request = await fetcher(api.v1 + "/email/send", "post", JSON.stringify({ email }), { Authorization: "Bearer " + token })

			setIsEmailSent(true);			
		} else {
			const userRequest = await fetcher(api.v1 + "/account/info/get", "get", null, { Authorization: "Bearer " + token })

			if (userRequest?.email) {
				setUser(prev => {
					prev.email = email;
					return prev;
				});
				setActiveModal(false);
				toast.success("Email confirmed!", { className: "bg-green text-green-foreground" });
			} else toast.error("You not confirmed your email yet.", { className: "bg-red text-red-foreground" });
		}
	}

	return (
		<PageModal element='settingsModal' className='flex flex-col overflow-hidden bg-background' open={open}>
			<div className='w-full p-4 flex top-0 z-50 bg-background/90 justify-center fixed backdrop-blur-2xl text-lg font-medium'>Email confirmation</div>
			<div className='h-full w-full flex flex-col gap-4 px-5 pt-[3.75rem] pb-24 justify-center items-center'>
				<img loading='lazy' src='./static/states-assets/email.png' className='w-40 h-40' />
				<div className="flex flex-col gap-3 w-full">
					<span className='text-3xl text-center text-foreground font-medium'>Enter your email</span>
                    
					<div className='bg-foreground/[0.12] flex items-center w-full rounded-2xl'>
						<Input
							value={email}
							onChange={e => setEmail(e.target.value)}
							maxLength={128}
							className='bg-transparent rounded-none h-auto p-4 pr-0'
							placeholder='Your email here'
						/>
						<div className='h-14 aspect-square !bg-transparent rounded-none relative flex justify-center items-center'>
							<Svg
								data-ispassword={isEmailValid}
								icon={icons["x"]}
								className='absolute duration-200 ease-out data-[ispassword=false]:opacity-100 data-[ispassword=false]:translate-y-0 data-[ispassword=true]:translate-y-4 data-[ispassword=true]:opacity-0 text-red-foreground !w-6 !h-6'
							/>
							<Svg
								data-ispassword={isEmailValid}
								icon={icons["checkmark"]}
								className='absolute duration-200 data-[ispassword=true]:opacity-100 data-[ispassword=false]:opacity-0 data-[ispassword=false]:-translate-y-4 data-[ispassword=true]:translate-y-0 ease-out text-green-foreground !w-6 !h-6'
							/>
						</div>
					</div>
                    <p className='text-foreground/50 text-center'>
					We will then send an email with a button to confirm the mail
				</p>
				</div>
			</div>
			<div className='p-5 fixed flex gap-5 w-full z-10 bg-background/90 backdrop-blur-2xl bottom-0'>
				<Button
					onClick={() => setActiveModal("")}
					variant='secondary'
					className='rounded-full bg-foreground/[0.12] hover:bg-foreground/[0.08]'
					size='full'
				>
					Cancel
				</Button>
				<Button disabled={!isEmailValid} onClick={sendEmail} className='rounded-full' size='full'>
					Send mail
				</Button>
			</div>
		</PageModal>
	);
}
