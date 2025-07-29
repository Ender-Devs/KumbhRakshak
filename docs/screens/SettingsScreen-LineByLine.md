# SettingsScreen Component - Line by Line Documentation

## 🎯 Purpose
Provides a comprehensive settings interface for the KumbhRakshak app. Manages user preferences, account settings, language switching, and app configuration with a clean, organized layout and orange theme consistency.

## 📄 File: `app/screens/SettingsScreen.jsx` (211 lines)

### **Lines 1-13: Import Dependencies**
```jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { UserStorage } from '../../utils/UserStorage';
import '../../global.css';
```
- **Line 1**: React core with useState hook for state management
- **Lines 2-10**: React Native components:
  - `View`: Layout container component
  - `Text`: Text display component
  - `ScrollView`: Scrollable content container
  - `TouchableOpacity`: Pressable button component
  - `Switch`: Toggle switch component for settings
  - `Alert`: Native alert dialog system
  - `StatusBar`: Status bar configuration component
- **Line 11**: FontAwesome6 icon library for settings icons
- **Line 12**: i18next translation hook for bilingual support
- **Line 13**: UserStorage utility for data persistence
- **Line 14**: Global CSS import for NativeWind styling

### **Lines 15-19: Component Declaration and State**
```jsx
export default function SettingsScreen() {
  const { i18n, t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
```
- **Line 15**: Component function declaration
- **Line 16**: Extract translation function and i18n object
- **Line 17**: State for notifications toggle (default: enabled)
- **Line 18**: State for location services toggle (default: enabled)
- **Line 19**: State for dark mode toggle (default: disabled)

### **Lines 21-24: Language Toggle Function**
```jsx
const toggleLanguage = () => {
  const newLang = i18n.language === 'en' ? 'hi' : 'en';
  i18n.changeLanguage(newLang);
};
```
- **Line 21**: Function to switch between English and Hindi
- **Line 22**: Determine new language using ternary operator
- **Line 23**: Execute language change using i18next method

### **Lines 26-39: Logout Handler Function**
```jsx
const handleLogout = () => {
  Alert.alert(
    t('settings.logout') || 'Logout',
    t('settings.logoutConfirm') || 'Are you sure you want to logout?',
    [
      { text: t('common.cancel') || 'Cancel', style: 'cancel' },
      {
        text: t('settings.logout') || 'Logout',
        style: 'destructive',
        onPress: async () => {
          await UserStorage.clearAllData();
          Alert.alert(t('common.success') || 'Success', t('settings.logoutSuccess') || 'Logged out successfully. Please restart the app.');
        },
      },
    ]
  );
};
```
- **Line 26**: Function to handle user logout
- **Lines 27-29**: Confirmation alert with translated text
- **Lines 30-31**: Cancel button with cancel style
- **Lines 32-37**: Logout button with destructive style:
  - Clear all user data using UserStorage
  - Show success message after logout
- **Line 38**: Fallback translations for undefined keys

### **Lines 41-58: SettingItem Component**
```jsx
const SettingItem = ({ icon, title, subtitle, rightComponent, onPress, iconColor = '#FF6B35', textColor = '#1F2937' }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-2xl p-4 mb-3 shadow-lg border border-gray-100 active:bg-orange-50"
    activeOpacity={0.8}>
    <View className="flex-row items-center">
      <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mr-4">
        <FontAwesome6 name={icon} size={18} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-base" style={{color: textColor}}>{title}</Text>
        {subtitle && (
          <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
        )}
      </View>
      {rightComponent}
    </View>
  </TouchableOpacity>
);
```
- **Line 41**: Reusable setting item component with props:
  - `icon`: FontAwesome6 icon name
  - `title`: Setting title text
  - `subtitle`: Optional description text
  - `rightComponent`: Right-side component (switch, arrow, etc.)
  - `onPress`: Touch handler function
  - `iconColor`: Custom icon color (default: orange)
  - `textColor`: Custom text color (default: dark gray)
- **Lines 42-45**: TouchableOpacity with white background and orange active state
- **Line 46**: Horizontal layout for setting item content
- **Lines 47-49**: Icon container with orange background circle
- **Lines 50-55**: Text content section with title and optional subtitle
- **Line 56**: Right component area (switches, arrows, etc.)

### **Lines 60-62: SectionHeader Component**
```jsx
const SectionHeader = ({ title }) => (
  <Text className="font-bold text-lg mb-4 px-2" style={{color: '#FF6B35'}}>{title}</Text>
);
```
- **Line 60**: Reusable section header component
- **Line 61**: Orange-colored text with bold styling and bottom margin

### **Lines 64-72: Screen Container and Header**
```jsx
return (
  <View className="flex-1 bg-gray-50">
    <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
    
    {/* Header */}
    <View className="bg-gradient-to-r from-orange-500 to-red-500 px-6 pt-12 pb-6 shadow-lg">
      <Text className="text-2xl font-bold text-white">{t('settings.title') || 'Settings'}</Text>
      <Text className="text-orange-100 mt-1">{t('settings.subtitle') || 'Customize your app experience'}</Text>
    </View>
```
- **Line 64**: Return JSX for screen rendering
- **Line 65**: Full-screen container with light gray background
- **Line 66**: Status bar configuration with dark content
- **Line 69**: Gradient header with orange-to-red theme and shadow
- **Line 70**: Main screen title with large, bold white text
- **Line 71**: Subtitle with light orange color

