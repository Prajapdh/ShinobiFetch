import { parse } from 'node-html-parser';
import he from 'he';
import { Episode } from '../models/Episode.js';

const getEpisodes = async () => {
    const url = "https://naruto.fandom.com/wiki/List_of_Animated_Media#Naruto:_Shipp%C5%ABden";
    return await fetch(url)
        .then(res => res.text())
        .then(body => parseEpisodes(body));
};

const parseEpisodes = (body) => {
    const tables = parse(body).querySelectorAll(".table.coloured.bordered.innerbordered");
    let episodes = [];
    tables.forEach(table => {
        const rows = table.querySelectorAll("tr");
        rows.forEach(row => {
            const aTags = row.querySelectorAll("a");
            aTags.forEach(aTag => {
                episodes.push(aTag.innerText.trim());
            });
        });
    });
    return episodes;
};
//sample usage
getEpisodes().then(episodes => console.log(episodes));


const getEpisodeNumber = (body) => {
  const root = parse(body);
  const infobox = root.querySelector('.portable-infobox');
  const episodeNumberElement = infobox?.querySelector('div[data-source="episode"] div');
  return episodeNumberElement ? episodeNumberElement.textContent.trim() : '';
};

const getSynopsis = (body) => {
  const root = parse(body);
  const synopsisHeader = root.querySelector('h2 span#Synopsis, h2 span#Plot');
  if (synopsisHeader) {
    let synopsisContent = '';
    let currentElement = synopsisHeader.parentNode.nextElementSibling;
    while (currentElement && currentElement.tagName !== 'H2') {
      synopsisContent += currentElement.textContent + '\n';
      currentElement = currentElement.nextElementSibling;
    }
    return he.decode(synopsisContent.trim());
  }
  return '';
};

const getTrivia = (body) => {
  const root = parse(body);
  const triviaHeader = root.querySelector('h2 span#Trivia');
  if (triviaHeader) {
    const triviaList = triviaHeader.parentNode.nextElementSibling;
    const triviaItems = triviaList.querySelectorAll('li');
    return triviaItems.map(item => he.decode(item.textContent.trim()));
  }
  return [];
};

const getArc = (body) => {
  const root = parse(body);
  const infobox = root.querySelector('.portable-infobox');
  const arcElement = infobox?.querySelector('div[data-source="arc"] div');
  return arcElement ? he.decode(arcElement.textContent.trim()) : '';
};

const getAirDates = (body) => {
    const root = parse(body);
    const infobox = root.querySelector('.portable-infobox');
    const airDates = {
      JapaneseAirDate: '',
      EnglishAirDate: ''
    };
  
    const japaneseAirDateElement = infobox?.querySelector('div[data-source="japanese airdate"] div');
    if (japaneseAirDateElement) {
      airDates.JapaneseAirDate = he.decode(japaneseAirDateElement.textContent.trim());
    }
  
    const englishAirDateElement = infobox?.querySelector('div[data-source="english airdate"] div');
    if (englishAirDateElement) {
      airDates.EnglishAirDate = he.decode(englishAirDateElement.textContent.trim());
    }
  
    return airDates;
  };

const getBehindTheScenes = (body) => {
  const root = parse(body);
  const behindTheScenesHeader = root.querySelector('h2 span#Behind_the_Scenes');
  if (behindTheScenesHeader) {
    let content = '';
    let currentElement = behindTheScenesHeader.parentNode.nextElementSibling;
    while (currentElement && currentElement.tagName !== 'H2') {
      content += currentElement.textContent + '\n';
      currentElement = currentElement.nextElementSibling;
    }
    return he.decode(content.trim());
  }
  return '';
};

const getEpisodeInfo = async (episodeName) => {
    let encodedName = encodeURIComponent(episodeName);
    const url = `https://naruto.fandom.com/wiki/${encodedName}`;
    
    try {
      const response = await fetch(url);
      const body = await response.text();
      
      const airDates = getAirDates(body);
      
      let episode = new Episode();
      episode.name = episodeName;
      episode.number = getEpisodeNumber(body);
      episode.synopsis = getSynopsis(body);
      episode.trivia = getTrivia(body);
      episode.BehindTheScenes = getBehindTheScenes(body);
      episode.arc = getArc(body);
      episode.JapaneseAirDate = airDates.JapaneseAirDate;
      episode.EnglishAirDate = airDates.EnglishAirDate;
      
      console.log(`Fetched episode info for ${episodeName}`);
      return episode;
    } catch (error) {
      console.error(`Error fetching episode info for ${episodeName}:`, error);
      return null;
    }
  };

// Usage example
// getEpisodeInfo("Crisis: The Konoha 11 Gather!").then(episode => console.log(episode));

export { getEpisodes, getEpisodeInfo}