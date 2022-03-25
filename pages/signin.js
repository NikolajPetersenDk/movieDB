/* Sign-In page 
   Here users can sign in.
   When logged in users can favorite movies and see their account page

   - 'next/router' is used redirect users to the index page, when signed-in
*/

import Link from 'next/link'
import Router from 'next/router';
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'


function Signin() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [session, setSession] = useState(null);

   useEffect(() => {
     setSession(supabase.auth.session())
 
     supabase.auth.onAuthStateChange((_event, session) => {
       setSession(session)
     })
   }, [])

   const handleLogin = async (email, password) => {
      try {
         const { error } = await supabase.auth.signIn({ email, password})
         if(error) throw error
      }
      catch (error) {
         alert(error.error_description || error.message)
      }
   }

   if (session) {
      Router.push('/')
   }


  return (
   <div className="flex justify-center items-center w-auto h-4/5" >
      {/* Email, password and login btn container */}
      <div className="flex flex-col h-fit w-full sm:w-96 font-bold text-black bg-white rounded-2xl p-5 drop-shadow-lg">
         
         <h2 className="text-center">Sign in</h2>

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

            {/* Login button */}
               <button 
                  className="self-center  text-white leading-10 px-8 mt-5 "
                  onClick={(e) => {
                     e.preventDefault()
                     handleLogin(email, password)
                  }}
                  >
                  Login
               </button>
         </div>

         {/* Create new account button */}
         <Link href="/newaccount">
            <button className="self-center  text-white leading-10 px-8 mt-12">Create New Account</button>
         </Link>
      </div>
   </div>
  )
}

export default Signin