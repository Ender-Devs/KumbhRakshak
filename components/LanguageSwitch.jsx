import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../global.css';

export default function LanguageSwitch({ disabled = false, style = 'default' }) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    if (disabled) return;
    const newLanguage = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLanguage);
  };

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

  const getTextColor = () => {
    if (disabled) return 'text-gray-500';
    return style === 'settings' ? 'text-orange-700' : 'text-white';
  };

  const getIconColor = () => {
    if (disabled) return '#9CA3AF';
    return style === 'settings' ? '#FB923C' : 'white';
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      disabled={disabled}
      className={`flex-row items-center px-4 py-2 rounded-full shadow-lg ${getStyleClasses()}`}
      activeOpacity={0.8}>
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
    </TouchableOpacity>
  );
}
