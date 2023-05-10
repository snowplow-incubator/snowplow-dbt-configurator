import channel_group from './channel_group';
import conversions from './conversions';

export const schemata = Object.freeze({
  Channel: channel_group,
  Conversions: conversions

} as const);

export type Schema = keyof typeof schemata;
