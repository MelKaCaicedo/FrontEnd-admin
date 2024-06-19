import Service from "./service"

class LoanService extends Service
{
    constructor() {
        super('loans', process.env.REACT_APP_SERVICE_USERLOAN_URL)
    }
}

const loanService = new LoanService()

export default loanService;