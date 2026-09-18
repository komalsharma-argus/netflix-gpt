import { useState } from "react";
import Header from "./Header";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img 
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="logo"
                />
            </div>
            <form className="w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-2xl py-4 text-center">
                    {isSignInForm? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input 
                    type="text"
                    placeholder="Name"
                    className="p-2 my-4 w-full bg-gray-700" />
                )}
                <input 
                type="text"
                placeholder="Email"
                className="p-2 my-4 w-full bg-gray-700"
                />
                <input 
                type="password"
                placeholder="Password"
                className="p-2 my-4 w-full bg-gray-700"
                />
                <button onClick={(e) => e.preventDefault()} className="p-2 my-6 bg-red-700 w-full rounded-lg">
                    {isSignInForm? "SignIn" : "SignUp"}
                </button>
                <p className="p-2 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm? "New to Netflix? Sign Up Now." : "Already Registered? Sign In Now."}
                </p>
            </form>
        </div>
    )
}

export default Login;