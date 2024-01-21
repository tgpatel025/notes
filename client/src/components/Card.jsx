function Card({ note }) {
  const { title, content } = note;
  return (
    <div className="group z-0 max-w-72 h-44 rounded hover:bg-gray-50 cursor-pointer p-1">
      <div className="border z-10 border-gray-200 rounded">
        <div className="text-gray-500 font-bold text-lg p-2 truncate border-b border-gray-200 rounded-t bg-gray-50 group-hover:text-yellow-500">
          {title}
        </div>
        <div className="text-black/80 group-hover:text-black text-sm m-2 text-balance ellipsis">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Card;
