import categories_list from "@/constants/categories_list";

export default async function updatePreference (category, store) {
    let preferences = await store.get("preferences") || [...Array(16).keys()].map(() => 1);
	const categoryIndex = categories_list.indexOf(category);
	preferences[categoryIndex] = preferences[categoryIndex] + 1;
	await store.set("preferences", preferences);
}