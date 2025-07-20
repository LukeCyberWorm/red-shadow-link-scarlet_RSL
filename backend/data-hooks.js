// RSL Data Hooks - Wix Velo
// Hooks automáticos para operações de database

import wixData from 'wix-data';

/**
 * Hook executado antes de inserir um novo caso
 */
export function logCaseCreation(item, context) {
  // Gerar ID único para o caso
  if (!item.caseId) {
    item.caseId = 'CASE_' + Date.now();
  }
  
  // Definir data de criação
  item.createdDate = new Date();
  item.lastUpdate = new Date();
  
  // Log da criação
  wixData.insert('RSLLogs', {
    logId: 'LOG_' + Date.now(),
    userId: context.userId || 'system',
    action: 'case_created',
    module: 'Cases',
    details: JSON.stringify({
      caseId: item.caseId,
      title: item.title,
      suspect: item.suspect
    }),
    timestamp: new Date(),
    ipAddress: context.ip || 'unknown'
  });
  
  return item;
}

/**
 * Hook executado após atualizar um caso
 */
export function logCaseUpdate(item, context) {
  // Atualizar timestamp
  item.lastUpdate = new Date();
  
  // Log da atualização
  wixData.insert('RSLLogs', {
    logId: 'LOG_' + Date.now(),
    userId: context.userId || 'system',
    action: 'case_updated',
    module: 'Cases',
    details: JSON.stringify({
      caseId: item.caseId,
      updatedFields: context.updatedFields || []
    }),
    timestamp: new Date(),
    ipAddress: context.ip || 'unknown'
  });
  
  return item;
}

/**
 * Hook executado antes de remover um caso
 */
export function validateCaseRemoval(itemId, context) {
  // Verificar se o usuário tem permissão
  if (context.userRole !== 'Administrator') {
    throw new Error('Apenas administradores podem excluir casos');
  }
  
  // Log da remoção
  wixData.insert('RSLLogs', {
    logId: 'LOG_' + Date.now(),
    userId: context.userId || 'system',
    action: 'case_deleted',
    module: 'Cases',
    details: JSON.stringify({
      deletedCaseId: itemId,
      reason: context.reason || 'not_specified'
    }),
    timestamp: new Date(),
    ipAddress: context.ip || 'unknown'
  });
  
  return itemId;
}

/**
 * Hook para validar dados do suspeito antes da inserção
 */
export function validateSuspectData(item, context) {
  // Gerar ID único
  if (!item.suspectId) {
    item.suspectId = 'SUSP_' + Date.now();
  }
  
  // Validações básicas
  if (!item.fullName || item.fullName.length < 2) {
    throw new Error('Nome completo é obrigatório');
  }
  
  // Padronizar nível de ameaça
  if (!item.threatLevel) {
    item.threatLevel = 'Baixo';
  }
  
  // Status padrão
  if (!item.status) {
    item.status = 'Monitoramento';
  }
  
  return item;
}

/**
 * Hook executado após inserir novo suspeito
 */
export function logSuspectCreation(item, context) {
  wixData.insert('RSLLogs', {
    logId: 'LOG_' + Date.now(),
    userId: context.userId || 'system',
    action: 'suspect_created',
    module: 'Suspects',
    details: JSON.stringify({
      suspectId: item.suspectId,
      fullName: item.fullName,
      threatLevel: item.threatLevel
    }),
    timestamp: new Date(),
    ipAddress: context.ip || 'unknown'
  });
  
  return item;
}

/**
 * Hook executado após atualizar suspeito
 */
export function logSuspectUpdate(item, context) {
  wixData.insert('RSLLogs', {
    logId: 'LOG_' + Date.now(),
    userId: context.userId || 'system',
    action: 'suspect_updated',
    module: 'Suspects',
    details: JSON.stringify({
      suspectId: item.suspectId,
      updatedFields: context.updatedFields || []
    }),
    timestamp: new Date(),
    ipAddress: context.ip || 'unknown'
  });
  
  return item;
}

/**
 * Hook para processar alertas de localização
 */
export function processLocationAlert(item, context) {
  // Gerar ID único
  if (!item.locationId) {
    item.locationId = 'LOC_' + Date.now();
  }
  
  // Verificar se é uma localização de alta prioridade
  if (item.confidence > 90) {
    // Enviar alerta para investigadores
    sendHighConfidenceAlert(item);
  }
  
  // Log da detecção
  wixData.insert('RSLLogs', {
    logId: 'LOG_' + Date.now(),
    userId: context.userId || 'system',
    action: 'location_detected',
    module: 'Location',
    details: JSON.stringify({
      locationId: item.locationId,
      suspectId: item.suspectId,
      confidence: item.confidence,
      detectionType: item.detectionType
    }),
    timestamp: new Date(),
    ipAddress: context.ip || 'unknown'
  });
  
  return item;
}

/**
 * Hook para validar remoção de localização
 */
export function validateLocationRemoval(itemId, context) {
  // Log da remoção
  wixData.insert('RSLLogs', {
    logId: 'LOG_' + Date.now(),
    userId: context.userId || 'system',
    action: 'location_deleted',
    module: 'Location',
    details: JSON.stringify({
      deletedLocationId: itemId
    }),
    timestamp: new Date(),
    ipAddress: context.ip || 'unknown'
  });
  
  return itemId;
}

/**
 * Hook para enviar email de boas-vindas
 */
export function sendWelcomeEmail(item, context) {
  // Implementar envio de email (Wix CRM)
  console.log(`Enviando email de boas-vindas para: ${item.email}`);
  
  return item;
}

/**
 * Hook para validar permissões de usuário
 */
export function validateUserPermissions(item, context) {
  // Validar estrutura das permissões
  if (item.permissions) {
    try {
      const perms = JSON.parse(item.permissions);
      if (!Array.isArray(perms)) {
        throw new Error('Permissões devem ser um array');
      }
    } catch (e) {
      throw new Error('Formato de permissões inválido');
    }
  }
  
  return item;
}

/**
 * Hook executado após atualizar usuário
 */
export function logUserUpdate(item, context) {
  wixData.insert('RSLLogs', {
    logId: 'LOG_' + Date.now(),
    userId: context.userId || 'system',
    action: 'user_updated',
    module: 'Users',
    details: JSON.stringify({
      updatedUserId: item.userId,
      updatedFields: context.updatedFields || []
    }),
    timestamp: new Date(),
    ipAddress: context.ip || 'unknown'
  });
  
  return item;
}

/**
 * Função auxiliar para enviar alertas de alta confiança
 */
function sendHighConfidenceAlert(location) {
  // Implementar notificação push ou email
  console.log(`🚨 ALERTA: Detecção com ${location.confidence}% de confiança`);
  console.log(`Suspeito: ${location.suspectId}`);
  console.log(`Local: ${location.name}`);
  
  // Aqui seria integrado com sistema de notificações do Wix
}
