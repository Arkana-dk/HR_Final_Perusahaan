import DashboardController from './DashboardController'
import AttendanceController from './AttendanceController'
import AttendanceCorrectionController from './AttendanceCorrectionController'
import LeaveController from './LeaveController'
import OvertimeController from './OvertimeController'
import ReimburseController from './ReimburseController'
import PayslipController from './PayslipController'
const Employee = {
    DashboardController: Object.assign(DashboardController, DashboardController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
AttendanceCorrectionController: Object.assign(AttendanceCorrectionController, AttendanceCorrectionController),
LeaveController: Object.assign(LeaveController, LeaveController),
OvertimeController: Object.assign(OvertimeController, OvertimeController),
ReimburseController: Object.assign(ReimburseController, ReimburseController),
PayslipController: Object.assign(PayslipController, PayslipController),
}

export default Employee