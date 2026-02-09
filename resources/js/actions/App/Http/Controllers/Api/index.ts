import Auth from './Auth'
import Employee from './Employee'
const Api = {
    Auth: Object.assign(Auth, Auth),
Employee: Object.assign(Employee, Employee),
}

export default Api