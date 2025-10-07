import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types";
import { posterUrl, formatDate } from "@/lib/tmdb";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton";

export default function MovieCard({ movie }: { movie: Movie }) {
  const title = movie.title || movie.name || "Untitled";
  const poster = posterUrl(movie.poster_path, "w342");

  return (
    <Link href={`/movies/${movie.id}`} className="g-border surface spot float block overflow-hidden">
    <div className="absolute right-2 top-2 z-[2]">
      <FavoriteButton id={movie.id} size={34} />
    </div>
      <div className="relative aspect-[2/3]">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width:768px)50vw,(max-width:1200px)25vw,20vw"
            className="object-cover"
          />
        ) : <div className="h-full w-full skel" />}
        <div className="absolute inset-x-0 bottom-0 h-20"
             style={{background:"linear-gradient(to top, rgba(0,0,0,.45), transparent)"}} />
      </div>

      <div className="p-3">
        <h3 className="truncate text-[15px] font-semibold">{title}</h3>
        <div className="mt-1 flex items-center justify-between text-xs" style={{color:"var(--muted)"}}>
          <span>{formatDate(movie.release_date || movie.first_air_date)}</span>
          <RatingStars rating={movie.vote_average ?? 0}/>
        </div>
      </div>
    </Link>
  );
}