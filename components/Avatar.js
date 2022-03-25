/* Called in /pages/account.js 
   - Downloads the current user's avatar from supabase storage
   - Creates an 'img' element 

   The url of the avatar is set as 'url' prop when the 'Avatar' component is called
*/

import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient"

function Avatar({ url }) {
   const [avatarUrl, setAvatarUrl] = useState(null);

   useEffect(() => {
      if (url) downloadImage(url)
   }, [url])
   
   async function downloadImage(path) {
      try {
         const { data, error } = await supabase.storage.from('avatars').download(path)

         if (error) {
            throw error
         }

         const url = URL.createObjectURL(data)
         setAvatarUrl(url)
      }
      catch (error) {
         console.log('Error downloading image: ', error.message);
      }
   }

  return (
    <div>
       {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt="Avatar" 
            className="w-60 h-60 rounded-full object-cover"
         />
       ) : (
          <p>no image</p>
       )}
    </div>
  )
}

export default Avatar