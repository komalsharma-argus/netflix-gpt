const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[28%] md:pt-[20%] px-4 md:px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{title}</h1>
        <p className="hidden md:block py-6 text-lg w-3/4 lg:w-1/2">{overview}</p>
        <div className="mt-2 md:mt-0 flex gap-2">
        <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-base md:text-xl rounded-lg hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle