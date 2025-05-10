import { createIntl, createIntlCache, IntlShape } from "react-intl";

// Tipagem para os objetos de mensagens
type MessageDescriptor = { [key: string]: string };

// Mensagens para português (Brasil)
const ptBR: MessageDescriptor = {
  "board.details.title": "Detalhes da Placa: {name}",
  "board.detail": "Detalhe {name}",
  "general.report": "Relatório",
  "board.chart.title": "Detalhamento da Placa:",
  "report.type.label": "Tipo de Relatório",
  "dropdown.select.type": "Selecionar Tipo",
  "report.startDate.label": "Data Inicial",
  "report.startDate.placeholder": "Data Inicial",
  "report.endDate.label": "Data Final",
  "report.endDate.placeholder": "Data Final",
  "general.dropdown.all": "Todos",
  "general.dropdown.input": "Entrada",
  "general.dropdown.drive": "Acionamento",
  "general.dropdown.drive_and_input": "Acionamento e Entrada",
  "general.dropdown.temperature": "Temperatura",
  "general.dropdown.water_monitoring": "Monitoramento de Água",
  "general.dropdown.water_tank_buoy_monitoring":
    "Monitoramento de Boia de Caixa d'Água",
  "general.dropdown.reservoir_buoy_monitoring":
    "Monitoramento de Boia de Reservatório",
  "general.dropdown.water_tank_monitoring": "Monitoramento de Caixa d'Água",
  "general.dropdown.reservoir_monitoring": "Monitoramento de Reservatório",
  "general.dropdown.scheduling": "Agendamento",
  "general.water.monitoring": "Nível de água",
  "general.water.reservoir": "Reservatório",
  "general.lvl.green": "Verde: Totalmente cheio",
  "general.lvl.yellow": "Amarelo: Abaixo do nível máximo (Esvaziando)",
  "general.lvl.pumpkin": "Abóbora: Acima do nível mínimo (Enchendo)",
  "general.lvl.red": "Vermelho: Abaixo do nível mínimo",
  "general.channels": "Canais",
  "general.channels.input": "Entradas",
};

// Mensagens para inglês
const enUS: MessageDescriptor = {
  "board.details.title": "Board Details: {name}",
  "board.detail": "Detail {name}",
  "general.report": "Report",
  "board.chart.title": "Board Details:",
  "report.type.label": "Report Type",
  "dropdown.select.type": "Select Type",
  "report.startDate.label": "Start Date",
  "report.startDate.placeholder": "Start Date",
  "report.endDate.label": "End Date",
  "report.endDate.placeholder": "End Date",
  "general.dropdown.all": "All",
  "general.dropdown.input": "Input",
  "general.dropdown.drive": "Drive",
  "general.dropdown.drive_and_input": "Drive and Input",
  "general.dropdown.temperature": "Temperature",
  "general.dropdown.water_monitoring": "Water Monitoring",
  "general.dropdown.water_tank_buoy_monitoring": "Water Tank Buoy Monitoring",
  "general.dropdown.reservoir_buoy_monitoring": "Reservoir Buoy Monitoring",
  "general.dropdown.water_tank_monitoring": "Water Tank Monitoring",
  "general.dropdown.reservoir_monitoring": "Reservoir Monitoring",
  "general.dropdown.scheduling": "Scheduling",
};

// Tipagem do objeto de mensagens por idioma
export const messages: Record<string, MessageDescriptor> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

// Criação do cache e função de instância do Intl
const cache = createIntlCache();

export const createI18n = (
  locale: keyof typeof messages = "pt-BR"
): IntlShape => {
  return createIntl(
    {
      locale,
      messages: messages[locale],
    },
    cache
  );
};

// Função para detectar o idioma do navegador
export const detectBrowserLanguage = (): keyof typeof messages => {
  const browserLang = navigator.language || (navigator as any).userLanguage;
  return messages[browserLang]
    ? (browserLang as keyof typeof messages)
    : "pt-BR";
};
