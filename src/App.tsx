import { useState, useCallback, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useData } from './hooks/useData'
import Layout from './components/Layout'
import SplashCover from './components/SplashCover'
import Home from './pages/Home'
import PostsList from './pages/PostsList'
import PostPage from './pages/PostPage'
import GalleryPage from './pages/GalleryPage'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const { data, loading, error } = useData()
  const handleSplashComplete = useCallback(() => setShowSplash(false), [])

  useEffect(() => {
    if (showSplash) {
      document.body.style.backgroundColor = '#000'
    } else {
      document.body.style.backgroundColor = ''
    }
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [showSplash])

  if (showSplash) {
    return <SplashCover onComplete={handleSplashComplete} />
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        <p>Загрузка…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        <p>Не удалось загрузить контент. Проверьте файл public/data/content.json</p>
      </div>
    )
  }

  return (
    <Layout data={data}>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/posts" element={<PostsList data={data} />} />
        <Route path="/posts/:slug" element={<PostPage data={data} />} />
        <Route path="/gallery" element={<GalleryPage data={data} />} />
      </Routes>
    </Layout>
  )
}

export default App
