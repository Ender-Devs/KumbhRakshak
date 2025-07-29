import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../global.css';

export default function LanguageSwitch({ disabled = false }) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    if (disabled) return; // Don't change language when disabled

    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      disabled={disabled}
      className={`absolute right-6 top-14 overflow-hidden rounded-2xl ${
        disabled ? 'bg-gray-500/30' : 'bg-white/20 backdrop-blur-sm'
      }`}
      activeOpacity={0.8}>
      <View
        className={`flex-row items-center border px-4 py-3 ${
          disabled ? 'border-gray-400/30' : 'border-white/30'
        }`}>
        <View className={`mr-3 rounded-full p-2 ${disabled ? 'bg-gray-400/30' : 'bg-white/20'}`}>
          <FontAwesome6 name="language" size={18} color={disabled ? '#9CA3AF' : 'white'} />
        </View>

        <View>
          <Text className={`text-sm font-bold ${disabled ? 'text-gray-400' : 'text-white'}`}>
            {t('language.switch')}
          </Text>
          <Text className={`text-xs ${disabled ? 'text-gray-500' : 'text-white/80'}`}>
            {t('language.current')}
          </Text>
        </View>

        {!disabled && (
          <View className="ml-2">
            <FontAwesome6 name="chevron-down" size={12} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
