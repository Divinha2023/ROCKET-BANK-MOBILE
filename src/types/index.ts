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
  | 'statement'
  | 'invoice';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];

export type ShoppingCategory = {
  label: string;
  icon: IconName;
  available?: boolean;
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

export type CardVariant = 'standard' | 'gold' | 'black';

export type UserCard = {
  id: string;
  badge: string;
  cvv: string;
  description: string;
  dueDate: string;
  holder: string;
  kind: 'main' | 'virtual';
  number: string;
  title: string;
  variant: CardVariant;
};
