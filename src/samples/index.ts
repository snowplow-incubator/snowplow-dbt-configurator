import channel_group from './channel_group';
import conversions from './conversions';

export const samples = Object.freeze({
  Channel: channel_group,
  Conversions: conversions

} as const);

export type Sample = keyof typeof samples;
