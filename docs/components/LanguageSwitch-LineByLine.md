# LanguageSwitch Component - Line by Line Documentation

## 🎯 Purpose
Provides a bilingual toggle switch for the KumbhRakshak app, allowing users to switch between English and Hindi (हिंदी) languages. Supports multiple styling variants for different screen contexts.

## 📄 File: `components/LanguageSwitch.jsx` (60 lines)

### **Lines 1-5: Import Dependencies**
```jsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../global.css';
```
- **Line 1**: Core React library for component creation
- **Line 2**: React Native UI components for touchable button, text display, and layout container
- **Line 3**: i18next hook for accessing translation functionality and language switching
- **Line 4**: FontAwesome6 icons library for the language icon
- **Line 5**: Global CSS styles import for NativeWind styling system

### **Lines 7-8: Component Declaration and Props**
```jsx
export default function LanguageSwitch({ disabled = false, style = 'default' }) {
  const { i18n } = useTranslation();
```
- **Line 7**: Function component with destructured props:
  - `disabled = false`: Optional prop to disable the language switch
  - `style = 'default'`: Style variant ('default', 'header', 'settings')
- **Line 8**: Extract i18n object from useTranslation hook for language management

### **Lines 10-14: Language Toggle Logic**
```jsx
const toggleLanguage = () => {
  if (disabled) return;
  const newLanguage = i18n.language === 'en' ? 'hi' : 'en';
  i18n.changeLanguage(newLanguage);
};
```
- **Line 10**: Function to handle language switching
- **Line 11**: Early return if component is disabled
- **Line 12**: Ternary operator to determine new language:
  - If current language is English ('en'), switch to Hindi ('hi')
  - If current language is Hindi ('hi'), switch to English ('en')
- **Line 13**: Execute language change using i18next's changeLanguage method

### **Lines 16-26: Dynamic Styling Function**
```jsx
const getStyleClasses = () => {
  if (disabled) return 'bg-gray-300';
  
  switch (style) {
    case 'header':
      return 'bg-white/20 backdrop-blur-sm active:bg-white/30 border border-white/20';
    case 'settings':
      return 'bg-orange-100 active:bg-orange-200 border border-orange-200';
    default:
      return 'bg-white/20 backdrop-blur-sm active:bg-white/30';
  }
};
```
- **Line 16**: Function to determine CSS classes based on style variant
- **Line 17**: Return gray background if component is disabled
- **Line 19-25**: Switch statement for different style variants:
  - **header**: Semi-transparent white with backdrop blur for header usage
  - **settings**: Orange theme for settings screen with active state
  - **default**: Semi-transparent white with blur effect

### **Lines 28-31: Text Color Function**
```jsx
const getTextColor = () => {
  if (disabled) return 'text-gray-500';
  return style === 'settings' ? 'text-orange-700' : 'text-white';
};
```
- **Line 28**: Function to determine text color based on state and style
- **Line 29**: Return muted gray text if disabled
- **Line 30**: Ternary operator:
  - Orange text for settings style
  - White text for other styles