### **Lines 73-76: ScrollView and Preferences Section**
```jsx
<ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
  {/* Preferences Section */}
  <SectionHeader title="Preferences" />
  
```
- **Line 73**: Scrollable content container with padding
- **Line 75**: Preferences section header

### **Lines 77-88: Notifications Setting**
```jsx
<SettingItem
  icon="bell"
  title="Notifications"
  subtitle="Receive emergency alerts and updates"
  iconColor="#3B82F6"
  rightComponent={
    <Switch
      value={notificationsEnabled}
      onValueChange={setNotificationsEnabled}
      trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
      thumbColor={notificationsEnabled ? '#FFFFFF' : '#9CA3AF'}
    />
  }
/>
```
- **Lines 77-82**: Notifications setting with bell icon and blue color
- **Lines 83-87**: Switch component:
  - Controlled by notificationsEnabled state
  - Blue track color when enabled
  - White thumb when enabled, gray when disabled

### **Lines 90-101: Location Services Setting**
```jsx
<SettingItem
  icon="location-dot"
  title="Location Services"
  subtitle="Enable location for better emergency response"
  iconColor="#10B981"
  rightComponent={
    <Switch
      value={locationEnabled}
      onValueChange={setLocationEnabled}
      trackColor={{ false: '#E5E7EB', true: '#10B981' }}
      thumbColor={locationEnabled ? '#FFFFFF' : '#9CA3AF'}
    />
  }
/>
```
- **Lines 90-94**: Location setting with location-dot icon and green color
- **Lines 95-100**: Switch component with green theme for location services

### **Lines 103-114: Dark Mode Setting**
```jsx
<SettingItem
  icon="moon"
  title="Dark Mode"
  subtitle="Switch to dark theme"
  iconColor="#6366F1"
  rightComponent={
    <Switch
      value={darkModeEnabled}
      onValueChange={setDarkModeEnabled}
      trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
      thumbColor={darkModeEnabled ? '#FFFFFF' : '#9CA3AF'}
    />
  }
/>
```
- **Lines 103-107**: Dark mode setting with moon icon and indigo color
- **Lines 108-113**: Switch component with indigo theme for dark mode

### **Lines 116-131: Language Setting**
```jsx
<SettingItem
  icon="language"
  title="Language"
  subtitle={`Current: ${i18n.language === 'en' ? 'English' : 'हिंदी'}`}
  iconColor="#F59E0B"
  onPress={toggleLanguage}
  rightComponent={
    <View className="flex-row items-center">
      <Text className="text-blue-600 font-medium mr-2">
        {i18n.language === 'en' ? 'हिंदी' : 'English'}
      </Text>
      <FontAwesome6 name="chevron-right" size={14} color="#6B7280" />
    </View>
  }
/>
```
- **Lines 116-120**: Language setting with language icon and amber color
- **Line 119**: Dynamic subtitle showing current language
- **Line 121**: OnPress handler for language toggle
- **Lines 122-130**: Right component showing next language and chevron arrow

### **Lines 133-149: Account Section**
```jsx
{/* Account Section */}
<SectionHeader title="Account" />

<SettingItem
  icon="user-pen"
  title="Edit Profile"
  subtitle="Update your personal information"
  iconColor="#8B5CF6"
  onPress={() => Alert.alert('Coming Soon', 'Profile editing feature will be available soon.')}
  rightComponent={<FontAwesome6 name="chevron-right" size={14} color="#6B7280" />}
/>

<SettingItem
  icon="shield-halved"
  title="Privacy & Security"
  subtitle="Manage your privacy settings"
  iconColor="#EF4444"
  onPress={() => Alert.alert('Coming Soon', 'Privacy settings will be available soon.')}
  rightComponent={<FontAwesome6 name="chevron-right" size={14} color="#6B7280" />}
/>
```
- **Line 134**: Account section header
- **Lines 136-142**: Edit profile setting with purple icon and coming soon alert
- **Lines 144-150**: Privacy & security setting with red icon and placeholder functionality

### **Lines 152-177: Support Section**
```jsx
{/* Support Section */}
<SectionHeader title="Support" />

<SettingItem
  icon="circle-question"
  title="Help & Support"
  subtitle="Get help and contact support"
  iconColor="#06B6D4"
  onPress={() => Alert.alert('Help', 'For emergency: Call 100\nFor support: Contact your local administrator')}
  rightComponent={<FontAwesome6 name="chevron-right" size={14} color="#6B7280" />}
/>

<SettingItem
  icon="star"
  title="Rate App"
  subtitle="Share your feedback"
  iconColor="#F59E0B"
  onPress={() => Alert.alert('Thank You!', 'Your feedback helps us improve Kumbh Rakshak.')}
  rightComponent={<FontAwesome6 name="chevron-right" size={14} color="#6B7280" />}
/>

<SettingItem
  icon="circle-info"
  title="About"
  subtitle="App version and information"
  iconColor="#6B7280"
  onPress={() => Alert.alert('Kumbh Rakshak', 'Version 1.0.0\nSafety, Cleanliness and Community Seva')}
  rightComponent={<FontAwesome6 name="chevron-right" size={14} color="#6B7280" />}
/>
```
- **Line 153**: Support section header
- **Lines 155-161**: Help & support with cyan icon and emergency contact info
- **Lines 163-169**: Rate app setting with star icon and feedback message
- **Lines 171-177**: About setting with gray icon and app version info

