/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
export function CardsComponent() {
  const cards = [
    {
      imgSrc: 'https://i.imgur.com/oZ3cDa1.jpg',
      imgAlt: 'Personal Website',
      title: 'Personal Website',
      description:
        'My personal website, I created this website to display my profile, skills and projects. As well as my place to try new technology.',
      technologies: 'Next.js, TailwindCSS',
      githubUrl: 'https://github.com/MauricioKrziminski/my-personal-website',
      projectUrl: '#',
    },
    {
      title: 'Card 2',
      description:
        "This is a placeholder card. It's a brief description of the card content.",
    },
    {
      title: 'Card 3',
      description:
        "This is a placeholder card. It's a brief description of the card content.",
    },
    {
      title: 'Card 4',
      description:
        "This is a placeholder card. It's a brief description of the card content.",
    },
    {
      title: 'Card 5',
      description:
        "This is a placeholder card. It's a brief description of the card content.",
    },
    {
      title: 'Card 6',
      description:
        "This is a placeholder card. It's a brief description of the card content.",
    },
  ]

  return (
    <div className="grid h-full cursor-default grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className="card-hover-effect flex flex-col items-center gap-2 rounded-xl border border-[#383838] bg-[#1e1e1f] px-5 py-5 text-white hover:bg-[#282828] md:gap-3 lg:px-5"
        >
          {card.imgSrc && (
            <div className="flex h-full w-full items-center justify-center p-0 lg:p-0">
              <img
                src={card.imgSrc}
                alt={card.imgAlt}
                decoding="async"
                data-ning="1"
                loading="lazy"
                className="rounded-xl drop-shadow-xl"
              />
            </div>
          )}
          <div className="flex w-full flex-col items-center gap-2 text-sm md:text-base lg:text-lg">
            <div className="font-medium">{card.title}</div>
            <div className="w-full text-left text-[10px] text-[#c1c1c1] md:text-xs lg:text-sm">
              {card.description}
            </div>
            {card.technologies && (
              <div className="mt-4 w-full text-left text-sm text-amber-300">
                {card.technologies}
              </div>
            )}
            {card.githubUrl && (
              <div className="flex w-full justify-end">
                <div className="text-primary flex cursor-pointer items-end gap-2">
                  <a
                    href={card.githubUrl}
                    target="blank"
                    rel="noreferrer noopener"
                    title='Go to "My personal website" repository'
                    className="transition-all hover:text-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="16"
                      width="16"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                      />
                    </svg>
                  </a>
                  <a
                    href={card.projectUrl}
                    target="blank"
                    rel="noreferrer"
                    title="View finished project"
                    className="transition-all hover:text-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="18"
                      width="18"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
