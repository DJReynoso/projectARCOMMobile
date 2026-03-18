import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

// Initialize push notification
export const initNotifications = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * Android only
     * default: "ic_launcher"
     * You can use `react-native-vector-icons` to automate this step.
     */
    largeIcon: 'ic_launcher',

    /**
     * Android only
     * default: "ic_notification"
     */
    smallIcon: 'ic_notification',

    /**
     * Android only
     * default: true
     * Set notification color. This is an Android-only property that works with android 5.0+
     */
    color: '#3b82f6',

    /**
     * Android only
     * Set the vibration pattern for notifications
     */
    vibrate: true,

    /**
     * Android only
     * default: true
     * Enable or disable vibration
     */
    vibration: 300,

    /**
     * Android only
     * default: true
     * Enable or disable notification sounds
     */
    soundName: 'default',

    /**
     * Android and iOS
     * -1 is infinite, default: -1
     */
    playSound: true,

    /**
     * Android only
     * Channels to be created for notifications
     */
    channelId: 'ARCOM_ALERTS',
    channelName: 'Drainage Alerts',
    channelDescription: 'Real-time drainage system alerts and notifications',
  });

  // Create notification channel for Android 8+
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'ARCOM_ALERTS',
        channelName: 'Drainage Alerts',
        channelDescription: 'Real-time drainage system alerts and notifications',
        playSound: true,
        soundName: 'default',
        importance: 4, // high importance
        vibrate: true,
      },
      (created) => console.log(`CreateChannel returned '${created}'`)
    );

    // Critical alerts channel
    PushNotification.createChannel(
      {
        channelId: 'CRITICAL_ALERTS',
        channelName: 'Critical Alerts',
        channelDescription: 'Critical overflow and clog alerts',
        playSound: true,
        soundName: 'default',
        importance: 5, // max importance
        vibrate: true,
      },
      (created) => console.log(`CreateChannel returned '${created}'`)
    );
  }
};

// Send local notification for alert
export const sendAlertNotification = (
  title: string,
  message: string,
  data?: any,
  isCritical: boolean = false
) => {
  PushNotification.localNotification({
    channelId: isCritical ? 'CRITICAL_ALERTS' : 'ARCOM_ALERTS',
    title: title,
    message: message,
    bigText: message,
    subText: 'ARCOM System',
    soundName: isCritical ? 'default' : 'default',
    playSound: true,
    vibrate: isCritical ? [0, 500, 250, 500] : [0, 300], // longer vibration for critical
    priority: isCritical ? 'high' : 'default',
    visibility: 'public',
    autoCancel: true,
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_notification',
    color: isCritical ? '#ef4444' : '#3b82f6', // red for critical, blue for normal
    data: data || {},
    // Android-specific
    ...Platform.select({
      android: {
        ongoing: false,
        number: 1,
      },
    }),
  });
};

// Send notification for task update
export const sendTaskNotification = (taskTitle: string, status: string) => {
  const statusConfig: Record<string, { icon: string; color: string }> = {
    pending: { icon: '⏳', color: '#fbbf24' },
    ongoing: { icon: '🔄', color: '#f97316' },
    resolved: { icon: '✅', color: '#10b981' },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const isCritical = status === 'pending';

  sendAlertNotification(
    'Task Update',
    `${config.icon} ${taskTitle}\nStatus: ${status.toUpperCase()}`,
    { taskTitle, status },
    isCritical
  );
};

// Send notification for live alert
export const sendLiveAlertNotification = (
  sensorId: string,
  mlState: string,
  eta?: string
) => {
  const stateConfig: Record<string, { title: string; emoji: string; critical: boolean }> = {
    overflow: { title: 'OVERFLOW ALERT', emoji: '🚨', critical: true },
    clogged: { title: 'CLOGGED', emoji: '⛔', critical: true },
    at_risk: { title: 'AT RISK', emoji: '⚠️', critical: true },
    warning: { title: 'WARNING', emoji: '⚡', critical: false },
    optimal: { title: 'OPTIMAL', emoji: '✅', critical: false },
  };

  const config = stateConfig[mlState] || { title: 'ALERT', emoji: '🔔', critical: false };

  const message = eta ? `${sensorId}\n${eta}` : sensorId;

  sendAlertNotification(
    `${config.emoji} ${config.title}`,
    message,
    { sensorId, mlState, eta },
    config.critical
  );
};

export default PushNotification;
