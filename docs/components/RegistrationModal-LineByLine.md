# RegistrationModal Component - Line by Line Documentation

## 🎯 Purpose
Provides a comprehensive user registration modal for the KumbhRakshak app. Handles user data collection (name and phone), form validation, bilingual support, and data persistence through UserStorage.

## 📄 File: `components/RegistrationModal.jsx` (233 lines)

### **Lines 1-17: Import Dependencies**
```jsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserStorage } from '../utils/UserStorage';
import '../global.css';
```
- **Line 1**: React core with useState hook for state management
- **Lines 2-13**: React Native components:
  - `Modal`: Full-screen overlay modal container
  - `View`: Layout container component
  - `Text`: Text display component
  - `TextInput`: Form input field component
  - `TouchableOpacity`: Pressable button component
  - `Alert`: Native alert dialog system
  - `KeyboardAvoidingView`: Handles keyboard overlap on inputs
  - `Platform`: Platform-specific behavior detection
  - `ScrollView`: Scrollable content container
  - `Animated`: Animation API for smooth transitions
- **Line 14**: i18next translation hook for bilingual support
- **Line 15**: FontAwesome6 icon library for UI icons
- **Line 16**: UserStorage utility for data persistence
- **Line 17**: Global CSS import for NativeWind styling

### **Lines 19-26: Component Declaration and State**
```jsx
export default function RegistrationModal({ visible, onComplete }) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
```
- **Line 19**: Component with props:
  - `visible`: Boolean to control modal visibility
  - `onComplete`: Callback function when registration completes
- **Line 20**: Extract translation function (`t`) and i18n object from useTranslation
- **Line 21**: State for user's name input
- **Line 22**: State for user's phone number input
- **Line 23**: State for name field validation error message
- **Line 24**: State for phone field validation error message
- **Line 25**: State for form submission loading state
- **Line 26**: Animated value for fade-in/out animations

### **Lines 28-35: Fade Animation Effect**
```jsx
React.useEffect(() => {
  if (visible) {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
}, [visible, fadeAnim]);
```
- **Line 28**: useEffect hook to handle modal animation
- **Line 29**: Check if modal should be visible
- **Lines 30-34**: Animated.timing configuration:
  - `toValue: 1`: Animate opacity from 0 to 1 (fade in)
  - `duration: 300`: Animation duration 300ms
  - `useNativeDriver: true`: Use native driver for better performance
- **Line 35**: Start the animation when visible becomes true
- **Line 36**: Dependency array ensures effect runs when visibility changes

### **Lines 37-41: Language Toggle Function**
```jsx
const toggleLanguage = () => {
  const currentLang = i18n.language;
  const newLang = currentLang === 'en' ? 'hi' : 'en';
  i18n.changeLanguage(newLang);
};
```
- **Line 37**: Function to switch between English and Hindi
- **Line 38**: Get current language from i18n
- **Line 39**: Determine new language using ternary operator:
  - If English ('en'), switch to Hindi ('hi')
  - If Hindi ('hi'), switch to English ('en')
- **Line 40**: Execute language change using i18next method

### **Lines 43-60: Form Validation Logic**
```jsx
const validateForm = () => {
  let isValid = true;
  setNameError('');
  setPhoneError('');

  // Validate name
  if (!name.trim()) {
    setNameError(t('registration.required_field'));
    isValid = false;
  }

  // Validate phone
  const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
  if (!phone.trim()) {
    setPhoneError(t('registration.required_field'));
    isValid = false;
  } else if (!phoneRegex.test(phone.trim())) {
    setPhoneError(t('registration.invalid_phone'));
    isValid = false;
  }

  return isValid;
};
```
- **Line 43**: Form validation function returning boolean
- **Line 44**: Initialize validation state as true
- **Lines 45-46**: Clear previous error messages
- **Lines 48-51**: Name validation:
  - Check if name is empty after trimming whitespace
  - Set translated error message if invalid
- **Lines 53-59**: Phone validation:
  - **Line 54**: Indian phone number regex (starts with 6-9, followed by 9 digits)
  - **Lines 55-57**: Check if phone is empty
  - **Lines 57-59**: Check regex pattern for valid Indian mobile number
- **Line 61**: Return overall validation result

### **Lines 63-85: Form Submission Handler**
```jsx
const handleSubmit = async () => {
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    // Store user data using UserStorage
    const userData = {
      name: name.trim(),
      phone: phone.trim(),
    };

    await UserStorage.saveUserData(userData);

    // TODO: Send to server when backend is ready
    // await UserStorage.sendToServer(userData);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('🎉 ' + t('registration.registration_success'), '', [
        { text: 'OK', onPress: onComplete },
      ]);
    }, 1500);
  } catch (_error) {
    setIsSubmitting(false);
    Alert.alert('Error', 'Failed to save registration. Please try again.');
  }
};
```
- **Line 63**: Async function to handle form submission
- **Line 64**: Early return if form validation fails
- **Line 66**: Set loading state to true (shows spinner)
- **Lines 68-72**: Create user data object with trimmed values
- **Line 74**: Save data to local storage using UserStorage
- **Lines 76-77**: TODO comment for future server integration
- **Lines 79-84**: Simulate API delay with setTimeout:
  - 1500ms delay to show loading state
  - Stop loading state
  - Show success alert with emoji and translated message
  - Call onComplete callback when user presses OK
