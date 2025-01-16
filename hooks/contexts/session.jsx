import { useContext, createContext } from "react";
import { Preferences } from '@capacitor/preferences';

// const store = await load('settings.json', {
// 	autoSave: 0,
// });

// const token = await store.get("token");

const store = {
	set: async (key, value) => await Preferences.set({ key, value: JSON.stringify(value) }),
	get: async (key) => JSON.parse((await Preferences.get({ key })).value)
}

const token = await store.get("token");

export const SessionContext = createContext(null);

export const SessionContextProvider = ({ children }) => {
	return <SessionContext.Provider value={{ token, store }}>{children}</SessionContext.Provider>;
};

export const useStorage = () => useContext(SessionContext);