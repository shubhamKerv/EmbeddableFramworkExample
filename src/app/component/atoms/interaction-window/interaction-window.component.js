import interactionWindowTemplate from "./interaction-window.template";

export const InteractionWindow = () => {
  const frameworkURL = 'https://apps.mypurecloud.ie/crm/interaction.html';

  return interactionWindowTemplate({ frameworkURL });
};