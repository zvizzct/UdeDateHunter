import { parseISO, format } from 'date-fns';

/**
 * Fetch course ID and last update date from a Udemy course URL
 * @param {string} url - Udemy course URL
 * @return {Promise<Object>} An object containing the course ID and last update date
 */
const getCourseIdAndLastDate = async (url) => {
  const fetchUrl = `https://api.scraperapi.com?api_key=${
    import.meta.env.VITE_SCRAPER_API_KEY
  }&url=${url}`;
  const res = await fetch(fetchUrl);
  const text = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  const courseId = doc.querySelector('body').dataset.clpCourseId;
  const lastUpdateElement = doc.querySelector('.last-update-date > span');
  const lastUpdateText =
    lastUpdateElement.textContent || lastUpdateElement.innerText;
  const lastDate = lastUpdateText.split(' ')[2];

  return { courseId, lastDate };
};

/**
 * Fetch the creation and last update date for a Udemy course
 * @param {string} url - Udemy course URL
 * @return {Promise<Object>} An object containing the creation and last update date
 */
export const getTime = async (url) => {
  const { courseId, lastDate } = await getCourseIdAndLastDate(url);
  const fetchUrl = `https://api.scraperapi.com?api_key=${
    import.meta.env.VITE_SCRAPER_API_KEY
  }&url=https://www.udemy.com/api-2.0/courses/${courseId}/?fields[course]=created`;
  const res = await fetch(fetchUrl);
  const data = await res.json();
  const { created } = data;

  // Parse and format the created date
  const createdDate = parseISO(created);
  const formattedCreatedDate = format(createdDate, 'MM/yyyy');

  // Parse and format the last update date
  const lastUpdateDate = new Date(`01/${lastDate}`);
  const formattedLastUpdateDate = format(lastUpdateDate, 'MM/yyyy');

  return { created: formattedCreatedDate, lastDate: formattedLastUpdateDate };
};
