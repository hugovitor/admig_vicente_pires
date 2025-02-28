// components/team-card.tsx
import { cn } from "@/cosmic/utils";

export type MemberType = {
  title: string;
  slug: string;
  metadata: {
    image: {
      imgix_url: string;
    };
    position: string;
    bio: string;
    links: {
      instagram: string;
    };
  };
};
export function TeamCard({
  member,
  className,
}: {
  member: MemberType;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-lg border  border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 md:flex-row",
        className
      )}
    >
      <div className="md:w-2/5">
        <img
          className="h-full w-full object-cover object-center"
          src={`${member.metadata.image.imgix_url}?w=600&h=600&auto=format,compression&fit=crop&crop=faces}`}
          alt={member.title}
        />
      </div>
      <div className="w-full space-y-2 p-4 text-left md:w-3/5">
        <p className="text-xl font-bold text-zinc-700 dark:text-zinc-100">
          {member.title}
        </p>
        <p className="font-normal text-zinc-700 dark:text-zinc-100">
          {member.metadata.position}
        </p>
        <p className="text-sm font-normal leading-relaxed text-zinc-700 dark:text-gray-300">
          {member.metadata.bio}
        </p>
        <div className="flex justify-start space-x-4 py-4">
          {member.metadata.links.instagram && (
            <a
              href={member.metadata.links.instagram}
              className="text-gray-500 hover:text-gray-600"
            >
              {/* Icone  instagram  */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 50 50"
              >
                <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
