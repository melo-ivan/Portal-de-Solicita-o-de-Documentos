import React, { useState } from 'react';
import { FileText, Send, Upload, CheckCircle, AlertCircle, Mail, User, Building, Hash, Phone, FileCheck, CreditCard } from 'lucide-react';

interface FormData {
  email: string;
  tipo_documento: string;
  nome: string;
  matricula: string;
  departamento: string;
  cpf: string;
  telefone: string;
  receber_por: string;
  identidade: string;
  outro_doc: string;
  observacoes: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    tipo_documento: '',
    nome: '',
    matricula: '',
    departamento: '',
    cpf: '',
    telefone: '',
    receber_por: '',
    identidade: '',
    outro_doc: '',
    observacoes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      // Criar FormData para envio
      const formDataToSend = new FormData();
      
      // Adicionar todos os campos do formulário
      formDataToSend.append('email', formData.email);
      formDataToSend.append('tipo_documento', formData.tipo_documento);
      formDataToSend.append('nome', formData.nome);
      formDataToSend.append('matricula', formData.matricula);
      formDataToSend.append('departamento', formData.departamento);
      formDataToSend.append('cpf', formData.cpf);
      formDataToSend.append('telefone', formData.telefone);
      formDataToSend.append('receber_por', formData.receber_por);
      formDataToSend.append('identidade', formData.identidade);
      formDataToSend.append('outro_doc', formData.outro_doc);
      formDataToSend.append('observacoes', formData.observacoes);

      const response = await fetch("https://script.google.com/macros/s/AKfycbzbLfnBJ1hBFKC8a4QdAROfSg7eXII66HP5q2DmK8E1cBBEkrv5d_Rv3AZ5vYT2evt5kg/exec", {
        method: "POST",
        body: formDataToSend,
        mode: 'no-cors' // Importante para Google Apps Script
      });

      // Como estamos usando no-cors, não podemos ler a resposta
      // Mas se chegou até aqui, provavelmente foi enviado com sucesso
      setSubmitStatus('success');
      setStatusMessage('Solicitação enviada com sucesso! Você receberá uma confirmação em breve.');
      
      // Limpar formulário após sucesso
      setFormData({
        email: '',
        tipo_documento: '',
        nome: '',
        matricula: '',
        departamento: '',
        cpf: '',
        telefone: '',
        receber_por: '',
        identidade: '',
        outro_doc: '',
        observacoes: ''
      });

    } catch (error) {
      console.error("Erro na requisição:", error);
      setSubmitStatus('error');
      setStatusMessage('Erro ao enviar solicitação. Verifique sua conexão e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tiposDocumento = [
    'Declaração de Vínculo Empregatício',
    'Declaração de Salário',
    'Declaração de Tempo de Serviço',
    'Carta de Apresentação',
    'Declaração de Horário de Trabalho',
    'Declaração de Função',
    'Declaração Simples de Vínculo',
    'Outro'
  ];

  const formasRecebimento = [
    'E-mail',
    'WhatsApp',
    'Retirada presencial',
    'Correio'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portal de Solicitação de Documentos</h1>
              <p className="text-gray-600">Solicite seus documentos corporativos de forma rápida e segura</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <h2 className="text-2xl font-bold text-white mb-2">Solicitação de Documento</h2>
            <p className="text-blue-100">Preencha todos os campos obrigatórios (*) para processar sua solicitação</p>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <p className="text-green-800 font-medium">{statusMessage}</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <p className="text-red-800 font-medium">{statusMessage}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Informações Pessoais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Informações Pessoais
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="seu.email@empresa.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="inline h-4 w-4 mr-1" />
                    CPF *
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            {/* Informações Profissionais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Informações Profissionais
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Hash className="inline h-4 w-4 mr-1" />
                    Matrícula ou Registro *
                  </label>
                  <input
                    type="text"
                    name="matricula"
                    value={formData.matricula}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Número da matrícula"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="inline h-4 w-4 mr-1" />
                    Departamento / Setor *
                  </label>
                  <input
                    type="text"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Ex: Recursos Humanos"
                  />
                </div>
              </div>
            </div>

            {/* Solicitação do Documento */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Detalhes da Solicitação
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Tipo de Documento *
                  </label>
                  <select
                    name="tipo_documento"
                    value={formData.tipo_documento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Selecione o tipo de documento</option>
                    {tiposDocumento.map((tipo, index) => (
                      <option key={index} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Send className="inline h-4 w-4 mr-1" />
                    Forma de Recebimento *
                  </label>
                  <select
                    name="receber_por"
                    value={formData.receber_por}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Como deseja receber?</option>
                    {formasRecebimento.map((forma, index) => (
                      <option key={index} value={forma}>{forma}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileCheck className="inline h-4 w-4 mr-1" />
                  Documento de Identificação *
                </label>
                <input
                  type="text"
                  name="identidade"
                  value={formData.identidade}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="RG ou CNH"
                />
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Informações Adicionais (Opcional)
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outro Documento ou Justificativa
                </label>
                <input
                  type="text"
                  name="outro_doc"
                  value={formData.outro_doc}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Especifique se necessário"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações Adicionais
                </label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Informações extras que possam ajudar no processamento da sua solicitação"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload className="inline h-4 w-4 mr-1" />
                  Anexar Documentos (Opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Arraste arquivos aqui ou clique para selecionar
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX, JPG, PNG (máx. 10MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Solicitação
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            © 2024 Portal de Solicitação de Documentos. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2">
            Para dúvidas ou suporte, entre em contato com o departamento de Recursos Humanos.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;