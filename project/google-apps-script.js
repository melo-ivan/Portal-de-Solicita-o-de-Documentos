function doPost(e) {
  try {
    // Obter a planilha ativa
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Obter os parâmetros enviados
    const params = e.parameter;
    
    // Criar array com os dados na ordem das colunas da planilha
    const rowData = [
      new Date(), // Carimbo de data/hora
      params.email || '', // Endereço de e-mail
      '', // Pontuação (campo vazio)
      params.tipo_documento || '', // Tipo de Documento Solicitado
      params.nome || '', // Nome Completo do Colaborador
      params.matricula || '', // Matrícula ou Registro Corporativo
      params.departamento || '', // Departamento ou Setor de Trabalho
      params.cpf || '', // CPF do Colaborador
      params.telefone || '', // Telefone ou WhatsApp para Contato
      params.receber_por || '', // Como Deseja Receber o Documento
      params.identidade || '', // Documento de Identificação
      params.outro_doc || '', // Outro Documento ou Justificativa
      params.observacoes || '' // Observações Adicionais
    ];
    
    // Adicionar a linha na planilha
    sheet.appendRow(rowData);
    
    // Retornar resposta de sucesso
    return ContentService
      .createTextOutput('Solicitação enviada com sucesso! Você receberá uma confirmação em breve.')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    // Log do erro
    console.error('Erro ao processar solicitação:', error);
    
    // Retornar resposta de erro
    return ContentService
      .createTextOutput('Erro ao processar solicitação: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Serviço ativo - use POST para enviar dados')
    .setMimeType(ContentService.MimeType.TEXT);
}