# EmergencyScreen Component - Line by Line Documentation

## 🎯 Purpose
Provides a comprehensive emergency services interface for the KumbhRakshak app. Displays emergency contact numbers, quick action buttons for location sharing and alerts, plus safety tips for users during the Kumbh Mela.

## 📄 File: `app/screens/EmergencyScreen.jsx` (117 lines)

### **Lines 1-5: Import Dependencies**
```jsx
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../../global.css';
```
- **Line 1**: React Native UI components:
  - `Text`: Text display component
  - `View`: Layout container component
  - `TouchableOpacity`: Pressable button component
  - `ScrollView`: Scrollable content container
- **Line 2**: React core library for component creation
- **Line 3**: SafeAreaView for handling device notches and status bars
- **Line 4**: FontAwesome6 icon library for emergency icons
- **Line 5**: Global CSS import for NativeWind styling system

### **Lines 7-13: Emergency Contacts Data**
```jsx
export default function EmergencyScreen() {
  const emergencyContacts = [
    { name: 'Police', number: '100', icon: 'shield-halved', color: 'blue' },
    { name: 'Ambulance', number: '108', icon: 'truck-medical', color: 'red' },
    { name: 'Fire Brigade', number: '101', icon: 'fire-flame-curved', color: 'orange' },
    { name: 'Disaster Management', number: '1078', icon: 'triangle-exclamation', color: 'purple' },
  ];
```
- **Line 7**: Component function declaration
- **Lines 8-13**: Emergency contacts array with Indian emergency numbers:
  - **Police (100)**: Primary law enforcement with shield icon and blue theme
  - **Ambulance (108)**: Medical emergency service with medical truck icon and red theme
  - **Fire Brigade (101)**: Fire emergency service with flame icon and orange theme
  - **Disaster Management (1078)**: Natural disaster response with warning icon and purple theme

### **Lines 15-23: Color Mapping Function**
```jsx
const getColorClasses = (color) => {
  const colors = {
    blue: 'bg-blue-500 border-blue-600',
    red: 'bg-red-500 border-red-600',
    orange: 'bg-orange-500 border-orange-600',
    purple: 'bg-purple-500 border-purple-600',
  };
  return colors[color] || colors.blue;
};
```
- **Line 15**: Function to map color names to Tailwind CSS classes
- **Lines 16-21**: Color mapping object:
  - Each color has background and border classes
  - Uses 500 shade for background, 600 shade for border
  - Provides visual distinction between emergency services
- **Line 22**: Return mapped classes or default to blue if color not found

### **Lines 25-29: SafeAreaView Container and Status Bar**
```jsx
return (
  <SafeAreaView className="flex-1 bg-gray-50">
    {/* Status bar background replacement */}
    <View className="h-0 bg-gray-50" />

    {/* Header */}
```
- **Line 25**: Return JSX for screen rendering
- **Line 26**: SafeAreaView with full screen height and light gray background
- **Line 28**: Zero-height View for status bar background consistency
- **Line 30**: Comment indicating header section

### **Lines 30-35: Screen Header**
```jsx
<View className="border-b border-gray-200 bg-white px-6 py-4">
  {/* Rest of component remains the same */}
  <Text className="text-3xl font-bold text-gray-800">Emergency</Text>
  <Text className="mt-1 text-gray-600">Quick access to emergency services</Text>
</View>
```
- **Line 30**: Header container with white background and bottom border
- **Line 32**: Main screen title with large, bold typography
- **Line 33**: Subtitle describing screen purpose with muted color

### **Lines 35-45: Emergency Alert Banner**
```jsx
<ScrollView className="flex-1 px-6 py-6">
  {/* Emergency Alert Banner */}
  <View className="mb-6 rounded-2xl border-2 border-red-200 bg-red-50 p-6">
    <View className="mb-3 flex-row items-center">
      <FontAwesome6 name="triangle-exclamation" size={24} color="#DC2626" />
      <Text className="ml-3 text-xl font-bold text-red-700">Emergency Alert</Text>
    </View>
    <Text className="leading-relaxed text-red-600">
      In case of immediate danger, call the appropriate emergency number below. Your safety is
      our priority.
    </Text>
  </View>
```
- **Line 35**: ScrollView container with padding for content
- **Line 37**: Alert banner with red theme and rounded corners
- **Lines 38-41**: Header row with warning icon and title
- **Lines 42-46**: Alert message emphasizing user safety priority

