import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../../global.css';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const settingsGroups = [
    {
      title: 'General',
      items: [
        {
          icon: 'bell',
          title: 'Push Notifications',
          subtitle: 'Receive alerts and updates',
          type: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: 'location-dot',
          title: 'Location Services',
          subtitle: 'Allow location access for better service',
          type: 'toggle',
          value: locationEnabled,
          onToggle: setLocationEnabled,
        },
        {
          icon: 'moon',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          type: 'toggle',
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: 'shield-halved',
          title: 'Privacy Policy',
          subtitle: 'Read our privacy policy',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: 'file-contract',
          title: 'Terms of Service',
          subtitle: 'View terms and conditions',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: 'key',
          title: 'Data & Privacy',
          subtitle: 'Manage your data preferences',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'headset',
          title: 'Help Center',
          subtitle: 'Get help and support',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: 'bug',
          title: 'Report a Bug',
          subtitle: 'Help us improve the app',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: 'star',
          title: 'Rate the App',
          subtitle: 'Rate us on the app store',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Status bar background replacement */}
      <View className="h-0 bg-gray-50" />

      {/* Header */}
      <View className="border-b border-gray-200 bg-white px-6 py-4">
        <Text className="text-3xl font-bold text-gray-800">Settings</Text>
        <Text className="mt-1 text-gray-600">Customize your app experience</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Quick Stats Card */}
        <View className="mx-6 mt-6 rounded-2xl bg-gradient-to-r from-kumbhblue-600 to-kumbhblue-700 p-6 shadow-strong">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-bold text-white">App Statistics</Text>
              <Text className="mt-1 text-kumbhblue-100">Your usage summary</Text>
            </View>
            <FontAwesome6 name="chart-simple" size={32} color="white" />
          </View>

          <View className="mt-6 flex-row justify-between">
            <View>
              <Text className="text-3xl font-bold text-white">7</Text>
              <Text className="text-sm text-kumbhblue-100">Days Active</Text>
            </View>
            <View>
              <Text className="text-3xl font-bold text-white">23</Text>
              <Text className="text-sm text-kumbhblue-100">Actions Taken</Text>
            </View>
            <View>
              <Text className="text-3xl font-bold text-white">100%</Text>
              <Text className="text-sm text-kumbhblue-100">Uptime</Text>
            </View>
          </View>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} className="mx-6 mt-6">
            <Text className="mb-4 text-xl font-bold text-gray-800">{group.title}</Text>

            <View className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft">
              {group.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    className="p-4"
                    activeOpacity={item.type === 'toggle' ? 1 : 0.8}>
                    <View className="flex-row items-center">
                      <View className="h-12 w-12 items-center justify-center rounded-xl bg-kumbhblue-50">
                        <FontAwesome6 name={item.icon} size={20} color="#204B72" />
                      </View>

                      <View className="ml-4 flex-1">
                        <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
                        <Text className="mt-1 text-sm text-gray-600">{item.subtitle}</Text>
                      </View>

                      {item.type === 'toggle' ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: '#E5E7EB', true: '#204B72' }}
                          thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                        />
                      ) : (
                        <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
                      )}
                    </View>
                  </TouchableOpacity>
                  {itemIndex < group.items.length - 1 && (
                    <View className="ml-16 h-px bg-gray-200" />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* About Section */}
        <View className="mx-6 mb-8 mt-6">
          <Text className="mb-4 text-xl font-bold text-gray-800">About</Text>

          <View className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
            <View className="items-center">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-kumbhblue-600">
                <FontAwesome6 name="shield-halved" size={28} color="white" />
              </View>

              <Text className="text-2xl font-bold text-gray-800">Kumbh Rakshak</Text>
              <Text className="mt-2 text-center leading-relaxed text-gray-600">
                Safety, Cleanliness and Community Seva
              </Text>

              <View className="mt-4 rounded-full bg-gray-100 px-4 py-2">
                <Text className="font-medium text-gray-700">Version 1.0.0</Text>
              </View>

              <Text className="mt-4 text-center text-sm text-gray-500">
                Built with ❤️ for the Kumbh Mela community
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
