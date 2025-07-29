import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { UserStorage } from '../../utils/UserStorage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../../global.css';
import HelpBtn from '../../components/HelpBtn';
import LanguageSwitch from '../../components/LanguageSwitch';

export default function HomeScreen() {
  const { t } = useTranslation();

  const resetRegistration = async () => {
    try {
      await UserStorage.clearAllData();
      console.log('All user data cleared for testing');
    } catch (error) {
      console.error('Error resetting registration:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-orange-50 to-white">
      {/* Header with Language Switch */}
      <View className="bg-gradient-to-r from-orange-500 to-red-500 px-6 pt-12 pb-8 rounded-b-3xl shadow-xl">
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold mb-2">
              {t('welcome') || 'Welcome to Kumbh Rakshak'}
            </Text>
            <Text className="text-orange-100 text-sm leading-5">
              {t('tagline') || 'Your safety companion during Kumbh Mela'}
            </Text>
          </View>
          <View className="ml-4 bg-white/20 rounded-full p-2">
            <LanguageSwitch />
          </View>
        </View>
        
        {/* Logo */}
        <View className="items-center">
          <Image
            source={require('../../assets/KumbhRakshak.png')}
            className="w-24 h-24 rounded-full bg-white/10 shadow-lg"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Main Content */}
      <View className="px-6 -mt-6">
        {/* Emergency Services Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-red-100 rounded-xl items-center justify-center mr-3">
              <FontAwesome6 name="triangle-exclamation" size={20} color="#DC2626" />
            </View>
            <Text className="text-xl font-bold text-gray-800 flex-1">
              {t('emergencyServices')}
            </Text>
          </View>
          
          <View className="grid grid-cols-2 gap-3">
            <HelpBtn
              className="bg-red-50 border-2 border-red-200 rounded-xl p-4"
              icon="shield-halved"
              iconSize={24}
              translationKey="emergency"
              onPress={() => console.log('Police help pressed')}
            />
            <HelpBtn
              className="bg-red-50 border-2 border-red-200 rounded-xl p-4"
              icon="truck-medical"
              iconSize={24}
              translationKey="emergency"
              onPress={() => console.log('Medical emergency pressed')}
            />
          </View>
        </View>

        {/* Additional Services Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mr-3">
              <FontAwesome6 name="hands-helping" size={20} color="#059669" />
            </View>
            <Text className="text-xl font-bold text-gray-800 flex-1">
              {t('additionalServices')}
            </Text>
          </View>
          
          <View className="space-y-3">
            <HelpBtn
              className="bg-green-50 border-2 border-green-200 rounded-xl p-4"
              icon="broom"
              iconSize={24}
              translationKey="cleanliness"
              onPress={() => console.log('Cleanliness help pressed')}
            />
            <HelpBtn
              className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4"
              icon="store"
              iconSize={24}
              translationKey="services"
              onPress={() => console.log('Services help pressed')}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="items-center flex-1">
              <View className="w-14 h-14 bg-purple-100 rounded-full items-center justify-center mb-2">
                <FontAwesome6 name="map-location-dot" size={20} color="#7C3AED" />
              </View>
              <Text className="text-xs text-gray-600 text-center">Find Location</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center flex-1">
              <View className="w-14 h-14 bg-yellow-100 rounded-full items-center justify-center mb-2">
                <FontAwesome6 name="bullhorn" size={20} color="#D97706" />
              </View>
              <Text className="text-xs text-gray-600 text-center">Announcements</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center flex-1">
              <View className="w-14 h-14 bg-indigo-100 rounded-full items-center justify-center mb-2">
                <FontAwesome6 name="headset" size={20} color="#4F46E5" />
              </View>
              <Text className="text-xs text-gray-600 text-center">Help Center</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Developer Testing Button - Remove in production */}
      {__DEV__ && (
        <View className="px-6 mb-6">
          <TouchableOpacity
            onPress={resetRegistration}
            className="bg-gray-200 rounded-xl p-4 items-center">
            <Text className="text-gray-700 font-medium">🔄 Reset Registration (Dev Only)</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
