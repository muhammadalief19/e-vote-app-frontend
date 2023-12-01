export default function FileInput({ handleFile }) {
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <>
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          className={`block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:disabled:opacity-50 file:disabled:pointer-events-none
          file:bg-sky-600 file:text-white hover:file:bg-sky-700`}
          onChange={handleChange}
        />
      </label>
    </>
  );
}
