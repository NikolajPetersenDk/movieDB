/* New account page 
   This is where a user can create a new account in the supabase db 

   - 'next/router' is used to redirect the user to '/pages/updateaccount.js', in case the user wants to add username, an avatar or an about me section
*/

import { useState } from "react"
import { supabase } from "../utils/supabaseClient"
import Router from 'next/router';

function Newaccount() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSignUp = async (email, password) => {
      try {
         let { error } = await supabase.auth.signUp({ email, password })
         if (error) throw error

         Router.push('/updateaccount')

         alert('Check your email to confirm your new account!')
      }
      catch (error) {
         alert(error.error_description || error.message)
      }
   }

  return (
   <div className="flex justify-center items-center w-auto h-4/5" >
      <div className="flex flex-col h-fit w-full sm:w-96 font-bold text-black bg-white rounded-2xl p-5 pb-20 drop-shadow-lg">
         <h2 className="text-center">Create new account</h2>

         {/* Email, password and btn container */}
         <div className="flex flex-col mt-10">
            {/* Email input */}
            <label className="self-center" htmlFor="email">Email</label>
            <input 
               className="self-center" 
               type="email" 
               name="email" 
               id="email" 
               placeholder="Enter Email..." 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password input */}
            <label className="self-center mt-10" htmlFor="password">Password</label>
            <input 
               className="self-center" 
               type="password" 
               name="password" 
               id="password" 
               placeholder="Enter Password..." 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />

            {/* Create account btn */}
            <button 
               className="self-center text-white leading-10 px-8 mt-5"
               onClick={(e) => {
                  e.preventDefault()
                  handleSignUp(email, password)
               }}
            >
               Create New Account
            </button>
         </div>
      </div>
   </div>
  )
}

export default Newaccount
