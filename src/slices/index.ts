import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// login
import LoginReducer from "./auth/login/reducer";

// register
import RegisterReducer from "./auth/register/reducer";

// userProfile
import ProfileReducer from "./auth/profile/reducer";

// Chat
import ChatReducer from "./chat/reducer";

// MailBox
import MailboxReducer from "./mailbox/reducer";

// Calendar
import CalendarReducer from "./calendar/reducer";

// Ecommerce
import EcommerceReducer from "./ecommerce/reducer";

// HR Managment
import HRManagmentReducer from "./hrManagement/reducer";

// Notes
import NotesReducer from "./notes/reducer";

// Social
import SocialReducer from "./social/reducer";

// Invoice
import InvoiceReducer from "./invoice/reducer"

// Users
import UsersReducer from "./users/reducer";
import RoleGroupReducer from "./roleGroups/reducer";
import UserRolesReducer from "./userRoles/reducer";
import UserListReducer from "./userList/reducer";
import ActionsReducer from "./actions/reducer"; 
import SupportTicketsReducer from "./supportTickets/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Register: RegisterReducer,
    Profile: ProfileReducer,
    Chat: ChatReducer,
    Mailbox: MailboxReducer,
    Calendar: CalendarReducer,
    Ecommerce: EcommerceReducer,
    HRManagment: HRManagmentReducer,
    Notes: NotesReducer,
    Social: SocialReducer,
    Invoice: InvoiceReducer,
    Users: UsersReducer,
    RoleGroup: RoleGroupReducer,
    UserRoles: UserRolesReducer,
    UserList: UserListReducer,
    Actions: ActionsReducer,
    SupportTickets: SupportTicketsReducer
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;