import Service from "./service"

class UserService extends Service
{
    constructor() {
        super('users', process.env.REACT_APP_SERVICE_USERLOAN_URL)
    }
}

const userService = new UserService()

export default userService;