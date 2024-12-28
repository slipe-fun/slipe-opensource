import { EffectCreative } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import Post from "../../home/slides/post/post";
import CommentsBlock from "../comments/comments-block";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function ContentSlider({ setProgess, setIsTransition, user, setUser, post, commentsCount, comments, setComments, setCommentsCount, inputFocus }) {
	return (
		<Swiper
			onProgress={swiper => setProgess(swiper.progress)}
			direction='vertical'
			onTouchEnd={() => setIsTransition(true)}
            data-shadowed={inputFocus}
			onTransitionEnd={() => setIsTransition(false)}
			resistanceRatio={0}
			resistance
			creativeEffect={{
				prev: {
					opacity: 0.5,
					translate: [0, "-89%", 0],
				},
				next: {
					opacity: 0.5,
					translate: [0, "78%", 0],
				},
			}}
			effect='creative'
			slidesPerView='auto'
			modules={[EffectCreative]}
			className='w-full h-full px-5 data-[shadowed=true]:opacity-40 duration-200 ease-out'
		>
			<SwiperSlide className='pt-24'>
				<Post className='w-full relative min-h-[calc(100%-6rem)] h-[calc(100%-6rem)]' user={user} isPostModal setUser={setUser} post={post} />
			</SwiperSlide>
			<SwiperSlide id='postModalScroller' className='flex flex-col pt-24 gap-4 pb-[6.75rem] !overflow-y-auto'>
				<p className='text-3xl font-medium'>
					<span>Comments</span> <span className='opacity-50'>{commentsCount}</span>
				</p>
				<CommentsBlock
					className='p-0 overflow-visible !h-auto'
					isPostModal
					id='postModalScroller'
					comments={comments}
					setComments={setComments}
					commentsCount={commentsCount}
					setCommentsCount={setCommentsCount}
					postId={post?.id}
				/>
			</SwiperSlide>
		</Swiper>
	);
}
