import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserStorage } from '../../utils/UserStorage';
import '../../global.css';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Status bar background replacement */}
      <View className="h-0 bg-gray-50" />

      {/* Header */}
      <View className="border-b border-gray-200 bg-white px-6 py-4">
        <Text className="text-3xl font-bold text-gray-800">Profile</Text>
        <Text className="mt-1 text-gray-600">Manage your account and preferences</Text>
      </View>

      <ScrollView className="flex-1">
        {/* User Info Card */}
        <View className="mx-6 mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
          <View className="items-center">
            {/* Avatar */}
            <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-kumbhblue-600 shadow-medium">
              <FontAwesome6 name="user" size={36} color="white" />
            </View>

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
          </View>

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
        </View>

        {/* Profile Options */}
        <View className="mx-6 mt-6">
          <Text className="mb-4 text-xl font-bold text-gray-800">Account Options</Text>

          <View className="space-y-3">
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
          </View>
        </View>

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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
