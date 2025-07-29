import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';
import '../global.css';

export default function HelpBtn({
  className = 'bg-white border-2 border-gray-200 shadow-soft',
  icon = 'circle-info',
  iconSize = 50,
  translationKey = 'default',
  onPress = () => {},
}) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mb-4 overflow-hidden rounded-2xl ${className}`}
      activeOpacity={0.85}>
      <View className="p-6">
        <View className="flex-row items-center">
          {/* Icon Container with Better Contrast */}
          <View className="relative">
            <View className="rounded-2xl bg-kumbhblue-600 p-4 shadow-medium">
              <FontAwesome6 name={icon} size={iconSize} color="white" />
            </View>
          </View>

          {/* Content Section with Better Contrast */}
          <View className="ml-6 flex-1">
            <Text className="mb-2 text-xl font-bold leading-tight text-gray-900">
              {t(`help_buttons.${translationKey}.title`)}
            </Text>
            <Text className="text-base leading-relaxed text-gray-700">
              {t(`help_buttons.${translationKey}.desc`)}
            </Text>
          </View>

          {/* Arrow Indicator */}
          <View className="ml-4">
            <FontAwesome6 name="chevron-right" size={20} color="#6B7280" />
          </View>
        </View>

        {/* Status Indicator with Better Contrast */}
        <View className="mt-4 border-t border-gray-300 pt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-600">Tap to access</Text>
            <View className="flex-row space-x-1">
              <View className="h-2 w-2 rounded-full bg-kumbhblue-400" />
              <View className="h-2 w-2 rounded-full bg-kumbhblue-600" />
              <View className="h-2 w-2 rounded-full bg-gray-400" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
