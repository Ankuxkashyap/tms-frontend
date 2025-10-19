import api from "@/lib/api/api";
import {create} from "zustand";

type Notification = {
    message: string;
    taskId: string;
    read: boolean;
    user: string;
    _id: string;
    createdAt: string;
}

type res = {
    acknowledged: boolean;
}

interface NotificationStore {
    notifications: Notification[];
    getNotifications: () => void;
    showMoreNotifications: () => void;
    updateReadNotification: () => void;
    getNotifactionCount: () => number;
    addNotification: (notification: Notification) => void
}


const notificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],
    getNotifications: async () => {
        try {
            const res = await api.get("/notification");
            // console.log(res.data)
            const data = Array.isArray(res.data) ? res.data : res.data?.notifications || [];
            // console.log(data)
            set({ notifications: data });
        } catch (err) {
            console.error(err);
        }
    },
    addNotification: (notif) => {
    set((state) => ({ notifications: [notif, ...state.notifications] }));
    },

    showMoreNotifications: async () => {
        try {
            const res = await api.get("/notification/showMore");
            const data = Array.isArray(res.data) ? res.data : res.data?.notifications || [];
            set({ notifications: data });
        } catch (err) {
            console.error(err);
        }
    },
    updateReadNotification: async () => {
        try{
            // console.log("updateReadNotification");
            const res = await api.put("/notification/updateReadNotification") as res;
            if(res.acknowledged == true){
                get().getNotifications();
            }
        }catch(err){
            console.log(err);
        }
    },
    getNotifactionCount: () => {
        const notifications = get().notifications;
        const unReadCount = notifications.filter((notif) => !notif.read).length;
        return unReadCount;       
    }
}))
export default notificationStore;