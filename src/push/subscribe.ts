import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

const topicFor = (slug: string) => `podcast_${slug.replace(/[^a-zA-Z0-9-_.~%]/g, '_')}`;

/**
 * Subscribes to one FCM topic per show. Needs the native Firebase module, so it does nothing in
 * Expo Go and only works in a development build or the APK.
 */
export async function subscribeToShows(slugs: string[]): Promise<'subscribed' | 'unavailable'> {
  if (Platform.OS !== 'android' || Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    return 'unavailable';
  }
  try {
    const messaging = require('@react-native-firebase/messaging').default;
    const Notifications = require('expo-notifications');
    await Notifications.requestPermissionsAsync();
    await Notifications.setNotificationChannelAsync('episodes', {
      name: 'New episodes',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
    await Promise.all(slugs.map((slug) => messaging().subscribeToTopic(topicFor(slug))));
    return 'subscribed';
  } catch {
    return 'unavailable';
  }
}
