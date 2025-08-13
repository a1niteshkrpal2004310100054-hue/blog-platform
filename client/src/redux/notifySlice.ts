import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "@/type/blogType";

interface NotifyState {
  notifications: Notification[];
}

const initialState: NotifyState = {
  notifications: [],
};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    getNotifications: (state, action: PayloadAction<Notification[]>) => {
      if (action.payload) {
        state.notifications = action.payload;
      }
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications?.unshift(action.payload);
    },

    markAllReadNotification: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
    },

    deleteNotifications: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications?.filter(
        (notification) => notification._id !== action.payload
      );
    },
  },
});

export const {
  getNotifications,
  addNotification,
  markAllReadNotification,
  deleteNotifications,
} = notifySlice.actions;

export default notifySlice.reducer;
