import '../styles/globals.css'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import SignOut from '../components/SignOut'


function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session())
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
    if (session) getProfile()
  }, [session])


  async function getProfile() {
    try {
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setUsername(data.username)
        }
    }
    catch (error) {
      alert(error.message)
    }
  }


  return (
    <div className='min-h-screen'>
      <header className='flex justify-between my-12'>
        {/* Logo btn */}
        <Link href="/" >
          <a className='text-2xl font-bold'>
            Movie Database <span className='text-[#E87F4A]'>▲</span>
          </a>
        </Link>

        { 
        // If logged in, show account btn, else show Sign in btn
        session ? 
            // Username and user icon + menu
            <div className='group transition-all duration-300 ease-linear '>
              {/* Username and user icon - shown on all screens, except small screens */}
              <Link href="/account">
                <a className='hidden sm:inline'>
                  <p className='inline'>{username}</p>
                  <button className='p-3 ml-3'><FaUser/></button>
                </a>
              </Link>  

              {/* User icon - only shown on small screens */}
              <button className='h-fit p-3 ml-3 sm:hidden peer'><FaUser/></button>

              {/* User menu */}
              <ul className='absolute right-[10vw] w-[80%] sm:w-auto text-right p-2 z-10 bg-white text-black scale-0 group-hover:scale-100 peer-focus:scale-100 transition-all origin-top'>
                <li>
                  <Link href="/account">
                    <a>My Account</a>
                  </Link>
                </li>
                <li>
                  <Link href="/updateaccount">
                    <a>Update Account</a>
                  </Link>
                </li>
                <li onClick={SignOut}>
                  <Link href="/">
                    <a>Log Out</a>
                  </Link>
                </li>
              </ul>
            </div>
          :      
            //Sign in button
            <Link href="/signin">
              <a>
                <button className='font-bold leading-10 px-3 sm:px-8'
                >
                  Sign In
                </button>
              </a>
            </Link> 
        }
      </header>

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp