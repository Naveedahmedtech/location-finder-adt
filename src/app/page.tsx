import Hero from '@/app/components/home/Hero'
import { API_CONFIG, API_ENDPOINTS, APP_NAME } from '@/config/constants';




export default async function Home() {


  return (
    <div>
      <Hero 
        title={`Welcome To ${APP_NAME}`}
        subtitle="Enter the origin and destination to know the details about your trip."
      />
    </div>
  );
}