### **Lines 179-193: Logout Button**
```jsx
{/* Logout Button */}
<View className="mt-8 mb-8">
  <TouchableOpacity
    onPress={handleLogout}
    className="bg-red-500 rounded-2xl p-4 items-center shadow-sm active:bg-red-600"
    activeOpacity={0.8}>
    <View className="flex-row items-center">
      <FontAwesome6 name="arrow-right-from-bracket" size={18} color="white" />
      <Text className="text-white font-semibold text-base ml-3">Logout</Text>
    </View>
  </TouchableOpacity>
</View>
```
- **Line 180**: Container with top and bottom margin for spacing
- **Lines 181-185**: Red logout button with shadow and active state
- **Lines 186-189**: Horizontal layout with logout icon and text

### **Lines 194-211: Component Closing**
```jsx
      </ScrollView>
    </View>
  );
}
```
- **Line 194**: Close ScrollView container
- **Line 195**: Close main View container
- **Line 196**: Close return statement
- **Line 197**: Close component function

## 🎨 Visual Design Features

### **Color Scheme**
- **Header**: Orange-to-red gradient for brand consistency
- **Background**: Light gray (#F9FAFB) for screen background
- **Cards**: White background with gray borders
- **Icons**: Color-coded by category:
  - Notifications: Blue (#3B82F6)
  - Location: Green (#10B981)
  - Dark Mode: Indigo (#6366F1)
  - Language: Amber (#F59E0B)
  - Profile: Purple (#8B5CF6)
  - Security: Red (#EF4444)
  - Help: Cyan (#06B6D4)
  - Rating: Amber (#F59E0B)
  - About: Gray (#6B7280)

### **Typography Hierarchy**
- **Screen Title**: 2xl, bold, white for header
- **Section Headers**: lg, bold, orange for categorization
- **Setting Titles**: Base, semibold, dark gray
- **Subtitles**: sm, regular, muted gray
- **Button Text**: Base, semibold, white

### **Interactive Elements**
- **Switches**: Color-coded track and thumb states
- **Touch Feedback**: Orange active state for setting items
- **Chevron Icons**: Consistent right arrows for navigable items

## ⚙️ Settings Categories

### **Preferences**
- **Notifications**: Toggle emergency alerts and updates
- **Location Services**: Enable GPS for emergency response
- **Dark Mode**: Theme switching (future implementation)
- **Language**: English ⇄ Hindi toggle

### **Account**
- **Edit Profile**: Personal information management (planned)
- **Privacy & Security**: Privacy settings management (planned)

### **Support**
- **Help & Support**: Emergency contacts and support info
- **Rate App**: Feedback collection
- **About**: App version and mission information

## 🌐 Internationalization Features

1. **Dynamic Language Display**: Shows current and next language
2. **Translation Fallbacks**: Default English text if translation missing
3. **Persistent Language**: Uses i18next for language persistence
4. **Bilingual Context**: All text supports English/Hindi switching

## 🔧 State Management

### **Toggle States**
- **Notifications**: Boolean state for push notification preferences
- **Location**: Boolean state for GPS service permissions
- **Dark Mode**: Boolean state for theme switching (future use)

### **Language State**
- **Current Language**: Managed by i18next
- **Display Logic**: Shows appropriate language options

## ⚡ Performance Considerations

1. **Reusable Components**: SettingItem and SectionHeader reduce code duplication
2. **Optimized Rendering**: Static setting definitions with dynamic state
3. **Efficient Icons**: FontAwesome6 icons with appropriate sizes
4. **Smooth Scrolling**: ScrollView for content overflow handling
5. **Touch Optimization**: Appropriate activeOpacity values

## 🧪 Testing Scenarios

1. **Switch Toggles**: Test all toggle switches work correctly
2. **Language Switching**: Verify language changes update immediately
3. **Logout Flow**: Test logout confirmation and data clearing
4. **Alert Messages**: Verify all alert dialogs display correctly
5. **Visual Hierarchy**: Test color coding and section organization
6. **Scrolling**: Test content scrolling on different screen sizes

## 🔮 Future Enhancements

1. **Profile Editing**: Implement actual profile management
2. **Privacy Settings**: Add detailed privacy controls
3. **Dark Mode**: Implement actual theme switching
4. **Push Notifications**: Connect to FCM for actual notifications
5. **Advanced Settings**: Add more customization options

---

**📅 Last Updated**: July 29, 2025  
**🔧 Dependencies**: React Native, i18next, UserStorage, FontAwesome6  
**🎯 Usage**: Settings management in bottom tab navigation