- **Lines 85-88**: Error handling:
  - Stop loading state
  - Show error alert message

### **Lines 90-95: Modal Container Structure**
```jsx
return (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View className="flex-1 bg-black/60">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-4">
```
- **Line 90**: Return JSX for modal rendering
- **Line 91**: Modal component with fade animation and transparency
- **Line 92**: Dark backdrop overlay (60% black opacity)
- **Lines 93-95**: KeyboardAvoidingView to handle keyboard overlap:
  - iOS uses 'padding' behavior
  - Android uses 'height' behavior
  - Centered content with horizontal padding

### **Lines 96-99: Animated Modal Content**
```jsx
<Animated.View
  style={{ opacity: fadeAnim }}
  className="max-h-[85%] overflow-hidden rounded-3xl bg-white shadow-strong">
  {/* Simplified Header */}
```
- **Line 96**: Animated.View for fade-in animation
- **Line 97**: Apply fadeAnim opacity value
- **Line 98**: Modal styling:
  - `max-h-[85%]`: Maximum 85% of screen height
  - `overflow-hidden`: Hide content overflow
  - `rounded-3xl`: Large rounded corners
  - `bg-white`: White background
  - `shadow-strong`: Large shadow for depth

### **Lines 100-120: Header Section with Language Toggle**
```jsx
<View className="relative bg-kumbhblue-600 px-6 py-6">
  {/* Language Toggle Button */}
  <TouchableOpacity
    onPress={toggleLanguage}
    className="absolute right-4 top-4 flex-row items-center rounded-full bg-white/20 px-3 py-2"
    activeOpacity={0.8}>
    <FontAwesome6 name="language" size={16} color="white" />
    <Text className="ml-2 text-sm font-medium text-white">
      {i18n.language === 'en' ? 'हिंदी' : 'English'}
    </Text>
  </TouchableOpacity>

  <View className="mt-4 items-center">
    <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-white/20">
      <FontAwesome6 name="user-plus" size={28} color="white" />
    </View>
    <Text className="text-center text-2xl font-bold text-white">
      {t('registration.welcome')}
    </Text>
    <Text className="mt-2 text-center leading-5 text-white/90">
      {t('registration.subtitle')}
    </Text>
  </View>
</View>
```
- **Line 100**: Header container with Kumbh blue background
- **Lines 102-111**: Language toggle button:
  - Positioned absolutely in top-right corner
  - Semi-transparent white background
  - Language icon and text showing next language option
- **Lines 113-123**: Centered header content:
  - **Lines 114-116**: Icon container with user-plus icon
  - **Lines 117-119**: Welcome title with translation
  - **Lines 120-122**: Subtitle with semi-transparent text

### **Lines 125-152: Name Input Field**
```jsx
<ScrollView showsVerticalScrollIndicator={false}>
  <View className="p-6">
    {/* Name Input */}
    <View className="mb-5">
      <Text className="mb-3 text-base font-semibold text-gray-800">
        {t('registration.name_label')} *
      </Text>
      <View
        className={`rounded-xl border-2 px-4 py-4 ${nameError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}>
        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (nameError) setNameError('');
          }}
          placeholder={t('registration.name_placeholder')}
          placeholderTextColor="#9CA3AF"
          className="text-base text-gray-900"
          autoCapitalize="words"
        />
      </View>
      {nameError ? (
        <View className="mt-2 flex-row items-center">
          <FontAwesome6 name="triangle-exclamation" size={14} color="#EF4444" />
          <Text className="ml-2 text-sm font-medium text-red-600">{nameError}</Text>
        </View>
      ) : null}
    </View>
