# ProfileScreen Component - Line by Line Documentation

## 🎯 Purpose
Provides a comprehensive user profile interface for the KumbhRakshak app. Displays user information, account statistics, profile management options, and app information with a clean, card-based layout.

## 📄 File: `app/screens/ProfileScreen.jsx` (191 lines)

### **Lines 1-7: Import Dependencies**
```jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserStorage } from '../../utils/UserStorage';
import '../../global.css';
```
- **Line 1**: React core with useEffect and useState hooks
- **Line 2**: React Native components for UI layout and interactions
- **Line 3**: Navigation hook for screen navigation
- **Line 4**: SafeAreaView for handling device notches and status bars
- **Line 5**: FontAwesome6 icon library for profile icons
- **Line 6**: UserStorage utility for user data management
- **Line 7**: Global CSS import for NativeWind styling

### **Lines 9-11: Component Declaration and State**
```jsx
export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
```
- **Line 9**: Component function declaration
- **Line 10**: Navigation hook for screen navigation functionality
- **Line 11**: State for storing user data (initially null)

### **Lines 13-23: Load User Data Effect**
```jsx
useEffect(() => {
  loadUserData();
}, []);

const loadUserData = async () => {
  try {
    const data = await UserStorage.getUserData();
    setUserData(data);
  } catch (error) {
    console.error('Error loading user data:', error);
  }
};
```
- **Lines 13-15**: useEffect to load user data on component mount
- **Lines 17-23**: Async function to retrieve and set user data:
  - Uses UserStorage to get stored user information
  - Updates userData state with retrieved data
  - Handles errors gracefully with console logging

### **Lines 25-36: Clear Data Handler**
```jsx
const handleLogout = () => {
  Alert.alert('Clear Data', 'This will clear all your stored data. Are you sure?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Clear',
      style: 'destructive',
      onPress: async () => {
        await UserStorage.clearUserData();
        Alert.alert('Success', 'Data cleared successfully. Restart the app to register again.');
      },
    },
  ]);
};
```
- **Line 25**: Function to handle data clearing (debug functionality)
- **Lines 26-27**: Confirmation alert with warning message
- **Line 28**: Cancel button with cancel style
- **Lines 29-34**: Clear button with destructive style:
  - Clears user data using UserStorage
  - Shows success message after clearing

### **Lines 38-60: Profile Options Configuration**
```jsx
const profileOptions = [
  {
    icon: 'user-pen',
    title: 'Edit Profile',
    subtitle: 'Update your personal information',
    action: () => {},
  },
  {
    icon: 'bell',
    title: 'Notifications',
    subtitle: 'Manage your notification preferences',
    action: () => {},
  },
  {
    icon: 'shield-halved',
    title: 'Privacy & Security',
    subtitle: 'Manage your privacy settings',
    action: () => {},
  },
  {
    icon: 'headset',
    title: 'Help & Support',
    subtitle: 'Get help and contact support',
    action: () => {},
  },
  {
    icon: 'cog',
    title: 'Settings',
    subtitle: 'App preferences and configurations',
    action: () => navigation.navigate('Settings'),
  },
];
```
- **Lines 38-60**: Array of profile menu options:
  - **Edit Profile**: User information editing (placeholder)
  - **Notifications**: Notification preferences (placeholder)
  - **Privacy & Security**: Privacy settings (placeholder)
  - **Help & Support**: Support options (placeholder)
  - **Settings**: Navigate to settings screen (functional)

### **Lines 62-70: Screen Container and Header**
```jsx
return (
  <SafeAreaView className="flex-1 bg-gray-50">
    {/* Status bar background replacement */}
    <View className="h-0 bg-gray-50" />

    {/* Header */}
    <View className="border-b border-gray-200 bg-white px-6 py-4">
      <Text className="text-3xl font-bold text-gray-800">Profile</Text>
      <Text className="mt-1 text-gray-600">Manage your account and preferences</Text>
    </View>
```
- **Line 62**: Return JSX for screen rendering
- **Line 63**: SafeAreaView with full screen height and light gray background
- **Line 65**: Zero-height View for status bar background consistency
- **Lines 67-70**: Header section with white background and bottom border
- **Line 68**: Main screen title with large, bold typography
- **Line 69**: Subtitle describing screen purpose

### **Lines 72-78: User Info Card Container**
```jsx
<ScrollView className="flex-1">
  {/* User Info Card */}
  <View className="mx-6 mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
    <View className="items-center">
      {/* Avatar */}
      <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-kumbhblue-600 shadow-medium">
        <FontAwesome6 name="user" size={36} color="white" />
      </View>
```
- **Line 72**: ScrollView container for scrollable content
- **Line 74**: User info card with white background, rounded corners, and shadow
- **Line 75**: Centered alignment for user info content
- **Lines 77-79**: Circular avatar with Kumbh blue background and user icon

