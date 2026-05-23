import Api from './Api'
import Employee from './Employee'
import Employees from './Employees'
import MasterData from './MasterData'
import Analytics from './Analytics'
import Time from './Time'
import Finance from './Finance'
import Leave from './Leave'
import Assets from './Assets'
import Contracts from './Contracts'
import Documents from './Documents'
import Payroll from './Payroll'
import NotificationController from './NotificationController'
import Modules from './Modules'
import SuperAdmin from './SuperAdmin'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    Api: Object.assign(Api, Api),
Employee: Object.assign(Employee, Employee),
Employees: Object.assign(Employees, Employees),
MasterData: Object.assign(MasterData, MasterData),
Analytics: Object.assign(Analytics, Analytics),
Time: Object.assign(Time, Time),
Finance: Object.assign(Finance, Finance),
Leave: Object.assign(Leave, Leave),
Assets: Object.assign(Assets, Assets),
Contracts: Object.assign(Contracts, Contracts),
Documents: Object.assign(Documents, Documents),
Payroll: Object.assign(Payroll, Payroll),
NotificationController: Object.assign(NotificationController, NotificationController),
Modules: Object.assign(Modules, Modules),
SuperAdmin: Object.assign(SuperAdmin, SuperAdmin),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers