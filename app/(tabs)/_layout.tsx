import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="loginScreen"
        options={{
          // href: null,
          title: 'Login',
          tabBarIcon: ({ color }) => <Ionicons name="enter-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="registerAccount"
        options={{
          // href: null,
          title: 'Register',
          tabBarIcon: ({ color }) => <Ionicons name="create-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'My Favorites',
          tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="viewByDirector"
        options={{
          // href: null,
          title: 'People',
          tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          // href: null,
          title: 'Search',
          tabBarIcon: ({ color }) => <Octicons name="search" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
