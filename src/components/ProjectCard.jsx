export default function ProjectCard({ title, description }) {
  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-700">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  );
}
