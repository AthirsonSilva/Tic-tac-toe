import React from 'react'

export interface IGameContextProps {
	isInRoom: boolean
	setInRoom: (isInRoom: boolean) => void
}

const defaultState: IGameContextProps = {
	isInRoom: false,
	setInRoom: () => {}
}

export default React.createContext(defaultState)
