'use client';

import { Container, MantineProvider, createTheme, rem } from '@mantine/core';


const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(276),
  xs: rem(576),
  sm: rem(900),
  md: rem(1280),
  lg: rem(1440),
  xl: rem(1600),
  xxl: rem(1920),
};

export const theme = createTheme({
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px'
  },
  black: 'gray',
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
            ? CONTAINER_SIZES[size]
            : rem(size),
        },
      }),
    }),
  },
});