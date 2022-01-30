import Link from "next/link";
import Seo from "../components/Seo";
import { useRouter } from "next/router";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
    // router.push(
    //   {
    //     pathname: `/movies/${id}`,
    //     query: {
    //       id,
    //       title,
    //     },
    //   },
    //   `/movies/${id}`
    // );
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.title)}
          className="movie"
          key={movie.id}
        >
          <img src={`${BASE_IMG_URL}/${movie.poster_path}`} />
          <h4>
            <Link
              href={{
                pathname: `/movies/${movie.title}/${movie.id}`,
                query: {
                  title: movie.title,
                },
              }}
              as={`/movies/${movie.id}`}
            >
              <a>{movie.title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
          text-align: center;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
