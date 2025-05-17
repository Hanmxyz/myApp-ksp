export default class AuthUsecase{
    constructor(authRepository){
        this.authRepository = authRepository
    }


    async login(username) {
        const data = await this.authRepository.login(username)

        return data
        
    }

    async signup(data) {
        const result = await this.authRepository.signup(data)
        console.log(result)
        return result
    }
}