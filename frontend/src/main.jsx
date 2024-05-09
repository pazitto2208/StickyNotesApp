import React from 'react'
import App from './App.jsx'
import './index.css'

import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Auth from './pages/auth/page.jsx'
import Home from './pages/home/page.jsx'

const pages = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home />,  },
			{ path: '/auth', element: <Auth /> },
		]
	}
])

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

if (rootElement.hasChildNodes()) {
	hydrateRoot(
		rootElement,
		<React.StrictMode>
			<RouterProvider router={pages}></RouterProvider>
		</React.StrictMode>,
	)
} else {
	root.render(
		<React.StrictMode>
			<RouterProvider router={pages}></RouterProvider>
		</React.StrictMode>,
	)
}