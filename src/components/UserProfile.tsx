import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { UserProps } from "@/utils/interfaces";

interface UserProfileProps {
  userData: UserProps;
  handleLogout: () => void;
}

const UserProfile = ({ userData, handleLogout }: UserProfileProps) => {
  return (
    <div className="p-4 mt-auto">
      <div className="flex flex-col border-t-[1px] border-b-[1px]">
        <div className="flex items-center gap-3 text-white mt-[6px]">
          <span className="text-3xl">
            <IoPersonCircleOutline />
          </span>
          <div className="flex flex-col">
            <p className="text-lg font-medium text-white">
              {userData.username.charAt(0).toUpperCase() +
                userData.username.slice(1)}
            </p>

            <p className="text-sm mb-2 text-neutral40">{userData.role}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={handleLogout}
          className="mt-4 w-full py-2 bg-white text-black rounded-full hover:bg-primary40 hover:text-white transition-all flex items-center justify-center px-4"
        >
          Keluar
          <HiOutlineLogout className="ml-2 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
