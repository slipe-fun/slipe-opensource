import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/page";
import Profile from "./pages/profile/page";
import { Toaster } from "sonner";
import Auth from "./pages/auth/page";
import Header from "@/components/shared/header/header";
import NavBar from "@/components/shared/navBar";
import PagesContentTypeContextProvider from "@/hooks/contexts/posts-type";
import { SessionContextProvider } from "@/hooks/contexts/session";

import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Toaster
			gap={12}
			toastOptions={{
				className: "rounded-xl text-sm",
			}}
			position='top-center'
		/>
		<PagesContentTypeContextProvider>
			<SessionContextProvider>
				<BrowserRouter>
					<Header />
					<main className='w-screen h-screen'>
						<Routes>
							<Route path='/auth' element={<Auth />} />
							<Route path='/' element={<Home />} />
							<Route path='/profile' element={<Profile />} />
						</Routes>
					</main>
					<NavBar />
				</BrowserRouter>
			</SessionContextProvider>
		</PagesContentTypeContextProvider>
	</StrictMode>
);
