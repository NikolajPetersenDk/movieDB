/* Account page
  Here the current logged-in user's username, avatar, about me and favorite movies are shown
*/

import { useState, useEffect } from "react"
import Avatar from "../components/Avatar";
import { getMovieInfo } from "../utils/getMovieInfo";
import { supabase } from "../utils/supabaseClient"
import Link from 'next/link'


function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [aboutMe, setAboutMe] = useState(null);
  const [avatar_url, setAvatar_url] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('users')
        .select('username, aboutMe, avatar_url, favoriteMovies')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAboutMe(data.aboutMe)
        setAvatar_url(data.avatar_url)
        setFavoriteMovies(data.favoriteMovies)
        getMovieInfo(data.favoriteMovies, setFavoriteMovies)
      }
    }
    catch (error) {
      alert(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>


  return (
    <div className="bg-[rgba(0,0,0,.1)] p-6 rounded-3xl mt-11 drop-shadow-lg">
      {/* Username */}
      <h1 className="mb-5">{username || ''}</h1>

      <div className="sm:flex sm:justify-between">
        {/* User picture */}
        <Avatar url={avatar_url} />

        {/* About Me and Fav movie container */}
        <div className="sm:w-1/2">
          <h3>About Me</h3>
          <p>{aboutMe}</p>

          <br />

          <h3>Favorite Movies</h3>
          <ul className="list-disc list-inside">
            {favoriteMovies && 
              favoriteMovies.map((movie, index) => { 
                return(
                <li key={ index }>
                  <Link href={`/movies/${movie[1]}`}>
                    <a>{movie[0]}</a>
                  </Link>
                </li>
              )})
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Account