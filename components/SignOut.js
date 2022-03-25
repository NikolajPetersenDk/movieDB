import { supabase } from "../utils/supabaseClient"

async function SignOut() {
  await supabase.auth.signOut()
}

export default SignOut