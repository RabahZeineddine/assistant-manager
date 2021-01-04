import { getErrorMessageByCode } from "config/messages"


export interface Error {
    status: number
    message?: string
    details?: string
}

export default class ErrorHandler {

    private status: number = 500
    private message: string = ''
    private details: string = ''

    constructor(error: Error) {
        this.setError(error)
    }

    setError(error: Error) {
        this.status = error.status || 500
        this.details = getErrorMessageByCode(error.status)
        this.message = error.message || ''

    }
    format(): Error {
        return {
            status: this.status,
            message: this.message,
            details: this.details
        }
    }

    setErrorByStatus(status: number = 500) {
        this.status = status
        this.details = getErrorMessageByCode(status)
    }
}