### **Lines 48-52: Emergency Contacts Section Header**
```jsx
{/* Emergency Contacts */}
<View className="mb-6">
  <Text className="mb-4 text-2xl font-bold text-gray-800">Emergency Contacts</Text>

  <View className="space-y-4">
```
- **Line 49**: Section container with bottom margin
- **Line 50**: Section title with large, bold typography
- **Line 52**: Container with vertical spacing between contact cards

### **Lines 53-76: Emergency Contact Cards**
```jsx
{emergencyContacts.map((contact, index) => (
  <TouchableOpacity
    key={index}
    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft"
    activeOpacity={0.8}>
    <View className="flex-row items-center">
      <View className={`rounded-2xl p-4 ${getColorClasses(contact.color)}`}>
        <FontAwesome6 name={contact.icon} size={28} color="white" />
      </View>

      <View className="ml-4 flex-1">
        <Text className="text-xl font-bold text-gray-800">{contact.name}</Text>
        <Text className="mt-1 text-gray-600">Emergency Service</Text>
      </View>

      <View className="items-end">
        <View className="rounded-full bg-gray-100 px-4 py-2">
          <Text className="text-2xl font-bold text-gray-800">{contact.number}</Text>
        </View>
        <Text className="mt-1 text-sm text-gray-500">Tap to call</Text>
      </View>
    </View>
  </TouchableOpacity>
))}
```
- **Line 53**: Map through emergency contacts array
- **Lines 54-56**: TouchableOpacity card with white background and soft shadow
- **Line 57**: Horizontal layout for card content
- **Lines 58-60**: Colored icon container using dynamic color classes
- **Lines 62-65**: Service name and description in middle section
- **Lines 67-73**: Phone number display in rounded pill with call instruction

### **Lines 78-82: Quick Actions Section Header**
```jsx
{/* Quick Actions */}
<View className="mb-6">
  <Text className="mb-4 text-2xl font-bold text-gray-800">Quick Actions</Text>

  <View className="space-y-3">
```
- **Line 79**: Section container with bottom margin
- **Line 80**: Section title with large, bold typography
- **Line 82**: Container with vertical spacing between action buttons

### **Lines 83-94: Location Share Action**
```jsx
<TouchableOpacity className="rounded-2xl bg-kumbhblue-600 p-6 shadow-medium">
  <View className="flex-row items-center">
    <FontAwesome6 name="location-dot" size={24} color="white" />
    <Text className="ml-4 text-lg font-bold text-white">Share Location</Text>
  </View>
  <Text className="mt-2 text-kumbhblue-100">
    Send your current location to emergency contacts
  </Text>
</TouchableOpacity>
```
- **Line 83**: Button with Kumbh blue background and medium shadow
- **Lines 84-87**: Header row with location icon and action title
- **Lines 88-91**: Description text with light blue color for contrast

### **Lines 93-104: Emergency Alert Action**
```jsx
<TouchableOpacity className="rounded-2xl bg-kumbhgold-500 p-6 shadow-medium">
  <View className="flex-row items-center">
    <FontAwesome6 name="bell" size={24} color="white" />
    <Text className="ml-4 text-lg font-bold text-white">Emergency Alert</Text>
  </View>
  <Text className="mt-2 text-orange-100">
    Send alert to all registered emergency contacts
  </Text>
</TouchableOpacity>
```
- **Line 93**: Button with Kumbh gold background and medium shadow
- **Lines 94-97**: Header row with bell icon and action title
- **Lines 98-101**: Description text with light orange color for contrast

### **Lines 106-117: Safety Tips Section**
```jsx
{/* Safety Tips */}
<View className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
  <View className="mb-4 flex-row items-center">
    <FontAwesome6 name="lightbulb" size={24} color="#059669" />
    <Text className="ml-3 text-xl font-bold text-gray-800">Safety Tip</Text>
  </View>
  <Text className="leading-relaxed text-gray-600">
    Always keep your phone charged and know your exact location. In crowded areas, stay
    aware of your surroundings and follow official guidance.
  </Text>
</View>
```
- **Line 107**: Container with white background and soft shadow
- **Lines 108-111**: Header with lightbulb icon and section title
- **Lines 112-116**: Safety tip content with relaxed line height for readability

