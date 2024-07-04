import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../store/slices/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleSignOut = () => dispatch(signOut());
  return (
    <div className="flex items-center justify-between  ml-10 gap-6">
      <div className="flex items-center">
        <img
          src={user?.picture}
          alt="profile image"
          className="h-12 rounded-full border p-[2px]"
        />
        <div className="flex-1 ml-4">
          <h2 className="font-bold">{user?.name}</h2>
        </div>
      </div>
      <button
        className="font-semibold text-blue-400 text-sm"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}

export default Profile;
