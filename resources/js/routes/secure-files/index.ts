import attendancePhotos from './attendance-photos'
import documents from './documents'
import contracts from './contracts'
import leaveAttachments from './leave-attachments'
import reimburseAttachments from './reimburse-attachments'
import attendanceCorrectionAttachments from './attendance-correction-attachments'
const secureFiles = {
    attendancePhotos: Object.assign(attendancePhotos, attendancePhotos),
documents: Object.assign(documents, documents),
contracts: Object.assign(contracts, contracts),
leaveAttachments: Object.assign(leaveAttachments, leaveAttachments),
reimburseAttachments: Object.assign(reimburseAttachments, reimburseAttachments),
attendanceCorrectionAttachments: Object.assign(attendanceCorrectionAttachments, attendanceCorrectionAttachments),
}

export default secureFiles