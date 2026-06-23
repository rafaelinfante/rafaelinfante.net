import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule, Translation } from '@jsverse/transloco';
import { App } from './app';
import { SITE } from './data/site';

// Minimal inline translations — enough for the structural assertions below.
const TRANSLATION: Translation = {
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
    downloadCv: 'Download CV',
  },
  seo: { title: 'Rafael Infante', description: 'Senior Fullstack Java Engineer & Team Lead' },
};

function translocoTesting() {
  return TranslocoTestingModule.forRoot({
    langs: { en: TRANSLATION, 'pt-BR': TRANSLATION },
    translocoConfig: { availableLangs: ['en', 'pt-BR'], defaultLang: 'en', reRenderOnLangChange: true },
    preloadLangs: true,
  });
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, translocoTesting()],
      providers: [provideNoopAnimations()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name in the hero heading', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(SITE.name);
  });

  it('should render the primary navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header nav')).toBeTruthy();
  });
});
