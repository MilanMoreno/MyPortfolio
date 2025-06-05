import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../../shared/services/clipboard/clipboard.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

@Component({
    selector: 'app-hero-section',
    imports: [CommonModule, TranslateModule],
    template: `
    <section class="hero" id="hero">
      <div class="hero__content">
        <div class="hero__left-container">
          <img 
            class="hero__image" 
            src="assets/img/hero.png" 
            alt="Hero image">
          <div class="hero__image-shadow"></div>
        </div>
        
        <div class="hero__text-container">
          <div class="hero__vertical-text">
            I am
          </div>
          <div class="hero__main-content" [@fadeInUp]>
            <h1 class="hero__name">{{ 'HERO.NAME' | translate }}</h1>
            <p class="hero__title">{{ 'HERO.JOBTITLE' | translate }}</p>
            
            <div class="hero__cta-wrapper">
              <a href="#contact" class="hero__cta">
                {{ 'HERO.LETSTALK' | translate }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="hero__footer">
        <div class="hero__line-container">
          <div class="hero__line"></div>
        </div>
        
        <div class="hero__social">
          <a 
            href="https://github.com/MilanMoreno" 
            target="_blank" 
            class="hero__social-link">
            <img src="assets/img/github.png" alt="GitHub">
          </a>
          <button 
            class="hero__social-link"
            (click)="copyEmail()">
            <img src="assets/img/email.png" alt="Email">
          </button>
          <a 
            href="https://www.linkedin.com/in/milan-moreno-9a7482360//"
            target="_blank" 
            class="hero__social-link">
            <img src="assets/img/linkedin.png" alt="LinkedIn">
          </a>
          <span class="hero__email">milan.moreno&#64;gmail.com</span>
        </div>

        <a href="#about" class="hero__scroll">
          {{ 'HERO.SCROLLDOWN' | translate }}
        </a>
      </div>

      <div 
        class="hero__notification"
        [class.hero__notification--visible]="(clipboardService.copyStatus$ | async)">
        {{ 'HERO.EMAIL_COPIED' | translate }}
      </div>
      
      <div class="hero__vector-shape"></div>
    </section>
  `,
    styles: [`
    .hero {
      position: relative;
      height: 100vh;
      background-color: var(--color-background-primary);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-top: var(--header-height);
      box-sizing: border-box;
    }

    .hero__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      width: 100%;
      padding: 0 100px;
      margin-top: -var(--header-height);
      position: relative;
      z-index: 2;
    }

    .hero__left-container {
      position: relative;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero__image {
      height: 75vh;
      object-fit: contain;
      position: relative;
      z-index: 3;
    }

    .hero__image-shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: url('/assets/img/hero-shadows.png') no-repeat;
      background-size: contain;
      z-index: 2;
      opacity: 0.8;
    }

    .hero__text-container {
      width: 50%;
      display: flex;
      align-items: center;
      z-index: 3;
    }

    .hero__vertical-text {
      transform: rotate(-90deg);
      font-size: 32px;
      color: var(--color-text-primary);
      white-space: nowrap;
      margin-right: 20px;
      transform-origin: center right;
    }

    .hero__main-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .hero__name {
      margin: 0;
      line-height: 1.2;
      font-size: 64px;
      color: var(--color-text-primary);
    }

    .hero__title {
      color: var(--color-accent-secondary);
      font-size: 32px;
      margin: 0;
      line-height: 1.2;
    }

    .hero__cta-wrapper {
      margin-top: 20px;
    }

    .hero__cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 165px;
      height: 58px;
      border-radius: 10px;
      background-color: var(--color-accent-primary);
      color: white;
      font-size: 23px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .hero__cta:hover {
      transform: scale(1.05);
      background-color: var(--color-accent-secondary);
    }

    .hero__vector-shape {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('/assets/img/Vector shape hero.png') no-repeat;
      background-size: cover;
      background-position: bottom center;
      z-index: 1;
      opacity: 0.8;
    }

    .hero__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      padding: 0 100px;
      z-index: 10;
      margin-top: auto;
      position: relative;
    }

    .hero__line-container {
      position: relative;
      width: 100px;
    }

    .hero__line {
      position: absolute;
      right: 0;
      width: 99999px;
      height: 4px;
      background-color: var(--color-accent-secondary);
    }

    .hero__social {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .hero__social-link {
      background: none;
      border: none;
      padding: 0;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
        
        img {
          filter: brightness(0) saturate(100%) invert(76%) sepia(15%) 
                 saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
        }
      }
    }

    .hero__email {
      margin-left: 15px;
      font-size: 23px;
      color: var(--color-text-primary);
      cursor: pointer;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .hero__scroll {
      transform: rotate(90deg);
      color: var(--color-text-primary);
      font-size: 20px;
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .hero__notification {
      position: fixed;
      bottom: -100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      padding: 1rem 2rem;
      border-radius: 10px;
      color: var(--color-text-primary);
      transition: bottom 0.3s ease;
      z-index: 100;

      &--visible {
        bottom: 2rem;
      }
    }

    @media (max-width: 1200px) {
      .hero__content {
        padding: 0 50px;
      }

      .hero__image {
        height: 65vh;
      }
    }

    @media (max-width: 900px) {
      .hero {
        height: auto;
        min-height: 100vh;
      }

      .hero__content {
        flex-direction: column;
        padding: 20px;
        gap: 2rem;
      }

      .hero__left-container {
        width: 100%;
        order: 1;
      }

      .hero__text-container {
        width: 100%;
        order: 2;
        justify-content: center;
      }

      .hero__main-content {
        align-items: center;
        text-align: center;
      }

      .hero__vertical-text {
        transform: none;
        margin-right: 0;
        margin-bottom: 20px;
      }

      .hero__image {
        height: 40vh;
      }

      .hero__footer {
        padding: 0 20px;
      }

      .hero__email {
        display: none;
      }
    }

    @media (max-width: 600px) {
      .hero__name {
        font-size: 48px;
      }

      .hero__title {
        font-size: 28px;
      }

      .hero__vertical-text {
        font-size: 24px;
      }

      .hero__cta {
        width: 140px;
        height: 50px;
        font-size: 20px;
      }

      .hero__social {
        gap: 15px;
      }

      .hero__scroll {
        font-size: 16px;
      }
    }

    @media (max-width: 400px) {
      .hero__name {
        font-size: 36px;
      }

      .hero__title {
        font-size: 24px;
      }

      .hero__vertical-text {
        font-size: 20px;
      }

      .hero__cta {
        width: 120px;
        height: 45px;
        font-size: 18px;
      }

      .hero__image {
        height: 35vh;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class HeroSectionComponent {
  constructor(public clipboardService: ClipboardManagerService) {}

  copyEmail(): void {
    this.clipboardService.copyToClipboard('milan.moreno.crea@gmail.com');
  }
}