
import env from 'config/env';
import HttpRequest from '../HttpRequest';


export default class AssistantAPI {


    public static async testSkill(file: File) {
        const form = new FormData()
        form.append('file', file)
        return HttpRequest.post(env.API.URL, form, { rawResponse: true, responseType: 'arraybuffer', timeout: 99999999 })
    }
}