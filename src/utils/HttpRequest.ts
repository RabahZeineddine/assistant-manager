import axios, { AxiosRequestConfig } from 'axios'
import ErrorHandler from './ErrorHandler'
import * as LocalSession from 'utils/LocalSession';

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    let user = LocalSession.getSession('user')
    if (user?.token) config.headers['Authorization'] = `Bearer ${user.token}`
    config.headers['App-Origin'] = `ISA-MANAGER`
    return config
})

type AxiosOptions = AxiosRequestConfig & {
    rawResponse?: boolean
}

export default class HttpRequest {

    static async get(URL: string, options?: AxiosOptions) {
        try {
            let response = await axios.get(URL, options)
            if (options?.rawResponse) return response
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                status: error.response?.status,
                message: error.response?.data?.message,
            })
            throw errorHandler.format()
        }

    }

    static async put(URL: string, body: any = {}) {
        try {
            let response = await axios.put(URL, body)
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                status: error.response?.status,
                message: error.response?.data?.message
            })
            throw errorHandler.format()
        }
    }

    static async delete(URL: string) {
        try {
            let response = await axios.delete(URL)
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                status: error.response?.status,
                message: error.response?.data?.message
            })
            throw errorHandler.format()
        }
    }

    static async post(URL: string, body: any = {}, options: AxiosOptions = {}) {
        try {
            let response = await axios.post(URL, body, options)
            if (options?.rawResponse) return response
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                status: error.response?.status,
                message: error.response?.data?.message
            })
            throw errorHandler.format()
        }
    }

    static async patch(URL: string, body: any = {}) {
        try {
            let response = await axios.patch(URL, body)
            return response.data
        } catch (error) {
            let errorHandler = new ErrorHandler({
                status: error.response?.status,
                message: error.response?.data?.message
            })
            throw errorHandler.format()
        }
    }
}