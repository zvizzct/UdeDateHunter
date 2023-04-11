import { parseISO, format } from 'date-fns';

/**
 * Check if a given URL is a valid Udemy course URL
 * @param {string} url - The URL to be validated
 * @return {boolean} - Returns true if the URL is valid, false otherwise
 */
const isValidUrl = (url) => {
  const urlRegex = /^https:\/\/www\.udemy\.com\/course\/[\w-]+\/$/;
  return urlRegex.test(url);
};

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
  if (!isValidUrl(url)) {
    return {
      error: `Invalid URL. Please enter a valid Udemy course URL.\n Example: https://www.udemy.com/course/COURSE_NAME/`,
    };
  }
  try {
    const { courseId, lastDate } = await getCourseIdAndLastDate(url);
    const fetchUrlDate = `https://api.scraperapi.com?api_key=${
      import.meta.env.VITE_SCRAPER_API_KEY
    }&url=https://www.udemy.com/api-2.0/courses/${courseId}/?fields[course]=created`;
    const resDate = await fetch(fetchUrlDate);
    const dataDate = await resDate.json();
    const { created } = dataDate;

    const fetchUrl = `https://api.scraperapi.com?api_key=${
      import.meta.env.VITE_SCRAPER_API_KEY
    }&url=https://www.udemy.com/api-2.0/courses/${courseId}`;
    const res = await fetch(fetchUrl);
    const data = await res.json();
    const { title, image_480x270 } = data;

    // Parse and format the created date
    const createdDate = parseISO(created);
    const formattedCreatedDate = format(createdDate, 'MM/yyyy');

    // Parse and format the last update date
    const lastUpdateDate = new Date(`01/${lastDate}`);
    const formattedLastUpdateDate = format(lastUpdateDate, 'MM/yyyy');

    return {
      title,
      image: image_480x270,
      createdDate: formattedCreatedDate,
      lastDate: formattedLastUpdateDate,
    };
  } catch (error) {
    console.error('Error fetching course data:', error);
    return {
      error:
        'Failed to fetch course data. Please try again later or change url. Example: https://www.udemy.com/course/COURSE_NAME/',
    };
  }
};