```
- **Line 125**: ScrollView to handle content overflow
- **Line 126**: Main content container with padding
- **Lines 129-131**: Field label with required asterisk
- **Lines 132-133**: Input container with dynamic error styling:
  - Red border and background if error exists
  - Gray border and white background if no error
- **Lines 134-142**: TextInput configuration:
  - Controlled input with name state
  - Clear error when user starts typing
  - Translated placeholder text
  - Word capitalization for names
- **Lines 143-148**: Error message display:
  - Shows only if nameError exists
  - Warning icon with error text
  - Red styling for error state

### **Lines 150-181: Phone Input Field**
```jsx
{/* Phone Input */}
<View className="mb-5">
  <Text className="mb-3 text-base font-semibold text-gray-800">
    {t('registration.phone_label')} *
  </Text>
  <View
    className={`rounded-xl border-2 px-4 py-4 ${phoneError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}>
    <TextInput
      value={phone}
      onChangeText={(text) => {
        // Only allow numbers and limit to 10 digits
        const numericText = text.replace(/[^0-9]/g, '').slice(0, 10);
        setPhone(numericText);
        if (phoneError) setPhoneError('');
      }}
      placeholder={t('registration.phone_placeholder')}
      placeholderTextColor="#9CA3AF"
      className="text-base text-gray-900"
      keyboardType="numeric"
      maxLength={10}
    />
  </View>
  {phoneError ? (
    <View className="mt-2 flex-row items-center">
      <FontAwesome6 name="triangle-exclamation" size={14} color="#EF4444" />
      <Text className="ml-2 text-sm font-medium text-red-600">{phoneError}</Text>
    </View>
  ) : null}
</View>
```
- **Lines 152-154**: Phone field label with required asterisk
- **Lines 155-156**: Input container with error state styling
- **Lines 157-168**: Phone TextInput with special handling:
  - **Lines 160-163**: Input validation on change:
    - Remove non-numeric characters using regex
    - Limit to 10 digits using slice
    - Clear error when user types
  - **Line 167**: Numeric keyboard for phone input
  - **Line 168**: Maximum length of 10 characters
- **Lines 170-175**: Error message display similar to name field

### **Lines 177-187: Privacy Notice**
```jsx
{/* Privacy Notice */}
<View className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
  <View className="flex-row items-start">
    <View className="mr-3 mt-0.5 h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
      <FontAwesome6 name="shield-halved" size={12} color="#3B82F6" />
    </View>
    <Text className="flex-1 text-sm font-medium leading-5 text-gray-800">
      {t('registration.privacy_text')}
    </Text>
  </View>
</View>
```
- **Line 178**: Privacy notice container with blue styling
- **Line 179**: Horizontal layout for icon and text
- **Lines 180-182**: Shield icon in circular container
- **Lines 183-185**: Privacy notice text with translation

### **Lines 189-211: Submit Button**
```jsx
{/* Submit Button */}
<TouchableOpacity
  onPress={handleSubmit}
  disabled={isSubmitting}
  className={`items-center rounded-xl px-6 py-4 shadow-medium ${
    isSubmitting ? 'bg-gray-400' : 'bg-kumbhblue-600'
  }`}>
  {isSubmitting ? (
    <View className="flex-row items-center">
      <FontAwesome6 name="spinner" size={16} color="white" />
      <Text className="ml-3 text-base font-bold text-white">Processing...</Text>
    </View>
  ) : (
    <View className="flex-row items-center">
      <FontAwesome6 name="rocket" size={16} color="white" />
      <Text className="ml-3 text-base font-bold text-white">
        {t('registration.submit_button')}
      </Text>
    </View>
  )}
</TouchableOpacity>
```
- **Lines 190-195**: TouchableOpacity button configuration:
  - Calls handleSubmit on press
  - Disabled during submission
  - Dynamic background color based on loading state
- **Lines 196-200**: Loading state display:
  - Spinner icon animation
  - "Processing..." text
- **Lines 201-208**: Normal state display:
  - Rocket icon for action
  - Translated submit button text

### **Lines 212-233: Component Closing Structure**
```jsx
        </View>
      </ScrollView>
    </Animated.View>
  </KeyboardAvoidingView>
</View>
</Modal>
);
}
```
- **Lines 212-219**: Close all nested container components
- **Line 220**: Close Modal component
- **Line 221**: Close return statement
- **Line 222**: Close component function

## 🎨 Visual Design Features

### **Color Scheme**
- **Header**: Kumbh blue (#204B72) with white text
- **Inputs**: White background with gray borders
- **Errors**: Red borders, backgrounds, and text
- **Privacy**: Blue informational styling
- **Submit**: Kumbh blue background, gray when loading

### **Animation**
- **Fade-in**: 300ms opacity animation when modal appears
- **Loading**: Spinner icon rotation during submission

### **Typography**
- **Headers**: Bold, larger text for titles
- **Labels**: Semi-bold for field labels
- **Inputs**: Base size for readability
- **Errors**: Medium weight red text

## 🔧 Form Validation

### **Name Validation**
- Required field check
- Trimmed whitespace handling
- Real-time error clearing

### **Phone Validation**
- Indian mobile number format (starts with 6-9, 10 digits total)
- Numeric input only with regex filtering
- Real-time character limitation
- Required field validation

## 🌐 Internationalization

- **Bilingual Support**: English and Hindi translations
- **Dynamic Language Toggle**: In-modal language switching
- **Translated Content**: All user-facing text uses translation keys
- **Cultural Context**: Appropriate placeholders and messages

## ⚡ Performance Optimizations

1. **Native Driver Animations**: Smooth 60fps animations
2. **Controlled Inputs**: Efficient state updates
3. **Error State Management**: Minimal re-renders
4. **Platform Detection**: iOS/Android specific keyboard handling

## 🧪 Testing Scenarios

1. **Form Validation**: Test all validation rules
2. **Language Switching**: Verify translations work correctly
3. **Keyboard Handling**: Test on different screen sizes
4. **Error States**: Verify error display and clearing
5. **Loading States**: Test submission flow
6. **Data Persistence**: Verify UserStorage integration

---

**📅 Last Updated**: July 29, 2025  
**🔧 Dependencies**: React Native, i18next, UserStorage, FontAwesome6  
**🎯 Usage**: User registration flow in app initialization
