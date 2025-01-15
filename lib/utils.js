import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export { default as fetcher } from "@/lib/utils/fetcher";
export { default as ReactionClicked } from "@/lib/utils/set-reactions";
export { default as TimePassedFromDate } from "@/lib/utils/time-from-date";
export { default as ShufflePixels } from "@/lib/utils/shuffle-pixels";
export { default as PixelsColors } from "@/lib/utils/pixels-colors";
export { default as AdjustHeight } from "@/lib/utils/adjust-height";
export { default as GetUniqueById } from "@/lib/utils/uniqueById";
export { default as SettingsCheck } from "@/lib/utils/settings-check";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
