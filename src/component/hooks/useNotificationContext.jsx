import {useContext} from "react";
import {NotificationContext} from "../contexts/NotificationContext.jsx";

const useNotificationContext = () => {
    return useContext(NotificationContext);
}
export default useNotificationContext;