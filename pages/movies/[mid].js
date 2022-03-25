/* This is the movie page.
   Here movie data is fetched from TMDB API and shown.
   The page is dynamic and uses 'next/router' to get the movie id (mid) from the url
*/

import Head from "next/head";
import { useRouter } from 'next/router'
import { useEffect,useState } from "react";
import FavBtn from "../../components/FavBtn";

function Movieinfo() {
   const router = useRouter()

   const [movieInfo, setMovieInfo] = useState('');
   const [credits, setCredits] = useState([]);
   const [loading, setLoading] = useState(true);
   const [movieId, setMovieId] = useState(null);

   useEffect(() => {
      if (router.isReady) {
         const { mid } = router.query
         console.log(mid);
      
         fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=2e28a26a70c14a7b5e9a16e05864446a&language=en-US`)
         .then((res) => res.json())
         .then((data) => {
            setMovieInfo(data)
            console.log(data);
         })
         
         fetch(`https://api.themoviedb.org/3/movie/${mid}/credits?api_key=2e28a26a70c14a7b5e9a16e05864446a&language=en-US`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setCredits(data.cast.slice(0,5))
            setLoading(false)
         })

         setMovieId(mid)
      }
   }, [router.isReady])

   if (loading) return <p>Loading...</p>
   if (!credits) return <p>No data</p> 


  return (
   <div className="bg-[rgba(0,0,0,.1)] p-6 rounded-3xl mt-11 mb-11 drop-shadow-lg">
      <Head>
         <title>{movieInfo.title}</title>
      </Head>

      {/* Header */}
      <div className="md:flex md:justify-between mb-5">
         <h1>{ movieInfo.title }</h1>

         {/* Release date and running time */}
         <span className="flex">
            <p>{movieInfo.release_date}</p>
            <p className="ml-10">{`${Math.floor(movieInfo.runtime / 60)}h ${movieInfo.runtime % 60}m`}</p>
         </span>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row md:justify-between md:columns-3 gap-5">
         {/* Poster */}
         <img src={`https://www.themoviedb.org/t/p/w500${movieInfo.poster_path}`} className="w-60 h-full" />

         {/* Favorite button */}
         <FavBtn movieId={movieId} />

         {/* Resume */}
         <div className="md:w-1/2">
            <h3>Resume</h3>
            <p>{ movieInfo.overview }</p>

            <br />

            {/* Actor list */}
            <h3>Actors</h3>
            <ul className="list-disc list-inside">
               {credits.map((actor) => {return (
                  <a 
                     href={`https://www.themoviedb.org/person/${actor.id}`} 
                     key={actor.id}
                  >
                     <li>{actor.name}</li>
                  </a>
               )})}
            </ul>
         </div>

         {/* Rating */}
         <div className="md:flex sm:flex-col">
            <h3>TMDB Score:</h3>
            <p className="text-5xl self-end">{`${movieInfo.vote_average * 10}%`}</p>
         </div>
      </div>
   </div>
  )
}


export default Movieinfo