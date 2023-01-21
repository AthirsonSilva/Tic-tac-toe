import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'
import flash from 'express-flash'
import session from 'express-session'
import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'
import 'reflect-metadata'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
	session({
		secret: 'cats',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 60000 }
	})
)

app.use(flash())
// app.use(expressValidator())

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404))
})

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

app.listen(4444, () =>
	console.log('Server started on port http://127.0.0.1:4444')
)

export default app