### **Lines 117: Component Closing**
```jsx
    </ScrollView>
  </SafeAreaView>
);
}
```
- **Line 117**: Close ScrollView and SafeAreaView containers
- **Line 118**: Close return statement
- **Line 119**: Close component function

## 🎨 Visual Design Features

### **Color Scheme**
- **Background**: Light gray (#F9FAFB) for screen background
- **Cards**: White background with gray borders
- **Emergency Alert**: Red theme (#DC2626) for urgency
- **Quick Actions**: 
  - Location sharing: Kumbh blue (#204B72)
  - Emergency alert: Kumbh gold (#F59E0B)
- **Safety Tips**: Green accent (#059669) for positive guidance

### **Typography Hierarchy**
- **Screen Title**: 3xl, bold (24px equivalent)
- **Section Titles**: 2xl, bold (20px equivalent)
- **Contact Names**: xl, bold (18px equivalent)
- **Numbers**: 2xl, bold for prominence
- **Descriptions**: Base size with relaxed line height

### **Visual Hierarchy**
1. **Emergency Alert Banner**: Most prominent with red theme
2. **Emergency Contacts**: Large, easily tappable cards
3. **Quick Actions**: Branded color buttons for key features
4. **Safety Tips**: Informational section with green accent

## 🚨 Emergency Services Context

### **Indian Emergency Numbers**
- **100**: Police - Primary law enforcement contact
- **108**: Ambulance - Medical emergency services
- **101**: Fire Brigade - Fire and rescue services
- **1078**: Disaster Management - Natural disaster response

### **Service Categorization**
- **Police**: Security and law enforcement (Blue theme)
- **Medical**: Health emergencies (Red theme)
- **Fire**: Fire and rescue (Orange theme)
- **Disaster**: Natural disasters (Purple theme)

## 🎯 User Experience Features

### **Accessibility**
- **Large Touch Targets**: Easy tapping on emergency contacts
- **Clear Visual Hierarchy**: Logical flow from alert to contacts to actions
- **Color Coding**: Consistent color themes for different emergency types
- **Readable Typography**: Appropriate font sizes and contrast

### **Quick Access**
- **Prominent Numbers**: Large, bold emergency numbers
- **Visual Cues**: "Tap to call" instructions
- **Categorized Services**: Clear icons and descriptions
- **Safety Priority**: Alert banner emphasizing user safety

### **Additional Features**
- **Location Sharing**: Quick GPS location sharing capability
- **Emergency Alerts**: Broadcast alerts to registered contacts
- **Safety Education**: Contextual safety tips for Kumbh Mela

## ⚡ Performance Considerations

1. **Static Data**: Emergency contacts stored as const array
2. **Efficient Rendering**: Map function for dynamic contact cards
3. **Optimized Icons**: FontAwesome6 icons with appropriate sizes
4. **Smooth Scrolling**: ScrollView for content overflow handling
5. **Touch Feedback**: ActiveOpacity for button interactions

## 🧪 Testing Scenarios

1. **Contact Display**: Verify all emergency numbers show correctly
2. **Color Themes**: Test color consistency across service types
3. **Touch Interactions**: Verify all buttons are responsive
4. **Scrolling**: Test content scrolling on different screen sizes
5. **Accessibility**: Test with screen readers and touch targets
6. **Visual Hierarchy**: Verify alert banner prominence

## 🔮 Future Enhancements

1. **Actual Calling**: Integrate with device calling functionality
2. **GPS Integration**: Implement real location sharing
3. **Contact Management**: Allow users to add emergency contacts
4. **Multilingual**: Add Hindi translations for emergency content
5. **Offline Access**: Ensure emergency numbers available offline

---

**📅 Last Updated**: July 29, 2025  
**🔧 Dependencies**: React Native, FontAwesome6, SafeAreaView  
**🎯 Usage**: Emergency services access in bottom tab navigation
