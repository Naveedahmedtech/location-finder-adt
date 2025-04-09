'use client'

import { useEffect, useState } from 'react'
import AboutHero from '@/app/components/about/AboutHero'
import { API_CONFIG, API_ENDPOINTS, APP_NAME } from '@/config/constants'

const About = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
            `${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.ABOUT_CONTENT}`,
            {
              cache: 'no-store',
              headers: {
                'Content-Type': 'application/json',
              },
            }
        )

        if (!res.ok) {
          console.error('API Response not OK:', {
            status: res.status,
            statusText: res.statusText,
          })
          setError(true)
        } else {
          const json = await res.json()
          setData(json)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-textPrimary">Loading {APP_NAME}...</h1>
        </div>
    )
  }

  if (error || !data) {
    return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-textPrimary">About {APP_NAME}</h1>
          <p className="mt-4 text-textSecondary">
            Temporarily unable to load content. Please try again later.
          </p>
        </div>
    )
  }

  return (
      <div>
        <AboutHero aboutData={data} />
      </div>
  )
}

export default About
