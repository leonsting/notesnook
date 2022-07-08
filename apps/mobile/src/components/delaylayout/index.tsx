import React from 'react';
import { View, ViewProps } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import { useThemeStore } from '../../stores/use-theme-store';
import { useDelayLayout } from '../../utils/hooks/use-delay-layout';
import { DefaultPlaceholder } from './default-placeholder';
import { SettingsPlaceholder } from './settings-placeholder';

interface IDelayLayoutProps extends ViewProps {
  delay?: number;
  wait?: boolean;
  type?: 'default' | 'settings';
  color?: string;
}

const placeholder = {
  default: DefaultPlaceholder,
  settings: SettingsPlaceholder
};

export default function DelayLayout(props: IDelayLayoutProps) {
  const colors = useThemeStore(state => state.colors);
  const loading = useDelayLayout(!props.delay || props.delay < 300 ? 300 : props.delay);
  const Placeholder = placeholder[props.type || 'default'];

  return loading || props.wait ? (
    <Animated.View
      exiting={FadeOutUp}
      style={{
        backgroundColor: colors.bg,
        flex: 1,
        paddingTop: 20
      }}
    >
      <Placeholder color={props.color} />
    </Animated.View>
  ) : (
    <>{props.children}</>
  );
}
