const COLORS = [
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-rose-500",
];

const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";

// Naam se hamesha same color aayega (random nahi, consistent hai)
const getColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

// Usage: <Avatar name={user.name} src={user.avatar} size="w-9 h-9" />
const Avatar = ({ name, src, size = "w-9 h-9" }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        className={`${size} rounded-full object-cover shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-full ${getColor(
        name
      )} text-white font-semibold flex items-center justify-center text-sm shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;