### **Lines 33-36: Icon Color Function**
```jsx
const getIconColor = () => {
  if (disabled) return '#9CA3AF';
  return style === 'settings' ? '#FB923C' : 'white';
};
```
- **Line 33**: Function to determine icon color
- **Line 34**: Return gray color (#9CA3AF) if disabled
- **Line 35**: Ternary operator:
  - Orange color (#FB923C) for settings style
  - White color for other styles

### **Lines 38-43: Main TouchableOpacity Container**
```jsx
return (
  <TouchableOpacity
    onPress={toggleLanguage}
    disabled={disabled}
    className={`flex-row items-center px-4 py-2 rounded-full shadow-lg ${getStyleClasses()}`}
    activeOpacity={0.8}>
```
- **Line 38**: Return JSX for component rendering
- **Line 39**: TouchableOpacity for pressable language switch
- **Line 40**: onPress handler calls toggleLanguage function
- **Line 41**: disabled prop controls whether button can be pressed
- **Line 42**: Combined CSS classes:
  - `flex-row items-center`: Horizontal layout with centered items
  - `px-4 py-2`: Horizontal padding 16px, vertical padding 8px
  - `rounded-full`: Fully rounded corners for pill shape
  - `shadow-lg`: Large shadow for depth
  - `${getStyleClasses()}`: Dynamic styling based on style variant
- **Line 43**: activeOpacity at 0.8 for subtle press feedback

### **Lines 44-53: Icon and Text Container**
```jsx
<View className="flex-row items-center">
  <FontAwesome6 
    name="language" 
    size={16} 
    color={getIconColor()} 
    style={{ marginRight: 8 }}
  />
  <Text 
    className={`font-medium text-sm ${getTextColor()}`}>
    {i18n.language === 'en' ? 'हिंदी' : 'English'}
  </Text>
</View>
```
- **Line 44**: Inner View container with horizontal flex layout
- **Lines 45-48**: FontAwesome6 language icon:
  - `name="language"`: Globe/language icon from FontAwesome6
  - `size={16}`: 16px icon size
  - `color={getIconColor()}`: Dynamic color based on style and state
  - `style={{ marginRight: 8 }}`: 8px right margin for spacing
- **Lines 49-52**: Text element displaying current language option:
  - `font-medium text-sm`: Medium font weight, small text size
  - `${getTextColor()}`: Dynamic text color
  - **Line 51**: Ternary operator for display text:
    - If current language is English, show "हिंदी" (Hindi in Devanagari)
    - If current language is Hindi, show "English"

### **Lines 54-56: Component Closing**
```jsx
    </TouchableOpacity>
  );
}
```
- **Line 54**: Close TouchableOpacity component
- **Line 55**: Close return statement
- **Line 56**: Close function component

## 🎨 Style Variants

### **Default Style** (`style="default"`)
- Semi-transparent white background with backdrop blur
- White text and icons
- Used in headers and overlay contexts

### **Header Style** (`style="header"`)
- Enhanced backdrop blur with border
- Optimized for header placement
- Maintains visibility over complex backgrounds

### **Settings Style** (`style="settings"`)
- Orange theme matching KumbhRakshak brand colors
- Orange background and text
- Used in settings screen context

## 🌐 Internationalization Features

1. **Bidirectional Language Support**: Seamlessly switches between English and Hindi
2. **Visual Language Indicator**: Shows the *next* language option, not current
3. **Persistent Language Settings**: Uses i18next persistence for user preference
4. **Cultural Localization**: Uses native Devanagari script for Hindi text

## 🎯 Usage Examples

### Basic Usage
```jsx
<LanguageSwitch />
```

### Header Usage
```jsx
<LanguageSwitch style="header" />
```

### Settings Page Usage
```jsx
<LanguageSwitch style="settings" />
```

### Disabled State
```jsx
<LanguageSwitch disabled={true} />
```

## 🔧 Props Interface

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | boolean | `false` | Disables the language switch functionality |
| `style` | string | `'default'` | Style variant: 'default', 'header', or 'settings' |

## 🎨 Color Palette

| State | Background | Text Color | Icon Color |
|-------|------------|------------|------------|
| Default | `bg-white/20` | `text-white` | `white` |
| Settings | `bg-orange-100` | `text-orange-700` | `#FB923C` |
| Disabled | `bg-gray-300` | `text-gray-500` | `#9CA3AF` |

## ⚡ Performance Considerations

1. **Minimal Re-renders**: Uses useTranslation hook efficiently
2. **Optimized Styling**: Dynamic class generation without inline styles
3. **Touch Optimization**: Appropriate activeOpacity for smooth interaction
4. **Language Persistence**: i18next handles language preference storage

## 🧪 Testing Scenarios

1. **Language Toggle**: Verify switching between English and Hindi
2. **Style Variants**: Test all three style variants
3. **Disabled State**: Ensure component doesn't respond when disabled
4. **Visual Feedback**: Confirm appropriate colors and animations
5. **Accessibility**: Test with screen readers and touch targets

---

**📅 Last Updated**: July 29, 2025  
**🔧 Dependencies**: React Native, i18next, FontAwesome6  
**🎯 Usage**: Language switching across all app screens
