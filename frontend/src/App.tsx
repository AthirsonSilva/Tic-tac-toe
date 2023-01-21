import React from 'react'
import styled from 'styled-components'
import './App.css'
import { JoinRoom } from './components/joinRoom'
import GameContext, { IGameContextProps } from './gameContext'
import socketService from './services/socketService'

const AppContainer = styled.div`
	width: 98%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1em;
`

const WelcomeText = styled.h1`
	margin: 0;
	color: #61dafb;
`

const MainContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	margin-top: 25vh;
	justify-content: center;
	align-items: center;
`

function App() {
	const [isInRoom, setInRoom] = React.useState(false)

	const connectSocket = async () => {
		socketService
			.connect('http://localhost:6969')
			.catch((error) => console.log('Connection error: ', error))
	}

	React.useEffect(() => {
		connectSocket()
	})

	const gameContextValue: IGameContextProps = {
		isInRoom,
		setInRoom
	}

	return (
		<GameContext.Provider value={gameContextValue}>
			<AppContainer>
				<WelcomeText>Welcome to Tic-Tac-Toe game!</WelcomeText>
				<MainContainer>
					<JoinRoom />
				</MainContainer>
			</AppContainer>
		</GameContext.Provider>
	)
}

export default App
