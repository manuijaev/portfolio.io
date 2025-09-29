export default function Projects() {
  // Example projects data (you can expand this)
  const projects = [
    {
      id: 1,
      title: "House Hunter Platform",
      image: "/projects/house.png", // put image in public/projects/
      description:
        "A web app connecting tenants and landlords, allowing landlords to post houses with specifications and tenants to view listings and comment.",
      link: "https://house-hunter-six.vercel.app"
    },
    {
      id: 2,
      title: "Bill Splitter App",
      image: "/projects/bill.png",
      description:
        "A budget tracker web app that records income and expenses, supports filtering and deletion, and persists data with cookies.",
      link: "https://manuijaev.github.io/bill-splliter/",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          My Projects
        </h2>

        {/* Grid layout */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 flex-grow">
                  {project.description}
                </p>

                {/* Visit site button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Site
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

