/**
 * Language-neutral site config and structural data.
 *
 * All visible copy lives in the Transloco translation files
 * (`src/i18n/en.json` and `src/i18n/pt-BR.json`). Only things that are the
 * same in every language — links, icons, and ordering — live here.
 */
import type { IconName } from '../shared/icon/icon-defs';

export const SITE = {
  name: 'Rafael Infante',
  email: 'matos.rafael@gmail.com',
  github: 'https://github.com/rafaelinfante',
  linkedin: 'https://www.linkedin.com/in/rafael-infante-65680394',
  // Placeholder CV — drop the final PDF at public/Rafael_Infante_CV.pdf (no code change).
  cvUrl: '/Rafael_Infante_CV.pdf',
  url: 'https://rafaelinfante.net',
} as const;

export type Lang = 'en' | 'pt-BR';
export const LANGS: readonly Lang[] = ['en', 'pt-BR'] as const;
export const DEFAULT_LANG: Lang = 'en';

export interface Social {
  key: 'linkedin' | 'github' | 'email';
  label: string;
  href: string;
  icon: IconName;
}

export const SOCIALS: Social[] = [
  { key: 'linkedin', label: 'LinkedIn', href: SITE.linkedin, icon: 'linkedin' },
  { key: 'github', label: 'GitHub', href: SITE.github, icon: 'github' },
  { key: 'email', label: 'Email', href: `mailto:${SITE.email}`, icon: 'mail' },
];

/** In-page section anchors, in nav order. Labels come from the `nav.*` keys. */
export const NAV_FRAGMENTS = ['about', 'experience', 'projects', 'skills', 'education', 'contact'] as const;
export type NavFragment = (typeof NAV_FRAGMENTS)[number];

/** Icons for the skill groups, matching the order of `skills.groups` in the i18n files. */
export const SKILL_ICONS: IconName[] = ['server', 'code', 'shield', 'cloud', 'database', 'beaker', 'users'];

/** Icons for the Telclic accomplishment groups, matching `experience.telclic.groups`. */
export const EXPERIENCE_ICONS: IconName[] = ['credit-card', 'git-branch', 'refresh-cw', 'map-pin', 'users', 'sparkles'];
