import ExamIcon from '../../../assets/ae_exam.png';
import PaidExamIcon from '../../../assets/ae_paid_exam.png';
import ManageUsers from '../../../assets/ae_manage_users.png';
import ManageExams from '../../../assets/ae_manage_exams.png';
import ManageTenants from '../../../assets/ae_tenant.png';
import { MANAGE_EXAMS, MANAGE_TENANTS, MANAGE_USERS, PRACTICE_EXAMS, EXAM_TYPE_PRACTICE, EXAM_TYPE_ASSIGNED, ASSIGNED_EXAMS, EXAM_TYPE_ALL } from '../constants/constants';

export const FACADES = [
    {
        id: PRACTICE_EXAMS,
        title: "Practice Exams",
        imageUrl: ExamIcon,
        imageAlt: "Practice Exams",
        navigateTo: "/exams",
        navigateState: {examType: EXAM_TYPE_PRACTICE},
        description: "AE practice exams improves your skills, makes you comfortable with the platform and allows you to better manage the time and duration."
    },
    {
        id: ASSIGNED_EXAMS,
        title: "Assigned Exams",
        imageUrl: PaidExamIcon,
        imageAlt: "Assigned Exams",
        navigateTo: "/exams",
        navigateState: {examType: EXAM_TYPE_ASSIGNED},
        description: "AE assigned exams created by either admin, your current or future organization to assess you for an employment or a training."
    },
    {
        id: MANAGE_TENANTS,
        title: "Manage Tenants",
        imageUrl: ManageTenants,
        imageAlt: "Manage Tenants",
        navigateTo: "/console/tenant",
        description: "Manage the users and groups into a single unit.",
    },    
    {
        id: MANAGE_USERS,
        title: "Manage Users",
        imageUrl: ManageUsers,
        imageAlt: "Manage Users",
        navigateTo: "/console/users",
        description: "Manage user state, roles, group and tenant.",
    },
    {   
        id: MANAGE_EXAMS,
        title: "Manage Exams",
        imageUrl: ManageExams,
        imageAlt: "Paid Exams",
        navigateTo: "/console/exams",
        navigateState: {examType: EXAM_TYPE_ALL},
        description: "Manage exam creation, modification, deletion and assignment to either user or group"
    }
]