### **Lines 81-96: User Details Display**
```jsx
{/* User Details */}
{userData ? (
  <View className="items-center">
    <Text className="text-2xl font-bold text-gray-800">{userData.name}</Text>
    <Text className="mt-1 text-lg text-gray-600">{userData.phone}</Text>
    <View className="mt-3 rounded-full bg-kumbhgreen-100 px-3 py-1">
      <Text className="text-sm font-medium text-kumbhgreen-700">Verified User</Text>
    </View>
  </View>
) : (
  <View className="items-center">
    <Text className="text-xl text-gray-500">Loading...</Text>
  </View>
)}
```
- **Lines 82-90**: Conditional rendering when userData exists:
  - **Line 84**: User name with large, bold typography
  - **Line 85**: Phone number with medium size and muted color
  - **Lines 86-88**: Verification badge with green background
- **Lines 91-94**: Loading state when userData is null

### **Lines 98-113: Stats Row**
```jsx
{/* Stats Row */}
<View className="mt-6 flex-row justify-around border-t border-gray-200 pt-6">
  <View className="items-center">
    <Text className="text-2xl font-bold text-kumbhblue-600">0</Text>
    <Text className="text-sm text-gray-600">Reports</Text>
  </View>
  <View className="items-center">
    <Text className="text-2xl font-bold text-kumbhgreen-600">5</Text>
    <Text className="text-sm text-gray-600">Points</Text>
  </View>
  <View className="items-center">
    <Text className="text-2xl font-bold text-kumbhgold-600">New</Text>
    <Text className="text-sm text-gray-600">Member</Text>
  </View>
</View>
```
- **Line 99**: Stats container with top border and equal spacing
- **Lines 100-104**: Reports stat with blue color and count
- **Lines 105-109**: Points stat with green color and count
- **Lines 110-114**: Member status with gold color and badge

### **Lines 117-121: Profile Options Header**
```jsx
{/* Profile Options */}
<View className="mx-6 mt-6">
  <Text className="mb-4 text-xl font-bold text-gray-800">Account Options</Text>

  <View className="space-y-3">
```
- **Line 118**: Profile options section container
- **Line 119**: Section title with large, bold typography
- **Line 121**: Container with vertical spacing between option cards

### **Lines 122-141: Profile Option Cards**
```jsx
{profileOptions.map((option, index) => (
  <TouchableOpacity
    key={index}
    onPress={option.action}
    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-soft"
    activeOpacity={0.8}>
    <View className="flex-row items-center">
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-kumbhblue-50">
        <FontAwesome6 name={option.icon} size={20} color="#204B72" />
      </View>

      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-gray-800">{option.title}</Text>
        <Text className="mt-1 text-sm text-gray-600">{option.subtitle}</Text>
      </View>

      <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
    </View>
  </TouchableOpacity>
))}
```
- **Line 122**: Map through profile options array
- **Lines 123-127**: TouchableOpacity card with white background and shadow
- **Line 128**: Horizontal layout for option content
- **Lines 129-131**: Icon container with light blue background
- **Lines 133-136**: Text content with title and subtitle
- **Line 138**: Chevron right arrow for navigation indication

### **Lines 144-170: App Information Section**
```jsx
{/* App Info */}
<View className="mx-6 mb-6 mt-6">
  <View className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
    <Text className="mb-4 text-lg font-bold text-gray-800">App Information</Text>

    <View className="space-y-3">
      <View className="flex-row justify-between">
        <Text className="text-gray-600">Version</Text>
        <Text className="font-medium text-gray-800">1.0.0</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-600">Last Updated</Text>
        <Text className="font-medium text-gray-800">July 2025</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-600">Build</Text>
        <Text className="font-medium text-gray-800">1.0.0 (1)</Text>
      </View>
    </View>
```
- **Line 145**: App info section container
- **Line 146**: Card container with white background and shadow
- **Line 147**: Section title with large, bold typography
- **Lines 149-160**: App information rows:
  - **Lines 150-153**: App version display
  - **Lines 154-157**: Last updated date
  - **Lines 158-161**: Build number information

