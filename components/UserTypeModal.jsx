import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../global.css';

export default function UserTypeModal({ visible, onSelectUserType }) {
  const { t } = useTranslation();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const handleUserTypeSelect = (type) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onSelectUserType(type);
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}>
      <Animated.View 
        style={{ opacity: fadeAnim }}
        className="flex-1 bg-black/60 justify-center items-center px-6">
        <View className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-orange-100">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full items-center justify-center mb-4 shadow-lg">
              <FontAwesome6 name="users" size={32} color="white" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
              {t('userType.title') || 'Choose Your Role'}
            </Text>
            <Text className="text-sm text-gray-600 text-center leading-5">
              {t('userType.subtitle') || 'Select how you want to use Kumbh Rakshak'}
            </Text>
          </View>

          {/* User Type Options */}
          <View className="space-y-4">
            {/* General User Option */}
            <TouchableOpacity
              onPress={() => handleUserTypeSelect('user')}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg active:scale-95 border border-orange-200"
              activeOpacity={0.8}>
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-white/30 rounded-xl items-center justify-center mr-4">
                  <FontAwesome6 name="user" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold mb-1">
                    {t('userType.general_user') || 'General User'}
                  </Text>
                  <Text className="text-white/90 text-sm">
                    {t('userType.general_user_desc') || 'Report issues and get emergency help'}
                  </Text>
                </View>
                <FontAwesome6 name="chevron-right" size={16} color="white" />
              </View>
            </TouchableOpacity>

            {/* Volunteer Option */}
            <TouchableOpacity
              onPress={() => handleUserTypeSelect('volunteer')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 shadow-lg active:scale-95 border border-blue-200"
              activeOpacity={0.8}>
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-white/30 rounded-xl items-center justify-center mr-4">
                  <FontAwesome6 name="hand-holding-heart" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold mb-1">
                    {t('userType.volunteer') || 'Volunteer'}
                  </Text>
                  <Text className="text-white/90 text-sm">
                    {t('userType.volunteer_desc') || 'Help manage and coordinate services'}
                  </Text>
                </View>
                <FontAwesome6 name="chevron-right" size={16} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Info Note */}
          <View className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <View className="flex-row items-start">
              <FontAwesome6 name="info-circle" size={16} color="#FB923C" className="mt-0.5 mr-2" />
              <Text className="text-xs text-orange-700 flex-1 leading-4">
                {t('userType.info') || 'You can change your role anytime in settings. Volunteers need authorized credentials.'}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}
