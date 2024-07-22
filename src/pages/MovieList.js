import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";
import { Card } from "../components";
import { Breadcrumb } from "../components";


export const MovieList = ({apiPath, title}) => {
  const { data: movies } = useFetch(apiPath);

  useTitle(title);

  return (
    <main>
        <Breadcrumb title={title}/>
      <section className="max-w-7xl mx-auto py-2">
        <div className="flex justify-start flex-wrap other:justify-evenly">       
          { movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          )) }          
        </div>
      </section>
    </main>
  )
}