### **Lines 163-176: Debug Clear Data Button**
```jsx
{/* Debug Clear Data Button */}
{__DEV__ && (
  <TouchableOpacity
    onPress={handleLogout}
    className="mt-6 border-t border-gray-200 pt-4">
    <View className="flex-row items-center justify-center">
      <FontAwesome6 name="trash" size={16} color="#DC2626" />
      <Text className="ml-2 font-medium text-red-600">Clear All Data (Debug)</Text>
    </View>
  </TouchableOpacity>
)}
```
- **Line 164**: Conditional rendering only in development mode
- **Lines 165-175**: Debug button for clearing all data:
  - Top border to separate from app info
  - Trash icon with red color
  - Clear warning text in red

### **Lines 177-191: Component Closing**
```jsx
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}
```
- **Lines 177-182**: Close nested container components
- **Line 183**: Close ScrollView
- **Line 184**: Close SafeAreaView
- **Line 185**: Close return statement
- **Line 186**: Close component function

## 🎨 Visual Design Features

### **Color Scheme**
- **Background**: Light gray (#F9FAFB) for screen background
- **Cards**: White background with gray borders
- **Avatar**: Kumbh blue (#204B72) background
- **Stats Colors**:
  - Reports: Blue (#204B72)
  - Points: Green (#059669)
  - Member Status: Gold (#F59E0B)
- **Verification Badge**: Green background (#D1FAE5) with green text
- **Option Icons**: Light blue background with dark blue icons

### **Typography Hierarchy**
- **Screen Title**: 3xl, bold (24px equivalent)
- **User Name**: 2xl, bold (20px equivalent)
- **Section Titles**: xl, bold (18px equivalent)
- **Option Titles**: lg, semibold (16px equivalent)
- **Stats Numbers**: 2xl, bold for prominence
- **Subtitles and Labels**: sm and base sizes with muted colors

### **Card Design**
- **Rounded Corners**: 2xl radius (16px) for modern appearance
- **Soft Shadows**: Subtle depth without overwhelming
- **White Backgrounds**: Clean contrast against gray background
- **Proper Spacing**: Consistent padding and margins

## 👤 User Information Display

### **Avatar Section**
- **Circular Design**: 96px (24 × 24) circle with user icon
- **Brand Color**: Kumbh blue background for consistency
- **Shadow Effect**: Medium shadow for depth

### **User Details**
- **Name Display**: Large, bold typography for prominence
- **Phone Number**: Secondary information with muted color
- **Verification Status**: Green badge for trust indication

### **Statistics Row**
- **Reports Count**: Track user activity (cleanliness reports, SOS, etc.)
- **Points System**: Gamification element for user engagement
- **Member Status**: User level indication (New, Active, Verified, etc.)

## 🔧 Profile Options

### **Available Options**
1. **Edit Profile**: Personal information management (placeholder)
2. **Notifications**: Push notification preferences (placeholder)
3. **Privacy & Security**: Privacy settings management (placeholder)
4. **Help & Support**: Support and contact options (placeholder)
5. **Settings**: App configuration (functional navigation)

### **Visual Design**
- **Icon Consistency**: All icons use same size and color scheme
- **Action Indication**: Chevron arrows show navigable items
- **Touch Feedback**: 0.8 activeOpacity for smooth interactions

## 📱 App Information

### **Version Details**
- **Current Version**: 1.0.0 for release tracking
- **Last Updated**: July 2025 for update awareness
- **Build Number**: 1.0.0 (1) for technical details

### **Debug Features**
- **Development Only**: Clear data button only in __DEV__ mode
- **Data Management**: Easy way to reset app state during testing
- **Visual Warning**: Red color to indicate destructive action

## ⚡ Performance Considerations

1. **Async Data Loading**: Efficient user data retrieval
2. **Conditional Rendering**: Optimized loading states
3. **Static Options**: Profile options defined outside render
4. **Optimized Icons**: FontAwesome6 icons with appropriate sizes
5. **Smooth Scrolling**: ScrollView for content overflow handling

## 🧪 Testing Scenarios

1. **Data Loading**: Test user data retrieval and display
2. **Navigation**: Verify settings navigation works
3. **Debug Functions**: Test clear data functionality in development
4. **Loading States**: Verify loading display when userData is null
5. **Visual Layout**: Test card layouts and spacing
6. **Touch Interactions**: Verify all touchable elements respond

## 🔮 Future Enhancements

1. **Profile Editing**: Implement actual profile editing functionality
2. **Avatar Upload**: Allow users to upload profile pictures
3. **Activity History**: Show detailed user activity timeline
4. **Achievement System**: Expand points and badges system
5. **Social Features**: Add friend connections and sharing
6. **Real Statistics**: Connect to actual user activity data

---

**📅 Last Updated**: July 29, 2025  
**🔧 Dependencies**: React Native, React Navigation, UserStorage, FontAwesome6  
**🎯 Usage**: User profile management in bottom tab navigation
