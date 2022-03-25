/* Update account page
   Here the user can update their username, avatar and about me.
   - This data is fetched from and upserted in supabase.
   - The avatar file is saved in the db bucket and the path is saved in the 'avatar_url' column
*/

import { useEffect, useState } from "react"
import { getProfile } from "../utils/getProfile";
import { supabase } from "../utils/supabaseClient"

function Updateaccount() {
   const [username, setUsername] = useState(null);
   const [aboutMe, setAboutMe] = useState('');
   const [avatar_url, setAvatar_url] = useState(null);
   const [uploading, setUploading] = useState(false);

   useEffect(() => {
      getProfile(setUsername, setAboutMe, setAvatar_url)
   },[])

   async function update({ username, aboutMe, avatar_url }){
      try {
         const user = supabase.auth.user()

         const updates = {
            id: user.id,
            username,
            aboutMe,
            avatar_url
         }

         let { error } = await supabase
            .from('users')
            .upsert(updates, {
               returning: 'minimal'
            })

         if (error) {
            throw error
         }

         alert('Account has been updated!')
      }
      catch (error) {
         alert(error.message)
      }
   }

   async function uploadAvatar(e) {
      try {
         setUploading(true)

         if (!e.target.files || e.target.files.length === 0) {
            throw new Error('Please select an image to upload')
         }

         const file = e.target.files[0]
         const fileExt = file.name.split('.').pop()
         const fileName = `${Math.random()}.${fileExt}` // Ext = extension
         const filePath = `${fileName}`

         let { error: uploadError } = await supabase.storage  
            .from('avatars')
            .upload(filePath, file)


         if (uploadError) {
            throw uploadError
         }

         setAvatar_url(filePath)
      }
      catch (error) {
         alert(error.message)
      }
      finally {
         setUploading(false)
      }

   }
   console.log(avatar_url);

  return (
   <div className="flex justify-center items-center w-auto h-4/5" >
      <div className="flex flex-col h-fit w-full sm:w-96 font-bold text-black bg-white rounded-2xl p-5 drop-shadow-lg">
         <h2 className="text-center">Update account</h2>

         {/* Username, upload avatar, about me and update button container */}
         <div className="flex flex-col mt-10">

            {/* Username */}
            <label className="self-center" htmlFor="username">Username</label>
            <input 
               className="self-center" 
               id="username" 
               type="text" 
               value={username || ''}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="Enter Username..." 
            />

            {/* Upload avatar */}
            <label className="self-center mt-10" htmlFor="avatar">Avatar</label>
            <input 
               className="bg-white cursor-pointer p-0 file:p-2 w-[90%] self-center file:primary file:border-0 file:text-white file:font-sans file:pl-2"
               id="avatar"
               type="file" 
               accept="image/*"
               onChange={uploadAvatar}
               disabled={uploading}
            />

            {/* About Me */}
            <label className="self-center mt-10" htmlFor="aboutME">About Me</label>
            <textarea 
               className="self-center w-2/3 drop-shadow-lg p-5 rounded-3xl resize-none" 
               id="aboutMe" 
               rows="3" 
               value={aboutMe}
               onChange={(e) => setAboutMe(e.target.value)}
               placeholder="Enter something about yourself...">
            </textarea>

            {/* Update Button */}
            <button 
               className="self-center  text-white leading-10 px-8 mt-5"
               onClick={() => update({username, aboutMe, avatar_url})}
            >
               Update
            </button>
         </div>
      </div>
   </div>
  )
}

export default Updateaccount