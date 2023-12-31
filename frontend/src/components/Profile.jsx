import profile from "../assets/images/profile.jpg";

export const Profile = () => {
  return (
    <>
      <img
        src={profile}
        alt="Profile Picture"
        className="w-28 h-28 rounded-full border-4 border-solid border-gray-200"
      />
    </>
  );
};
