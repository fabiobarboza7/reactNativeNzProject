export default function translatePtBr(text) {
  let translatedText;
  switch (text) {
    case 'Snow':
      translatedText = 'Neve';
      break;
    case 'Sleet':
      translatedText = 'Chuva com Neve';
      break;
    case 'Hail':
      translatedText = 'Granizo';
      break;
    case 'Thunderstorm':
      translatedText = 'Trovoada';
      break;
    case 'Heavy Rain':
      translatedText = 'Chuva Forte';
      break;
    case 'Light Rain':
      translatedText = 'Chuva Moderada';
      break;
    case 'Showers':
      translatedText = 'Chuva Leve';
      break;
    case 'Heavy Cloud':
      translatedText = 'Céu Nublado';
      break;
    case 'Light Cloud':
      translatedText = 'Céu Parcialmente Nublado';
      break;
    case 'Clear':
      translatedText = 'Céu Limpo';
      break;
    default:
      return false;
  }

  return translatedText;
}
