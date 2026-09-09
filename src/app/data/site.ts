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
  linkedin: 'https://www.linkedin.com/in/infanterafael',
  cvUrl: '/Rafael_Infante_CV.pdf',
  url: 'https://rafaelinfante.net',
  calendly: 'https://calendly.com/rafaelinfante',
} as const;

export const OPEN_TO_WORK = false;

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

/**
 * Certification badges shown in the certifications strip, in display order.
 * Language-neutral by design: the visible name / issuer / alt text live under
 * `certifications.items` in the i18n files and are matched by position.
 *
 * `credlyUrl` is the badge's public verification link (Credly → the badge →
 * Share → "Public link"). A badge with an empty `credlyUrl` still renders, just
 * not as a link — so a missing URL can never ship as a broken one.
 */
export interface Certification {
  key: string;
  image: string;
  credlyUrl: string;
}

export const CERTIFICATIONS: Certification[] = [
  { key: 'aws', image: '/badges/aws-certified-developer-associate.png', credlyUrl: 'https://www.credly.com/badges/ecacf883-e1ec-41fc-aab1-10365e9669af/public_url' },
  { key: 'oracle', image: '/badges/oracle-certified-professional-java.png', credlyUrl: 'https://www.credly.com/badges/75f15b29-29db-40a8-bc76-a3685fa021a6/public_url' },
];

/** In-page section anchors, in nav order. Labels come from the `nav.*` keys. */
export const NAV_FRAGMENTS = ['about', 'experience', 'projects', 'skills', 'education', 'contact'] as const;
export type NavFragment = (typeof NAV_FRAGMENTS)[number];

/** Icons for the skill groups, matching the order of `skills.groups` in the i18n files. */
export const SKILL_ICONS: IconName[] = ['server', 'code', 'shield', 'cloud', 'database', 'beaker', 'users'];

/** Icons for the Telclic accomplishment groups, matching `experience.telclic.groups`. */
export const EXPERIENCE_ICONS: IconName[] = ['credit-card', 'git-branch', 'refresh-cw', 'map-pin', 'users', 'sparkles'];

/**
 * Certificate links for `education.courses`, matched by position. Kept here rather than in
 * the i18n files because the URLs are the same in every language — reordering the courses
 * means reordering these too. An empty entry renders as a plain chip, not a broken link.
 */
export const COURSE_CERTIFICATE_URLS: string[] = [
  '', // Globalcode · Web Developer Academy
  '', // Globalcode · Java Academy
  'https://www.udemy.com/certificate/UC-2dcb645d-4ac4-4908-a8e0-f817856859f0/', // Udemy · Spring & Hibernate
  'https://www.udemy.com/certificate/UC-246d222d-82d3-431c-900f-028eafc855da/', // Udemy · Angular – The Complete Guide
  'https://www.udemy.com/certificate/UC-1ac148ce-3843-4829-b60c-d917c1a24e10/', // Udemy · Apache Maven: Beginner to Guru
  'https://www.udemy.com/certificate/UC-73875744-0ede-4de2-903e-d215b70cd121/', // Udemy · Responsive Web Design HTML5 & CSS3
  'https://www.udemy.com/certificate/UC-da96a740-c83b-4148-a6e4-d1307114e331/', // Udemy · Bootstrap 4
];

/**
 * Icons for the labelled blocks of the case-study projects (the ones whose i18n
 * entry carries a `blocks` array), keyed by the project's position in
 * `projects.items` and then matching the order of its blocks. Reordering
 * `projects.items` in the i18n files means reordering these too.
 */
export const CASE_STUDY_ICONS: Record<number, IconName[]> = {
  0: ['git-branch', 'credit-card', 'refresh-cw'], // PayBrix
  1: ['git-branch', 'globe', 'shield', 'sparkles', 'server'], // Visitor Parking Management
  2: ['git-branch', 'map-pin', 'credit-card', 'calendar'], // TrafficFlow
};
