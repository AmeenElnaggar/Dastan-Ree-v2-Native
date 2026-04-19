import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Project } from '../../../features/projects/project.model';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero-slider',
  imports: [RouterLink, TranslocoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss',
})
export class HeroSliderComponent {
  @ViewChild('mainSwiperEl') private mainSwiperEl!: ElementRef;

  private i18n = inject(I18nService);

  projects = input<Project[]>([]);

  activeIndex = signal(0);
  bottomVisible = signal(true);

  readonly autoplayDelay = 6000;

  readonly currentProject = computed(() => {
    const projs = this.projects();
    if (!projs.length) return null;
    return projs[this.activeIndex()] ?? projs[0];
  });

  readonly currentSlideLabel = computed(() =>
    String(this.activeIndex() + 1).padStart(2, '0'),
  );

  readonly totalSlidesLabel = computed(() =>
    String(this.projects().length).padStart(2, '0'),
  );

  constructor() {
    afterNextRender(() => {
      if (!this.mainSwiperEl) return;
      this.initSwiper();
    });
  }

  private initSwiper(): void {
    const mainEl = this.mainSwiperEl.nativeElement;
    const dir = this.i18n.isRtl ? 'rtl' : 'ltr';

    Object.assign(mainEl, {
      loop: true,
      speed: 1100,
      autoplay: {
        delay: this.autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      dir,
    });
    mainEl.initialize();

    mainEl.addEventListener('swiperslidechange', () => {
      const idx = mainEl.swiper?.realIndex ?? 0;
      this.activeIndex.set(idx);
      this.restartBottom();
    });
  }

  private restartBottom(): void {
    this.bottomVisible.set(false);
    setTimeout(() => this.bottomVisible.set(true), 20);
  }

  prevSlide(): void {
    this.mainSwiperEl?.nativeElement?.swiper?.slidePrev();
  }

  nextSlide(): void {
    this.mainSwiperEl?.nativeElement?.swiper?.slideNext();
  }

  goToSlide(index: number): void {
    this.mainSwiperEl?.nativeElement?.swiper?.slideToLoop(index, 800);
  }
}
