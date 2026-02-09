import EmployeePayslipController from './EmployeePayslipController'
import AttendanceController from './AttendanceController'
import EmployeeLeaveRequestController from './EmployeeLeaveRequestController'
import EmployeeOvertimeController from './EmployeeOvertimeController'
import EmployeeReimburseController from './EmployeeReimburseController'
import DashboardController from './DashboardController'
const Employee = {
    EmployeePayslipController: Object.assign(EmployeePayslipController, EmployeePayslipController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
EmployeeLeaveRequestController: Object.assign(EmployeeLeaveRequestController, EmployeeLeaveRequestController),
EmployeeOvertimeController: Object.assign(EmployeeOvertimeController, EmployeeOvertimeController),
EmployeeReimburseController: Object.assign(EmployeeReimburseController, EmployeeReimburseController),
DashboardController: Object.assign(DashboardController, DashboardController),
}

export default Employee