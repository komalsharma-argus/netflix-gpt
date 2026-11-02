import { useSelector } from "react-redux";
import gemini from "../utils/openai";
import { useRef } from "react";
import { useDispatch} from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { GEMINI_MODEL } from "../utils/constants";
import { generateWithFallback } from "../utils/geminiHelper";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results || [];
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value;
    console.log("1. Query:", query);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      query +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try{
      const text = await generateWithFallback(gptQuery);
      if (!text) return;

      const gptMovies = text
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      const tmdbResults = await Promise.all(
        gptMovies.map((movie) => searchMovieTMDB(movie))
      );

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (err) {
      console.error("Gemini Request failed:", err);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form 
        className=" w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button 
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;