export default function Stat({ title, value, color }) {
  return (
    <>
      <div className="w-full aspect-video flex flex-col border shadow-xl rounded-md">
        <div className={`w-full py-5 ${color} px-5 text-white`}>
          <p className="capitalize font-bold">{title}</p>
        </div>
        <div className="w-full flex-1 flex flex-col justify-center gap-3 px-5 py-3">
          <p className="font-medium text-xl">Total</p>
          <p className="">{value}</p>
        </div>
      </div>
    </>
  );
}
