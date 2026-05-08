import type { Ionicons } from '@expo/vector-icons';
import type React from 'react';

export type AppScreen =
  | 'home'
  | 'cards'
  | 'pix'
  | 'shopping'
  | 'cashback'
  | 'community'
  | 'support'
  | 'profile'
  | 'statement';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];

export type ShoppingCategory = {
  label: string;
  icon: IconName;
};

export type ShoppingProduct = {
  id: string;
  category: string;
  name: string;
  store: string;
  price: string;
  oldPrice?: string;
  cashback: string;
  image: string;
};
