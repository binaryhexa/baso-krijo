import Profile from "../assets/images/Profile.png";

const UserProfile = () => {
  return (
    <div className="flex gap-3 px-4">
      <img src={Profile} alt="Profile Pict" className="h-[50px] w-[50px]" />
      <div className="flex flex-col text-sm pt-1">
        <p className="font-semibold">Al</p>
        <p>Admin</p>
      </div>
    </div>
  );
};

export default UserProfile;
