interface SearchResultCardProps {
  title: string;
  content: string;
}

export default function SearchResultCard({ title, content }: SearchResultCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-700 mb-2">{title}</h2>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  );
}
