export default function FileInput2({ title, handleFile }) {
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    handleFile(fileUploaded);
  };
  return (
    <>
      <div class="flex items-center justify-center w-full">
        <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
          <div class="h-full w-full text-center flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 text-blue-400 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p class="pointer-none text-gray-500 ">
              <p id="" class="text-blue-600 hover:underline">
                {title}
              </p>
            </p>
          </div>
          <input type="file" class="hidden" onChange={handleChange} />
        </label>
      </div>
    </>
  );
}
