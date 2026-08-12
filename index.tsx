import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, DeviceEventEmitter, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import WebViewScreen from './components/WebViewScreen';

const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0f172a',
  },
};

export interface DrawerRouteItem {
  name: string;
  url: string;
  icon: string;
  isMaterial?: boolean;
}

const MAIN_ITEMS: DrawerRouteItem[] = [
  { name: 'Dashboard', url: 'https://www.apnacareerai.in/dashboard', icon: 'home-outline', isMaterial: false },
  { name: 'Ask Doubt', url: 'https://www.apnacareerai.in/doubts/ask', icon: 'head-lightbulb-outline', isMaterial: true },
];

const CAREER_ITEMS: DrawerRouteItem[] = [
  { name: 'Resume Builder', url: 'https://www.apnacareerai.in/resume/builder', icon: 'document-text-outline', isMaterial: false },
  { name: 'Job Search', url: 'https://www.apnacareerai.in/jobs/search', icon: 'briefcase-outline', isMaterial: false },
  { name: 'Document Analyze', url: 'https://www.apnacareerai.in/uploads/upload', icon: 'cloud-upload-outline', isMaterial: false },
];

const PRACTICE_ITEMS: DrawerRouteItem[] = [
  { name: 'AI Quizzes', url: 'https://www.apnacareerai.in/quiz/', icon: 'help-circle-outline', isMaterial: false },
  { name: 'PYQ Repository', url: 'https://www.apnacareerai.in/pyq/', icon: 'library-outline', isMaterial: false },
];

const ENGAGE_ITEMS: DrawerRouteItem[] = [
  { name: 'Focus Timer', url: 'https://www.apnacareerai.in/engagement/timer', icon: 'timer-outline', isMaterial: false },
  { name: 'Exam Countdown', url: 'https://www.apnacareerai.in/engagement/exams', icon: 'calendar-outline', isMaterial: false },
  { name: 'My Notes', url: 'https://www.apnacareerai.in/engagement/notes', icon: 'journal-outline', isMaterial: false },
  { name: 'My Streak', url: 'https://www.apnacareerai.in/engagement/dashboard', icon: 'flame-outline', isMaterial: false },
  { name: 'Analytics', url: 'https://www.apnacareerai.in/engagement/analytics', icon: 'analytics-outline', isMaterial: false },
];

const COMMUNITY_ITEMS: DrawerRouteItem[] = [
  { name: 'Peer Study Rooms', url: 'https://www.apnacareerai.in/rooms/lobby', icon: 'people-outline', isMaterial: false },
  { name: 'Leaderboard', url: 'https://www.apnacareerai.in/engagement/leaderboard', icon: 'trophy-outline', isMaterial: false },
];

const ACCOUNT_ITEMS: DrawerRouteItem[] = [
  { name: 'My Account', url: 'https://www.apnacareerai.in/payments/account', icon: 'person-outline', isMaterial: false },
  { name: 'Doubt History', url: 'https://www.apnacareerai.in/doubts/history', icon: 'time-outline', isMaterial: false },
  { name: 'My Resumes', url: 'https://www.apnacareerai.in/resume/my-resumes', icon: 'documents-outline', isMaterial: false },
];

