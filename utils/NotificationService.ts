import notifee, { AndroidImportance } from '@notifee/react-native';

const DEFAULT_CHANNEL_ID = 'ARCOM_ALERTS';
const CRITICAL_CHANNEL_ID = 'CRITICAL_ALERTS';

// Initialize local push notifications
export const initNotifications = async () => {
  try {
    await notifee.requestPermission();

    await notifee.createChannel({
      id: DEFAULT_CHANNEL_ID,
      name: 'Drainage Alerts',
      description: 'Real-time drainage system alerts and notifications',
      importance: AndroidImportance.HIGH,
      vibration: true,
      sound: 'default',
    });

    await notifee.createChannel({
      id: CRITICAL_CHANNEL_ID,
      name: 'Critical Alerts',
      description: 'Critical overflow and clog alerts',
      importance: AndroidImportance.HIGH,
      vibration: true,
      sound: 'default',
    });
  } catch (error) {
    console.error('Failed to initialize notifications', error);
  }
};

// Send local notification for alert
export const sendAlertNotification = (
  title: string,
  message: string,
  data?: Record<string, unknown>,
  isCritical: boolean = false
) => {
  void notifee.displayNotification({
    title,
    body: message,
    data: {
      ...(data ?? {}),
      source: 'ARCOM System',
    },
    android: {
      channelId: isCritical ? CRITICAL_CHANNEL_ID : DEFAULT_CHANNEL_ID,
      smallIcon: 'ic_launcher',
      color: isCritical ? '#ef4444' : '#3b82f6',
      pressAction: {
        id: 'default',
      },
      importance: AndroidImportance.HIGH,
      vibrationPattern: isCritical ? [300, 500, 300, 500] : [200, 300],
    },
  }).catch((error) => {
    console.error('Failed to show notification', error);
  });
};

export const sendTestNotification = () => {
  sendAlertNotification(
    'Push Test',
    'ARCOM notifications are enabled on this device.',
    { type: 'test' },
    false
  );
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
