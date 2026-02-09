import AttendanceController from './AttendanceController'
import EmployeeLeaveRequestController from './EmployeeLeaveRequestController'
import EmployeePayslipController from './EmployeePayslipController'
import EmployeeOvertimeController from './EmployeeOvertimeController'
import EmployeeReimburseController from './EmployeeReimburseController'
import DashboardController from './DashboardController'
const Employee = {
    AttendanceController: Object.assign(AttendanceController, AttendanceController),
EmployeeLeaveRequestController: Object.assign(EmployeeLeaveRequestController, EmployeeLeaveRequestController),
EmployeePayslipController: Object.assign(EmployeePayslipController, EmployeePayslipController),
EmployeeOvertimeController: Object.assign(EmployeeOvertimeController, EmployeeOvertimeController),
EmployeeReimburseController: Object.assign(EmployeeReimburseController, EmployeeReimburseController),
DashboardController: Object.assign(DashboardController, DashboardController),
}

export default Employee