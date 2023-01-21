import React from 'react'
import styled from 'styled-components'
import gameContext from '../../gameContext'
import gameService from '../../services/gameService'
import socketService from '../../services/socketService'

interface IJoinRoomProps {}

const JoinRoomContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 2em;
`

const RoomIdInput = styled.input`
	height: 30px;
	width: 20em;
	font-size: 17px;
	outline: none;
	border: 1px solid #8e44ad;
	border-radius: 3px;
	padding: 0 10px;
`

const JoinButton = styled.button`
	outline: none;
	background-color: #8e44ad;
	color: #fff;
	font-size: 17px;
	border: 2px solid transparent;
	border-radius: 5px;
	padding: 4px 18px;
	transition: all 230ms ease-in-out;
	margin-top: 1em;
	cursor: pointer;
	&:hover {
		background-color: transparent;
		border: 2px solid #8e44ad;
		color: #8e44ad;
	}
`

export function JoinRoom(props: IJoinRoomProps) {
	const [roomName, setRoomName] = React.useState('')
	const [isJoining, setJoining] = React.useState(false)
	const { setInRoom, isInRoom } = React.useContext(gameContext)

	const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
		const value = e.target.value as string
		setRoomName(value)
	}

	const joinRoom = async (e: React.FormEvent) => {
		e.preventDefault()

		const socket = socketService.socket

		if (!roomName || roomName.trim() === '' || !socket) return

		setJoining(true)

		const joined = await gameService
			.JoinGameRoom(socket, roomName)
			.catch((error) => {
				alert(error)
			})

		if (joined) {
			setInRoom(true)
		}

		setJoining(false)
	}

	return (
		<form onSubmit={joinRoom}>
			<JoinRoomContainer>
				<h4>Enter room ID to join a game</h4>
				<RoomIdInput
					placeholder='Enter room ID'
					value={roomName}
					onChange={handleRoomNameChange}
				/>
				<JoinButton type='submit' disabled={isJoining}>
					{isJoining ? 'Joining...' : 'Join'}
				</JoinButton>
			</JoinRoomContainer>
		</form>
	)
}