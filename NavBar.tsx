import { Text, StyleSheet, View, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function NavBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (screenName: string) => route.name === screenName;

  return (
    <View style={styles.navigationBar}>
      <Pressable onPress={() => navigation.navigate('Dashboard' as never)}>
        {({ pressed }) => (
          <Text
            style={[
              styles.navText,
              isActive('Dashboard') && styles.activeText,
              pressed && styles.pressed,
            ]}
          >
            Dashboard
          </Text>
        )}
      </Pressable>
      <Pressable onPress={() => navigation.navigate('NodeDetails' as never)}>
        {({ pressed }) => (
          <Text
            style={[
              styles.navText,
              isActive('NodeDetails') && styles.activeText,
              pressed && styles.pressed,
            ]}
          >
            Node Details
          </Text>
        )}
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Alerts' as never)}>
        {({ pressed }) => (
          <Text
            style={[
              styles.navText,
              isActive('Alerts') && styles.activeText,
              pressed && styles.pressed,
            ]}
          >
            Alerts
          </Text>
        )}
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile' as never)}>
        {({ pressed }) => (
          <Text
            style={[
              styles.navText,
              isActive('Profile') && styles.activeText,
              pressed && styles.pressed,
            ]}
          >
            Profile
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 80,
    paddingBottom: 20,
    backgroundColor: '#142140',
  },
  navText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 8,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default NavBar;
