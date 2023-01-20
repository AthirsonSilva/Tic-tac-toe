import { Http2SecureServer } from 'http2'
import { SocketControllers } from 'socket-controllers'
import { Server } from 'socket.io'
import Container from 'typedi'

export default (httpServer: Http2SecureServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: '*'
		}
	})

	new SocketControllers({
		io,
		controllers: [__dirname + '/api/controllers/*.ts'],
		container: Container as any
	})

	return io
}
