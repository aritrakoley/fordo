import { useState } from 'react'
import RecipeList from './components/RecipeList'

function App() {
  // console.log(process.env.API_BASE_URL, process.env.API_PORT)
  console.log(import.meta.env.VITE_API_BASEURL, import.meta.env.VITE_API_PORT)
  return (
    <>
      <RecipeList />
    </>
  )
}

export default App
