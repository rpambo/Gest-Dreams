import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';

declare const UIkit: any;

@Component({
  selector: 'app-servicos',
  imports: [CommonModule],
  templateUrl: './servicos.html',
  styleUrl: './servicos.css',
})
export class Servicos {
   programas = [
    {
      titulo: 'O Programa de Saúde Mental do trabalhador',
      descricao: [
        'O Programa de Saúde Mental do trabalhador foi desenhado para responder diretamente aos desafios enfrentados pelas organizações modernas.',
        'Através de uma abordagem estruturada, o programa combina prevenção, apoio psicológico e promoção do bem-estar, criando ambientes corporativos mais equilibrados e sustentáveis.',
        'Ao integrar estas práticas na gestão de pessoas, a empresa fortalece as suas equipas, reduz custos com absentismo e potencia a produtividade de forma consistente.'
      ],
      imagem: 'imagens/upload/programas/programa-1.png'
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
      imagem: 'imagens/upload/programas/programa-2.png'
    },
    {
      titulo: 'Atendimento empresarial',
      descricao: [
        'Oferecemos atendimento empresarial especializado para fortalecer a saúde mental dentro das organizações. Criamos programas sob medida que equilibram bem-estar emocional e alta performance, de acordo com as necessidades de cada equipa.',
        'Nosso foco está em reduzir níveis de stress, melhorar a comunicação interna, prevenir o esgotamento profissional e aumentar o engajamento dos colaboradores. Acreditamos que empresas mais saudáveis geram equipas mais criativas, motivadas e produtivas.'
      ],
      imagem: 'imagens/upload/programas/programa-3.png'
    },
    {
      titulo: 'Gestão de programa de saúde mental para empresas',
      descricao: [
        'A gestão da saúde mental deixou de ser apenas uma tendência para se tornar uma prioridade estratégica nas organizações modernas. Mais do que cuidar do bem-estar individual, trata-se de construir ambientes de trabalho saudáveis, sustentáveis e preparados para enfrentar os desafios de um mercado cada vez mais competitivo.',
        'Entendemos que empresas saudáveis são feitas de pessoas saudáveis. Por isso, oferecemos uma abordagem integrada que une diagnóstico, prevenção, acompanhamento contínuo e resultados mensuráveis.'
      ],
      imagem: 'imagens/upload/programas/programa-4.png'
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
    setTimeout(() => this.initSlider(), 0); // espera o ngFor renderizar
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
    // Inicializa sem autoplay
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
            slider.startAutoplay(); // começa o autoplay
            observer.unobserve(sliderEl); // só dispara uma vez
          }
        });
      },
      { threshold: 0.5 } // 50% visível
    );

    observer.observe(sliderEl);
  }
}

}
