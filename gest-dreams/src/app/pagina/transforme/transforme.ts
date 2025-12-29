import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { FormularioService } from '../../services/formulario-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transforme',
  templateUrl: './transforme.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./transforme.css']
})
export class Transforme {

  mostrarFormulario = true;

  passoAtual = 0;
  passoAnterior = 0;
  invl = 0;

  formulario: FormGroup;

  // Notificação
  mostrarErro = false;
  mensagemErro = '';
  arrayInvalid: string[] = [];
  position = 0;

  mostarItem = false;

  private campos = [
    'name',
    'email',
    'telefone',
    'empresa',
    'cidade',
    'setor',
    'atuacao',
    'porte',
    'servico'
  ];

  constructor(private fb: FormBuilder, private sev : FormularioService) {
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100),Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      email: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(100) ,Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9+\\-\\s()]+$')]],
      empresa: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(100) ,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      cidade: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50) ,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      setor: ['', Validators.required],
      atuacao: [''], 
      atuacaooutro: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$'), Validators.minLength(2), Validators.maxLength(50)]],
      porte:['', Validators.required],
      servico: this.fb.array([], Validators.required)
    });
  }

  // Getter para o FormArray de serviços
  get servicoArray(): FormArray {
    return this.formulario.get('servico') as FormArray;
  }

  // =========================
  // BOTÃO (VALIDA)
  // =========================

  proximoPasso(): void {
    let control;

    if (this.mostarItem && this.passoAtual === 6) {
      control = this.formulario.get('atuacaooutro');
    } else if (this.passoAtual === 8) {
      control = this.servicoArray;
    } else {
      const campoAtual = this.campos[this.passoAtual];
      control = this.formulario.get(campoAtual);
    }

    if (!control || control.invalid) {
      control?.markAsTouched();
      this.mostrarErroCampoAtual();
      return;
    }

    this.irParaPasso(this.passoAtual + 1);
  }

  mostrarOutro(): void {
    this.mostarItem = true;

    this.formulario.get('atuacao')?.reset();
    this.formulario.get('atuacaooutro')?.setValidators(Validators.required);
    this.formulario.get('atuacaooutro')?.updateValueAndValidity();
  }

  anteriorPasso(): void {
    this.marcarCampoAtualComoTocado();
    
    if (this.campoAtualValido()) {
      this.irParaPasso(this.passoAtual - 1);
    } else {
      this.mostrarErroCampoAtual();
    }
  }

  verificar(): void {
    if (this.formulario.invalid) {
      console.log('invalid');
    } else {
      console.log('valid');
    }
  }

  // =========================
  // MÉTODO PARA CHECKBOXES
  // =========================

  toggleServico(value: string, event: any): void {
    const checked = event.target.checked;
    const servicoArray = this.servicoArray;
    
    if (!servicoArray.touched) {
      servicoArray.markAsTouched();
    }
    
    if (checked) {
      servicoArray.push(this.fb.control(value));
    } else {
      const index = servicoArray.controls.findIndex(x => x.value === value);
      if (index >= 0) {
        servicoArray.removeAt(index);
      }
    }
    
    servicoArray.updateValueAndValidity();
  }

  // =========================
  // TECLADO (NÃO BLOQUEIA)
  // =========================

  @HostListener('window:keydown', ['$event'])
