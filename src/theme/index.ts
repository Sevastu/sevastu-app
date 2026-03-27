import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING, BORDER_RADIUS } from './spacing';

export const theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
};

export type Theme = typeof theme;

export { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS };
