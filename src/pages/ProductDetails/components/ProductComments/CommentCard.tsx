import type { Comment } from "./CommentsData";

interface CommentCardProps {
  user: Comment;
}

function CommentCard({ user }: CommentCardProps) {
  return (
    <div className="bg-[#F7F7F7] my-3 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z"
                fill={i < user.starCount ? "#FDD835" : "#E0E0E0"}
              />
            </svg>
          ))}
        </div>
        <div className="font-semibold text-gray-800">{user.name}</div>
        <div className="ml-auto text-gray-500 text-sm">{user.date}</div>
      </div>
      <div>
        <div className="font-bold text-lg mb-2 text-gray-900">{user.title}</div>
        <div className="text-gray-700 leading-relaxed">{user.content}</div>
      </div>
    </div>
  );
}

export default CommentCard
