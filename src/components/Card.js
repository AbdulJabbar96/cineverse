import { Link } from "react-router-dom"
import BackupImg from "../assets/images/backup.png";


export const Card = ({ movie }) => {

    const {id, original_title, poster_path} = movie;
    const movImg = BackupImg ? `https://image.tmdb.org/t/p/w500/${poster_path}` : BackupImg;

  return (
    
    <div className="ms-card max-w-72 m-3 ">
    <div className="group relative">
    <Link to={`/movie/${id}`} >
        <div className="showHover absolute w-full h-full flex flex-row items-center justify-center">
          <div className="overlay invisible rounded-md absolute h-full w-full top-0 right-0 bg-[rgba(0,0,0,0.7)] z-10 transition-all ease-in duration-500 opacity-0 group-hover:visible group-hover:opacity-100"></div>
          <div className="hoverIcon flex flex-col items-center justify-center invisible relative z-20 transition-all ease-in duration-500 opacity-0  group-hover:visible group-hover:opacity-100 group-hover:scale-[1.4]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" className="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg>
          </div>
        
        </div>
        <img className="rounded-md " src={movImg} alt={original_title} />
    </Link>
    </div>
    
    <div className="p-2 text-center">
        <Link to={`/movie/${id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {original_title}
            </h5>
        </Link>
        {//<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{(overview).substring(0,100)}.... <Link className="underline b" to={`/movie/${id}`}>Read More</Link></p>
        }
   
    </div>
</div>
  )
}
