import Auth from './Auth'
import NotificationController from './NotificationController'
import DeviceController from './DeviceController'
import AnnouncementController from './AnnouncementController'
import ApprovalController from './ApprovalController'
import Employee from './Employee'
const Api = {
    Auth: Object.assign(Auth, Auth),
NotificationController: Object.assign(NotificationController, NotificationController),
DeviceController: Object.assign(DeviceController, DeviceController),
AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
ApprovalController: Object.assign(ApprovalController, ApprovalController),
Employee: Object.assign(Employee, Employee),
}

export default Api