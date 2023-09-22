
import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";

const Auth = () => {
  return (
    <div 
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-[#2a2a2a]
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="58"
          width="58"
          className="mx-auto w-auto"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2 
          className="
            mt-6 
            text-center 
            text-xl 
            font-bold 
            tracking-tight
            text-white
          "
          >
            Sign in to your account
        </h2>
      </div>  
      <AuthForm />  
  </div>
  )
}

export default Auth;