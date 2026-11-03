import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import {toggleGptSearchView} from "../utils/gptSlice";
import {changeLanguage} from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate("/error");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else{
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col sm:flex-row justify-between items-center">
        <img 
            className="w-32 md:w-44 mx-auto sm:mx-0"
            src="Netflix_LOGO.png"
            alt="logo"
        />
        {user && (
          <div className="flex p-2 items-center gap-2">
            {showGptSearch && (
              <select 
              className="p-1 md:p-2 m-1 md:m-2 text-sm md:text-base bg-gray-900 text-white" 
              onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button 
            className="py-1 px-3 md:py-2 md:px-4 text-sm md:text-base bg-purple-800 text-white rounded-lg" 
            onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <img className="w-7 md:w-10 h-7 md:h-10 my-2 rounded-md" alt="usericon" src={user?.photoURL}/>
            <button onClick={handleSignOut} className="py-1 px-3 md:py-2 md:px-2 font-bold text-sm md:text-base text-white rounded-lg">
              (Sign Out)
            </button>
          </div>
        )}
    </div>
  )
}

export default Header;