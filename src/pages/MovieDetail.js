import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { Breadcrumb } from "../components";
import Backup from "../assets/images/backup.png"

export const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
   //eslint-disable-next-line
  const [movieVideos, setMovieVideos] = useState(null);
  const [videoKey, setVideoKey] = useState('');
  const [showModal, setShowModal] = useState(true);
    
  //eslint-disable-next-line
  const pageTitle = useTitle(movie.title);

  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : Backup ;

  useEffect(() => {
    async function fetchMovie(){
      const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=b80d59c33d6d57ed9c7e3713f91c188a`);
      const json = await response.json()
      setMovie(json);
    }
    fetchMovie();
  }, [params.id]);

  useEffect(() => {
    async function fetchMovieVideos(){
      const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=b80d59c33d6d57ed9c7e3713f91c188a`);
      const videodata = await response.json();
      const officialTrailer = videodata.results.find(video => video.name === "Official Trailer" );
      setMovieVideos(videodata);
      console.log(videodata);
     
      if (videodata.results && videodata.results.length > 0) {
        const key = officialTrailer ? officialTrailer.key : null;
        setVideoKey(key);
        //setVideoType(videodata.results.type);
      }  
    }

    fetchMovieVideos();
  }, [params.id]);


  const handleModal = () => {
    document.documentElement.classList.add('overflow-y-hidden'); // remove scroll on modal open
    setShowModal(!showModal);
  }

  const handleClose = () => {
    const videoElement = document.querySelector("#videoSource");
    if (videoElement && videoElement.tagName === 'IFRAME') {
        const vidURL = videoElement.src;
        videoElement.src = '';  // Clear the src to stop the video
        videoElement.src = vidURL;  // Reset the src to allow it to play again next time
    }
    setShowModal(!showModal);

    document.documentElement.classList.remove('overflow-y-hidden'); // reset scroll on modal close
  };

  return (
    <main>
      <Breadcrumb movieTitle={movie.title}/>
      <section className="flex justify-around flex-wrap py-5">
        <div className="max-w-sm">
          <img className="rounded" src={image} alt={movie.title} />
        </div>
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">{movie.title}</h1>
          <p className="my-4">{movie.overview}</p>
            { movie.genres ? (
              <p className="my-7 flex flex-wrap gap-2">
              { movie.genres.map((genre) => (
                <span className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" key={genre.id}>{genre.name}</span>
              )) }
            </p>
            ) : "" }
          
          <div className="flex items-center">
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <p className="ml-2 text-gray-900 dark:text-white">{movie.vote_average}</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <span className="text-gray-900 dark:text-white">{movie.vote_count} reviews</span>
          </div>

          <p className="my-4">
            <span className="mr-2 font-bold">Runtime:</span>
            <span>{movie.runtime} min.</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Budget:</span>
            <span>{movie.budget}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Revenue:</span>
            <span>{movie.revenue}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Release Date:</span>
            <span>{movie.release_date}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">IMDB Code:</span>
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer">{movie.imdb_id}</a>
          </p>
          
          <div className={`modalWrapper fixed z-20 top-0 inset-x-0 bottom-0 flex flex-row justify-center content-center flex-wrap ${showModal ? "hidden" : ""}`}>
          
            <div className="videoModal h-2/3  w-3/6 p-4 bg-white rounded-md">
              <div className="closeBtn absolute right-80 top-16 cursor-pointer" onClick={handleClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                  </svg>
              </div>
                <iframe className="h-full w-full" id="videoSource" src={`https://www.youtube.com/embed/${videoKey}`} title="YouTube video player" allowFullScreen  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>
            </div>
            
          </div>
          <div className={`backdrop absolute h-full w-full top-0 left-0 z-10 bg-black opacity-50 ${showModal ? "hidden" : ""}`}></div>

          <div>
            {videoKey && <button  onClick={handleModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Watch Trailer</button>}
            
          
          </div>

        </div>
      </section>
    </main>
  )
}