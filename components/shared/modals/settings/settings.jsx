import { PageModal } from "../../modals";
import { useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Header from "./header";
import EmailAlert from "./email-alert";
import settings from "@/constants/settings";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import ConfirmEmailModal from "./modals/confirm-email";
import { ProfileSettngsModal } from "./modals/settings-modals";

export default function SettingsModal({ user, setUser, open, setOpen }) {
	const [activeModal, setActiveModal] = useState("");
	const settingsModalRef = useRef(null);
	const { scrollY } = useScroll({ container: open ? settingsModalRef : null, offset: ["40%", "-0%"] });
	const modals = [
		{ component: ConfirmEmailModal, label: "confirm" },
		{ component: ProfileSettngsModal, label: "profile" },
	];

	return (
		<>
			<PageModal open={open}>
				<div id='settingsModal' className='flex flex-col overflow-hidden duration-300 ease-out bg-background w-full h-full'>
					<Header setOpen={setOpen} scrollProgress={scrollY} user={user} />
					<div ref={settingsModalRef} className='overflow-y-auto flex flex-col pt-[16.75rem+var(--safe-area-inset-top)] gap-5 p-5 w-full h-full'>
						{!user?.email ? <EmailAlert setActiveModal={setActiveModal} /> : null}
						{settings.map(category => (
							<div className='flex flex-col gap-3'>
								{category.label === "Slipe comet" ? (
									<span className='text-2xl font-semibold bg-gradient-to-r from-[#FFA953] to-[#FF823F] text-transparent bg-clip-text'>
										{category.label}
									</span>
								) : (
									<span className='text-2xl font-medium'>{category.label}</span>
								)}

								<div className='w-full bg-foreground/[0.12] rounded-3xl flex flex-col'>
									{category.actions.map((action, index) => (
										<div onClick={() => setActiveModal(action.id)} className='w-full cursor-pointer flex gap-3'>
											<div
												style={{
													"--background": `hsl(${action.color} / 0.35)`,
													"--icon": `hsl(${action.color === "var(--gray)" ? "0 0% 100%" : action.color})`,
												}}
												className='w-12 min-w-12 h-12 m-3 mr-0 rounded-xl flex justify-center items-center bg-[--background] text-[--icon]'
											>
												<Svg className='!w-[1.875rem] !h-[1.875rem]' icon={icons[action.icon]} />
											</div>
											<div
												data-border={category.actions.length === index + 1}
												className='w-full p-3 pl-0 h-full data-[border=false]:border-b-2 border-b-foreground/[0.12] items-center flex'
											>
												<span className='font-medium w-full'>{action.label}</span>
												<div className='min-w-10 h-10 flex justify-center items-center'>
													<Svg className='!w-6 !h-6 rotate-180 opacity-50' icon={icons["chevronLeft"]} />
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</PageModal>
			{modals.map(({ component: ModalComponent, label }, index) => (
				<ModalComponent setActiveModal={setActiveModal} user={user} setUser={setUser} key={index} open={label === activeModal} />
			))}
		</>
	);
}
