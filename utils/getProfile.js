/* Called in /pages/updateaccount.js
  - it is used to fetch the logged in users username, about me and avatar url from the users Supabase row

  - then set the 'username', 'aboutMe' and 'avatar_url' states in 'updateaccount.js' 
*/

import { supabase } from "./supabaseClient"

export async function getProfile(setUsername, setAboutMe, setAvatar_url) {
   try {
     const user = supabase.auth.user()

     let { data, error, status } = await supabase
       .from('users')
       .select('username, aboutMe, avatar_url')
       .eq('id', user.id)
       .single()

     if (error && status !== 406) {
       throw error
     }

     if (data) {
      setUsername(data.username)
      setAboutMe(data.aboutMe)
      setAvatar_url(data.avatar_url)
       console.log(data);
     }
   }
   catch (error) {
     alert(error.message)
   }
 }