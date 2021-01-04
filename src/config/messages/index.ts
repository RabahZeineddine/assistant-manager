import { ObjectType } from "config/types"

const MESSAGES: ObjectType = {
    REQUIRED: 'Campo obrigatório',
    INVALID_EMAIL: 'Informe um email válido',
    INVALID_CREDENTIALS: 'Credenciais inválidas',
    DEFAULT: 'Um erro ocorreu, tente novamente.',
    INVALID_CONFIRM_PASSWORD: "As senhas não conferem"
}

const ERRORS: ObjectType = {
    401: MESSAGES.INVALID_CREDENTIALS,
    DEFAULT: MESSAGES.DEFAULT
}

export const getErrorMessage = (messageKey: string = '') => {
    return MESSAGES[messageKey] || MESSAGES.DEFAULT
}

export const getErrorMessageByCode = (code: number) => {
    return ERRORS[code] || ERRORS.DEFAULT
}


export default MESSAGES