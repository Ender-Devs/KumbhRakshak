import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../../global.css';

export default function EmergencyScreen() {
  const emergencyContacts = [
    { name: 'Police', number: '100', icon: 'shield-halved', color: 'blue' },
    { name: 'Ambulance', number: '108', icon: 'truck-medical', color: 'red' },
    { name: 'Fire Brigade', number: '101', icon: 'fire-flame-curved', color: 'orange' },
    { name: 'Disaster Management', number: '1078', icon: 'triangle-exclamation', color: 'purple' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-600',
      red: 'bg-red-500 border-red-600',
      orange: 'bg-orange-500 border-orange-600',
      purple: 'bg-purple-500 border-purple-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Status bar background replacement */}
      <View className="h-0 bg-gray-50" />

      {/* Header */}
      <View className="border-b border-gray-200 bg-white px-6 py-4">
        {/* Rest of component remains the same */}
        <Text className="text-3xl font-bold text-gray-800">Emergency</Text>
        <Text className="mt-1 text-gray-600">Quick access to emergency services</Text>
      </View>

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

        {/* Emergency Contacts */}
        <View className="mb-6">
          <Text className="mb-4 text-2xl font-bold text-gray-800">Emergency Contacts</Text>

          <View className="space-y-4">
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
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="mb-4 text-2xl font-bold text-gray-800">Quick Actions</Text>

          <View className="space-y-3">
            <TouchableOpacity className="rounded-2xl bg-kumbhblue-600 p-6 shadow-medium">
              <View className="flex-row items-center">
                <FontAwesome6 name="location-dot" size={24} color="white" />
                <Text className="ml-4 text-lg font-bold text-white">Share Location</Text>
              </View>
              <Text className="mt-2 text-kumbhblue-100">
                Send your current location to emergency contacts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-2xl bg-kumbhgold-500 p-6 shadow-medium">
              <View className="flex-row items-center">
                <FontAwesome6 name="bell" size={24} color="white" />
                <Text className="ml-4 text-lg font-bold text-white">Emergency Alert</Text>
              </View>
              <Text className="mt-2 text-orange-100">
                Send alert to all registered emergency contacts
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}
