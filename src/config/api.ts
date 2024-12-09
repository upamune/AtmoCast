export const LOCATIONS = ['Tokyo', 'Osaka', 'Fukuoka'] as const;
export type Location = typeof LOCATIONS[number];