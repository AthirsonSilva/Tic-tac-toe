import React from 'react'
import { io } from 'socket.io-client'
import styled from 'styled-components'
import './App.css'

const AppContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1em;
`

function App() {
	const connect = () => {
		const socket = io('http://localhost:6969')

		socket.on('connect', () => {
			socket.emit('custom_event', 'Hello from React')
		})
	}

	React.useEffect(() => {
		connect()
	}, [])

	return (
		<AppContainer>
			<h1>React + TypeScript + Styled Components</h1>
		</AppContainer>
	)
}

export default App
