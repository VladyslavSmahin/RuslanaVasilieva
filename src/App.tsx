import { Routes, Route } from 'react-router-dom'
import { useData } from './hooks/useData'
import Layout from './components/Layout'
import Home from './pages/Home'
import PostsList from './pages/PostsList'
import PostPage from './pages/PostPage'
import GalleryPage from './pages/GalleryPage'

function App() {
  const { data, loading, error } = useData()

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
