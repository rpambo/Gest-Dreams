import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ChangeDetectorRef, HostListener, ViewChildren, QueryList, ElementRef } from '@angular/core';

declare const UIkit: any;

@Component({
  selector: 'app-servicos',
  imports: [CommonModule],
  templateUrl: './servicos.html',
  styleUrls: ['./servicos.css'], // corrigido
})
export class Servicos implements AfterViewInit {
  @ViewChildren('hoverText') hoverTexts!: QueryList<ElementRef<HTMLSpanElement>>;
  
  programas = [
    {
      titulo: 'O Programa de Saúde Mental do trabalhador',
      descricao: [
        'O Programa de Saúde Mental do trabalhador foi desenhado para responder diretamente aos desafios enfrentados pelas organizações modernas.',
        'Através de uma abordagem estruturada, o programa combina prevenção, apoio psicológico e promoção do bem-estar, criando ambientes corporativos mais equilibrados e sustentáveis.',
        'Ao integrar estas práticas na gestão de pessoas, a empresa fortalece as suas equipas, reduz custos com absentismo e potencia a produtividade de forma consistente.'
      ],
      imagem: 'imagens/upload/programas/programa-1.png',
      cta: 'Comece a cuidar da sua equipa'
    },
    {
      titulo: 'Mentoria de saúde mental para Gestores',
      descricao: [
        'Mentoria em saúde mental para gestores que desejam equilibrar bem-estar e produtividade, sem perder a clareza nas decisões.'
      ],
      lista: [
        'Desenvolvendo líderes resilientes e conscientes',
        'Equilibrando saúde mental e performance',
        'Criando ambientes de trabalho mais humanos',
        'Construindo resultados sustentáveis'
      ],
      imagem: 'imagens/upload/programas/programa-2.png',
      cta: 'Agende sua mentoria agora'
    },
    {
      titulo: 'Atendimento empresarial',
      descricao: [
        'Oferecemos atendimento empresarial especializado para fortalecer a saúde mental dentro das organizações. Criamos programas sob medida que equilibram bem-estar emocional e alta performance, de acordo com as necessidades de cada equipa.',
        'Nosso foco está em reduzir níveis de stress, melhorar a comunicação interna, prevenir o esgotamento profissional e aumentar o engajamento dos colaboradores. Acreditamos que empresas mais saudáveis geram equipas mais criativas, motivadas e produtivas.'
      ],
      imagem: 'imagens/upload/programas/programa-3.png',
      cta: 'Solicite atendimento personalizado'
    },
    {
      titulo: 'Gestão de programa de saúde mental para empresas',
      descricao: [
        'A gestão da saúde mental deixou de ser apenas uma tendência para se tornar uma prioridade estratégica nas organizações modernas. Mais do que cuidar do bem-estar individual, trata-se de construir ambientes de trabalho saudáveis, sustentáveis e preparados para enfrentar os desafios de um mercado cada vez mais competitivo.',
        'Entendemos que empresas saudáveis são feitas de pessoas saudáveis. Por isso, oferecemos uma abordagem integrada que une diagnóstico, prevenção, acompanhamento contínuo e resultados mensuráveis.'
      ],
      imagem: 'imagens/upload/programas/programa-4.png',
      cta: 'Transforme sua empresa hoje'
    }
  ];

  currentSlide = 1;
  cardsPerSlide = 3;

  constructor(private cdr: ChangeDetectorRef) {}

  get sliderSteps(): number[] {
    return Array.from({ length: Math.ceil(this.programas.length / this.cardsPerSlide) }, (_, i) => i);
  }

  ngAfterViewInit(): void {
    this.updateCardsPerSlide();
    setTimeout(() => {
      this.initSlider();
      this.initParallax(); // chamada do parallax
    }, 0);
  }

 hoverStyles: { [key: number]: any } = {};

onMouseMove(event: MouseEvent, index: number) {
  const target = event.currentTarget as HTMLElement; // a div do card
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left; // posição relativa ao card
  const y = event.clientY - rect.top;

  this.hoverStyles[index] = {
    left: `${x}px`,
    top: `${y}px`,
    opacity: 1,
    position: 'absolute',
    transform: 'translate(-50%, -120%)',
    pointerEvents: 'none'
  };
}

onMouseLeave(index: number) {
  this.hoverStyles[index] = { ...this.hoverStyles[index], opacity: 0 };
}

  @HostListener('window:resize')
  onResize() {
    this.updateCardsPerSlide();
  }

  updateCardsPerSlide() {
    const width = window.innerWidth;
    if (width >= 1200) this.cardsPerSlide = 3;
    else if (width >= 768) this.cardsPerSlide = 2;
    else this.cardsPerSlide = 1;
  }

  initSlider() {
    const sliderEl = document.querySelector('[uk-slider]');
    if (sliderEl) {
      const slider = UIkit.slider(sliderEl, { autoplay: false, finite: true, pauseOnHover: false });

      // Atualiza o contador quando o slide muda
      UIkit.util.on(sliderEl, 'itemshown', () => {
        const slides = sliderEl.querySelectorAll('.uk-slider-items > div');
        const current = Array.from(slides).findIndex((el: any) => el.classList.contains('uk-active'));
        this.currentSlide = current + 1;
        this.cdr.detectChanges();
      });

      // Intersection Observer para iniciar autoplay só quando entrar na tela
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              slider.startAutoplay();
              observer.unobserve(sliderEl);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(sliderEl);
    }
  }

  // Parallax suave nas imagens
  initParallax() {
    const containers = document.querySelectorAll<HTMLElement>('.parallax-img');

    containers.forEach((container) => {
      const img = container.querySelector('img') as HTMLElement;
      if (!img) return;

      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;

      container.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = (x - centerX) / centerX * 25; // ajusta intensidade X
        targetY = (y - centerY) / centerY * 25; // ajusta intensidade Y
      });

      const animate = () => {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        img.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;

        requestAnimationFrame(animate);
      };
      animate();

      container.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
      });
    });
  }
}