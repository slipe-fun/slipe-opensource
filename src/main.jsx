import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/page";
import { StatusBar } from "@capacitor/status-bar";
import Profile from "./pages/profile/page";
import { Toaster } from "sonner";
import Auth from "./pages/auth/page";
import Header from "@/components/shared/header/header";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { SafeArea } from "capacitor-plugin-safe-area";
import NavBar from "@/components/shared/nav-bar";
import PagesContentTypeContextProvider from "@/hooks/contexts/posts-type";
import { SessionContextProvider } from "@/hooks/contexts/session";
import { createPortal } from "react-dom";
import Publish from "./pages/publish/page";
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import "./index.css";

// Some native code for transparent bars, insets and etc.

StatusBar.setOverlaysWebView({ overlay: true });

NavigationBar.setTransparency({ isTransparent: true });

SafeArea.getSafeAreaInsets().then(({ insets }) => {
	document.documentElement.style.setProperty("--safe-area-inset-top", `${insets.top}px`);
	document.documentElement.style.setProperty("--safe-area-inset-bottom", `${insets.bottom}px`);
});

defineCustomElements(window);

//

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{createPortal(
			<Toaster
				gap={12}
				toastOptions={{
					className: "rounded-xl text-sm",
				}}
				position='top-center'
			/>,
			document.body
		)}

		<PagesContentTypeContextProvider>
			<SessionContextProvider>
				<BrowserRouter>
					<Header />
					<main className='w-screen h-screen'>
						<Routes>
							<Route path='/auth' element={<Auth />} />
							<Route path='/' element={<Home />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/publish' element={<Publish />} />
						</Routes>
					</main>
					<NavBar />
				</BrowserRouter>
			</SessionContextProvider>
		</PagesContentTypeContextProvider>
	</StrictMode>
);