function CustomDrawerContent(props: any) {
  const { currentRoute, setCurrentRoute, isLoggedIn, userName, isPremium } = props;
  const [isCareerExpanded, setIsCareerExpanded] = useState(true);
  const [isPracticeExpanded, setIsPracticeExpanded] = useState(true);
  const [isEngageExpanded, setIsEngageExpanded] = useState(true);
  const [isCommunityExpanded, setIsCommunityExpanded] = useState(true);

  const renderItem = (item: DrawerRouteItem, isSubItem: boolean = false) => (
    <View key={item.name} style={isSubItem ? styles.subItemWrapper : undefined}>
      <DrawerItem
        label={item.name}
        icon={({ color, size }) =>
          item.isMaterial ? (
            <MaterialCommunityIcons name={item.icon as any} size={size} color={color} />
          ) : (
            <Ionicons name={item.icon as any} size={size} color={color} />
          )
        }
        focused={currentRoute.name === item.name}
        onPress={() => {
          setCurrentRoute({ ...item });
          props.navigation.closeDrawer();
        }}
        inactiveTintColor="#334155"
        activeTintColor="#2563eb"
        activeBackgroundColor="#eff6ff"
      />
    </View>
  );

  return (
    <DrawerContentScrollView {...props}>
      {isLoggedIn && (
        <View style={styles.drawerProfileContainer}>
          <Ionicons name="person-circle-outline" size={24} color="#b8860b" />
          <Text style={styles.drawerProfileText}>{userName}</Text>
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>PREMIUM</Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.drawerSeparator} />

      {/* Main Navigation Items */}
      {MAIN_ITEMS.map((item) => renderItem(item))}

      {/* Career Section Header & Accordion */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsCareerExpanded(!isCareerExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionTitleRow}>
            <Ionicons name="briefcase-outline" size={18} color="#8b5cf6" />
            <Text style={styles.sectionHeaderText}>CAREER</Text>
            <View style={styles.badgePurple}>
              <Text style={styles.badgePurpleText}>{CAREER_ITEMS.length}</Text>
            </View>
          </View>
          <Ionicons
            name={isCareerExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={18}
            color="#64748b"
          />
        </TouchableOpacity>

        {isCareerExpanded && (
          <View style={styles.sectionItemsContainer}>
            {CAREER_ITEMS.map((item) => renderItem(item, true))}
          </View>
        )}
      </View>

      {/* Practice Section Header & Accordion */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsPracticeExpanded(!isPracticeExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionTitleRow}>
            <Ionicons name="school-outline" size={18} color="#10b981" />
            <Text style={styles.sectionHeaderText}>PRACTICE</Text>
            <View style={styles.badgeGreen}>
              <Text style={styles.badgeGreenText}>{PRACTICE_ITEMS.length}</Text>
            </View>
          </View>
          <Ionicons
            name={isPracticeExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={18}
            color="#64748b"
          />
        </TouchableOpacity>

        {isPracticeExpanded && (
          <View style={styles.sectionItemsContainer}>
            {PRACTICE_ITEMS.map((item) => renderItem(item, true))}
          </View>
        )}
      </View>

      {/* Engage Section Header & Accordion */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsEngageExpanded(!isEngageExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionTitleRow}>
            <Ionicons name="flash-outline" size={18} color="#d97706" />
            <Text style={styles.sectionHeaderText}>ENGAGE</Text>
            <View style={styles.badgeOrange}>
              <Text style={styles.badgeOrangeText}>{ENGAGE_ITEMS.length}</Text>
            </View>
          </View>
          <Ionicons
            name={isEngageExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={18}
            color="#64748b"
          />
        </TouchableOpacity>

        {isEngageExpanded && (
          <View style={styles.sectionItemsContainer}>
            {ENGAGE_ITEMS.map((item) => renderItem(item, true))}
          </View>
        )}
      </View>

      {/* Community Section Header & Accordion */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsCommunityExpanded(!isCommunityExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.sectionTitleRow}>
            <Ionicons name="people-circle-outline" size={18} color="#0284c7" />
            <Text style={styles.sectionHeaderText}>COMMUNITY</Text>
            <View style={styles.badgeBlue}>
              <Text style={styles.badgeBlueText}>NEW</Text>
            </View>
          </View>
          <Ionicons
            name={isCommunityExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={18}
            color="#64748b"
          />
        </TouchableOpacity>

        {isCommunityExpanded && (
          <View style={styles.sectionItemsContainer}>
            {COMMUNITY_ITEMS.map((item) => renderItem(item, true))}
          </View>
        )}
      </View>

      {/* Account Section Divider */}
      <View style={styles.divider} />

      {ACCOUNT_ITEMS.map((item) => renderItem(item))}

      {/* Explicit Logout Button */}
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />}
        onPress={() => {
          setCurrentRoute({
            name: 'Logout',
            url: 'https://www.apnacareerai.in/auth/logout?t=' + Date.now(),
            icon: 'log-out-outline',
            isMaterial: false,
          });
          props.navigation.closeDrawer();
        }}
        inactiveTintColor="#ef4444"
        activeTintColor="#dc2626"
        focused={currentRoute.name === 'Logout'}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<DrawerRouteItem>(MAIN_ITEMS[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Profile');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const handleDeepLink = (url: string | null) => {
      if (!url) return;
      if (url.includes('reset_password') || url.includes('/auth/')) {
        let cleanUrl = url;
        if (cleanUrl.startsWith('com.karth.mybackup://')) {
          cleanUrl = cleanUrl.replace('com.karth.mybackup://', 'https://www.apnacareerai.in/');
        }
        // Ensure https://www.apnacareerai.in format
        if (cleanUrl.startsWith('https://apnacareerai.in')) {
          cleanUrl = cleanUrl.replace('https://apnacareerai.in', 'https://www.apnacareerai.in');
        } else if (cleanUrl.startsWith('http://apnacareerai.in')) {
          cleanUrl = cleanUrl.replace('http://apnacareerai.in', 'https://www.apnacareerai.in');
        }

        setCurrentRoute({
          name: cleanUrl.includes('reset_password') ? 'Reset Password' : 'Login',
          url: cleanUrl,
          icon: cleanUrl.includes('reset_password') ? 'key-outline' : 'person-outline',
          isMaterial: false,
        });
      }
    };

    Linking.getInitialURL().then(handleDeepLink);
    const linkingSub = Linking.addEventListener('url', (event) => handleDeepLink(event.url));

    const sub = DeviceEventEmitter.addListener('authStateChanged', (data) => {
      setIsLoggedIn(data.loggedIn);
      if (data.name) setUserName(data.name);
      if (data.premium !== undefined) setIsPremium(data.premium);
    });

    return () => {
      linkingSub.remove();
      sub.remove();
    };
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="light" />
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            currentRoute={currentRoute}
            setCurrentRoute={setCurrentRoute}
            isLoggedIn={isLoggedIn}
            userName={userName}
            isPremium={isPremium}
          />
        )}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#ffffff',
            width: 290,
          },
          headerTitle: currentRoute.name,
        }}
      >
        <Drawer.Screen name="Main">
          {(props) => <WebViewScreen {...props} currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);


const styles = StyleSheet.create({
  drawerProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbf3de',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#c49a1d',
  },
  drawerProfileText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#b8860b',
    marginLeft: 10,
  },
  premiumBadge: {
    backgroundColor: '#c49a1d',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 10,
  },
  premiumText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  drawerSeparator: {
    height: 10,
  },
  sectionContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  badgeOrange: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeOrangeText: {
    color: '#d97706',
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgePurple: {
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgePurpleText: {
    color: '#8b5cf6',
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgeGreen: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeGreenText: {
    color: '#059669',
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgeBlue: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeBlueText: {
    color: '#0284c7',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sectionItemsContainer: {
    marginTop: 4,
  },
  subItemWrapper: {
    paddingLeft: 10,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 10,
    paddingTop: 10,
    marginHorizontal: 10,
  },
});
