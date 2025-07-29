import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRegistration } from '../../context/RegistrationContext';
import { UserStorage } from '../../utils/UserStorage';
import '../../global.css';
import HelpBtn from '../../components/HelpBtn';
import LanguageSwitch from '../../components/LanguageSwitch';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { setShowRegistration } = useRegistration();

  const resetRegistration = async () => {
    try {
      await UserStorage.clearAllData();
      // Force app to restart by reloading the page (for testing purposes)
      // In production, you might want to navigate to user type selection
      console.log('All user data cleared for testing');
    } catch (error) {
      console.error('Error resetting registration:', error);
    }
  };

  return (
    <View className="flex-1 bg-kumbhblue-50">
      {/* Header Section */}
      <View className="bg-kumbhblue-600 px-6 pb-6 pt-12">
        <View className="mb-4 flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="mb-1 text-2xl font-bold text-white">{t('welcome')}</Text>
            <Text className="text-sm text-kumbhblue-100">{t('tagline')}</Text>
          </View>
          <View className="mt-2">
            <LanguageSwitch />
          </View>
        </View>

        {/* Logo Section */}
        <View className="mt-4 items-center">
          <Image
            source={require('../../assets/KumbhRakshak.png')}
            className="h-32 w-32"
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Emergency Services Section */}
        <View className="p-6">
          <Text className="mb-4 text-xl font-bold text-gray-800">{t('emergencyServices')}</Text>
          <View className="grid grid-cols-2 gap-4">
            <HelpBtn
              className="border-2 border-red-300 bg-red-50 shadow-soft"
              translationKey="emergency"
              iconSize={44}
            />
            <HelpBtn
              className="border-2 border-blue-300 bg-blue-50 shadow-soft"
              translationKey="services"
              iconSize={44}
            />
            <HelpBtn
              className="border-2 border-green-300 bg-green-50 shadow-soft"
              translationKey="cleanliness"
              iconSize={44}
            />
            <HelpBtn
              className="border-2 border-yellow-300 bg-yellow-50 shadow-soft"
              translationKey="emergency"
              iconSize={44}
            />
          </View>
        </View>

        {/* Additional Services Section */}
        <View className="px-6 pb-6">
          <Text className="mb-4 text-xl font-bold text-gray-800">{t('additionalServices')}</Text>
          <View className="grid grid-cols-2 gap-4">
            <HelpBtn
              className="border-2 border-purple-300 bg-purple-50 shadow-soft"
              translationKey="default"
              iconSize={44}
            />
            <HelpBtn
              className="border-2 border-orange-300 bg-orange-50 shadow-soft"
              translationKey="default"
              iconSize={44}
            />
          </View>
        </View>

        {/* Debug Button - Remove in production */}
        <View className="px-6 pb-8">
          <TouchableOpacity onPress={resetRegistration} className="rounded-lg bg-gray-200 p-3">
            <Text className="text-center text-gray-700">Reset Registration (Debug)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
