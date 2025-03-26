import AboutHero from '@/app/components/about/AboutHero';
import { API_CONFIG, API_ENDPOINTS, APP_NAME } from '@/config/constants';

async function getData() {
  try {
    const res = await fetch(`${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.ABOUT_CONTENT}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
 
    if (!res.ok) {
      console.error('API Response not OK:', {
        status: res.status,
        statusText: res.statusText,
      });
      throw new Error(`HTTP error! status: ${res.status}`);
    }
 
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true, message: 'Failed to load data' };
  }
}

export default async function About() {
  const data = await getData();
  
  // Handle the error state gracefully
  if (data.error) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-textPrimary">About {APP_NAME}</h1>
        <p className="mt-4 text-textSecondary">Temporarily unable to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <AboutHero aboutData={data} />
    </div>
  );
}
