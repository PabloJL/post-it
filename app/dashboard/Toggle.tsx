"use client";

type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div
      onClick={() => {
        setToggle(false);
      }}
      className=" fixed bg-black/20 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className=" text-xl">
          Are you sure you want to delete this post?🤔
        </h2>
        <h3 className="text-red-600 text-sm">
          Pressing the delete button will permenantly delete your post
        </h3>
        <div className=" flex flex-col justify-between items-center md:flex-row">
          <button
            onClick={() => setToggle(false)}
            className="bg-gray-400 text-sm text-white py-2 px-4 mb-3 md:mb-0 rounded-md md:w-2/5 w-1/2"
          >
            Cancel
          </button>
          <button
            onClick={deletePost}
            className="bg-red-700 text-sm text-white py-2 px-4 rounded-md md:w-2/5 w-1/2"
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toggle;
