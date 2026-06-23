import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Highlights } from './components/highlights/highlights';
import { About } from './components/about/about';
import { Experience } from './components/experience/experience';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Education } from './components/education/education';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { ThemeService } from './shared/theme.service';
import { LanguageService } from './shared/language.service';
import { SeoService } from './shared/seo.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Header, Hero, Highlights, About, Experience, Projects, Skills, Education, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Instantiate the theme + language services so they apply saved/system prefs on load.
  private readonly theme = inject(ThemeService);
  private readonly language = inject(LanguageService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.init();
  }
}
