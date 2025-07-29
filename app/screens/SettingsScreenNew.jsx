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

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await UserStorage.clearAllData();
            Alert.alert('Success', 'Logged out successfully. Please restart the app.');
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, rightComponent, onPress, iconColor = '#6B7280' }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm active:bg-gray-50"
      activeOpacity={0.7}>
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mr-4">
          <FontAwesome6 name={icon} size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-semibold text-base">{title}</Text>
          {subtitle && (
            <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
          )}
        </View>
        {rightComponent}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text className="text-gray-800 font-bold text-lg mb-4 px-2">{title}</Text>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900">Settings</Text>
        <Text className="text-gray-600 mt-1">Customize your app experience</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Preferences Section */}
        <SectionHeader title="Preferences" />
        
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
      </ScrollView>
    </View>
  );
}