handleKeyboard(event: KeyboardEvent): void {

  if (!this.mostrarFormulario) return;

  if (event.key === 'Tab') {
    event.preventDefault();
    if (event.shiftKey) {
      this.anteriorPasso();
    } else {
      this.proximoPasso();
    }
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    this.marcarCampoAtualComoTocado();
    if (this.campoAtualValido()) {
      this.irParaPasso(this.passoAtual + 1);
    } else {
      this.mostrarErroCampoAtual();
    }
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    this.marcarCampoAtualComoTocado();
    if (this.campoAtualValido()) {
      this.irParaPasso(this.passoAtual - 1);
    } else {
      this.mostrarErroCampoAtual();
    }
    return;
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    this.marcarCampoAtualComoTocado();
    if (this.campoAtualValido()) {
      this.irParaPasso(this.passoAtual - 1);
    } else {
      this.mostrarErroCampoAtual();
    }
    return;
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    this.marcarCampoAtualComoTocado();
    if (this.campoAtualValido()) {
      this.irParaPasso(this.passoAtual + 1);
    } else {
      this.mostrarErroCampoAtual();
    }
    return;
  }

}

  // =========================
  // CONTROLE DE PASSO
  // =========================

  private irParaPasso(novoPasso: number): void {
    if (novoPasso < 0 || novoPasso >= this.campos.length) return;

    this.passoAnterior = this.passoAtual;
    this.passoAtual = novoPasso;
  }

  // =========================
  // MÉTODOS AUXILIARES
  // =========================

  private marcarCampoAtualComoTocado(): void {
    if (this.mostarItem && this.passoAtual === 6) {
      this.formulario.get('atuacaooutro')?.markAsTouched();
    } else if (this.passoAtual === 8) {
      this.servicoArray.markAsTouched();
    } else if (this.passoAtual < this.campos.length) {
      const campoAtual = this.campos[this.passoAtual];
      this.formulario.get(campoAtual)?.markAsTouched();
    }
  }

  private campoAtualValido(): boolean {
    if (this.mostarItem && this.passoAtual === 6) {
      return this.formulario.get('atuacaooutro')?.valid || false;
    } else if (this.passoAtual === 8) {
      return this.servicoArray.valid && this.servicoArray.length > 0;
    } else if (this.passoAtual < this.campos.length) {
      const campoAtual = this.campos[this.passoAtual];
      return this.formulario.get(campoAtual)?.valid || false;
    }
    return true;
  }

  private mostrarErroCampoAtual(): void {
    let campoNome = '';
    let mensagem = '';
    
    if (this.passoAtual === 8) {
      campoNome = 'serviço';
      mensagem = 'Por favor, selecione pelo menos uma solução.';
    } else if (this.mostarItem && this.passoAtual === 6) {
      campoNome = 'área de atuação';
      mensagem = 'Por favor, especifique a área de atuação.';
    } else {
      const camposNomes: {[key: string]: string} = {
        'name': 'nome completo',
        'email': 'e-mail',
        'telefone': 'telefone',
        'empresa': 'empresa',
        'cidade': 'cidade',
        'setor': 'setor de atividade',
        'atuacao': 'área de atuação',
        'porte': 'porte da empresa'
      };
      const campoAtual = this.campos[this.passoAtual];
      campoNome = camposNomes[campoAtual] || campoAtual;
      mensagem = `Por favor, preencha o campo "${campoNome}".`;
    }
    
    this.mensagemErro = mensagem;
    this.mostrarErro = true;

    setTimeout(() => {
      this.mostrarErro = false;
    }, 3000);
  }

  // =========================
  // MÉTODOS DE SEGURANÇA
  // =========================

  private detectMaliciousContent(text: string): { isMalicious: boolean; patterns: string[] } {
    if (!text) return { isMalicious: false, patterns: [] };

    const maliciousPatterns = [
      { pattern: /<svg[\s\S]*?<\/svg>/gi, name: 'Tag SVG' },
      { pattern: /<svg[\s\S]*?>/gi, name: 'Tag SVG aberta' },
      { pattern: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, name: 'Tag Script' },
      { pattern: /<script[\s\S]*?>/gi, name: 'Tag Script aberta' },
      { pattern: /\son\w+\s*=\s*["'][^"']*["']/gi, name: 'Event Handler' },
      { pattern: /\son\w+\s*=\s*[^"'\s][^\s>]*/gi, name: 'Event Handler sem aspas' },
      { pattern: /javascript:/gi, name: 'Protocolo JavaScript' },
      { pattern: /vbscript:/gi, name: 'Protocolo VBScript' },
      { pattern: /data:text\/html/gi, name: 'Data URL HTML' },
      { pattern: /data:image\/svg\+xml/gi, name: 'Data URL SVG' },
      { pattern: /<iframe[\s\S]*?<\/iframe>/gi, name: 'Tag Iframe' },
      { pattern: /<object[\s\S]*?<\/object>/gi, name: 'Tag Object' },
      { pattern: /<embed[\s\S]*?<\/embed>/gi, name: 'Tag Embed' }
    ];

    const detectedPatterns: string[] = [];
    maliciousPatterns.forEach(mp => {
      if (mp.pattern.test(text)) {
        detectedPatterns.push(mp.name);
      }
    });

    return {
      isMalicious: detectedPatterns.length > 0,
      patterns: detectedPatterns
    };
  }

  private sanitizeForDisplay(text: string): string {
    if (!text) return '';

    return text
      .replace(/<svg[\s\S]*?<\/svg>/gi, '🔒 [conteúdo bloqueado]')
      .replace(/<svg[\s\S]*?>/gi, '🔒 [conteúdo bloqueado]')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '🔒 [script bloqueado]')
      .replace(/<script[\s\S]*?>/gi, '🔒 [script bloqueado]')
      .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .trim();
  }

  // =========================
  // SUBMIT COM SEGURANÇA
  // =========================

  submit(): void {

  this.formulario.markAllAsTouched();

  if (this.formulario.invalid) {
    console.log('❌ Formulário inválido');
    return;
  }

  const rawData = this.formulario.value;

  // Campos que podem conter texto livre
  const camposTexto = [
    'name',
    'email',
    'telefone',
    'empresa',
    'cidade',
    'atuacao',
    'atuacaooutro'
  ];

  let hasMalicious = false;
  let patternsDetected: string[] = [];

  camposTexto.forEach(campo => {
    const valor = rawData[campo];
    if (valor) {
      const detected = this.detectMaliciousContent(valor);
      if (detected.isMalicious) {
        hasMalicious = true;
        patternsDetected.push(...detected.patterns);
      }
    }
  });

  if (hasMalicious) {
    Swal.fire({
      icon: 'error',
      title: 'Conteúdo bloqueado',
      html: `
        <p>Detectamos conteúdo potencialmente perigoso:</p>
        <strong>${[...new Set(patternsDetected)].join(', ')}</strong>
        <p>Remova esse conteúdo e tente novamente.</p>
      `,
      confirmButtonColor: '#cc0000'
    });
    return;
  }

  // =========================
  // DADOS LIMPOS PARA ENVIO
  // =========================

  const cleanData = {
    name: rawData.name.trim(),
    email: rawData.email.trim(),
    telefone: rawData.telefone.replace(/[^\d+\-\s()]/g, ''),
    empresa: rawData.empresa.trim(),
    cidade: rawData.cidade.trim(),
    setor: rawData.setor,
    atuacao: rawData.atuacaooutro || rawData.atuacao,
    porte: rawData.porte,
    servicos: rawData.servico // FormArray
  };

  console.log('✅ Dados seguros para envio:', cleanData);

  // Loading
  Swal.fire({
    title: 'Enviando...',
    text: 'Aguarde um momento',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  this.sendToBackend(cleanData);
}
  private sendToBackend(data: any): void {

  this.sev.EnviarFormulario(data).subscribe({
    next: (response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Mensagem enviada!',
        text: 'Entraremos em contato em breve.',
        confirmButtonColor: '#006699'
      });

      this.formulario.reset();
      this.servicoArray.clear();
      this.passoAtual = 0;
      this.mostarItem = false;
    },
    error: (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar',
        text: 'Tente novamente mais tarde.',
        confirmButtonColor: '#cc0000'
      });
    }
  });
}

}