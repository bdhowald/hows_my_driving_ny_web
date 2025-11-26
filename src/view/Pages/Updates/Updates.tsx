import React, { ReactNode } from 'react'
import Card from 'react-bootstrap/Card'

import L10N from 'constants/display'

import changelogEntries from './changelogEntries/changelogEntries'

import './Updates.css'

const GITHUB_URL = 'https://github.com/bdhowald/'

type UpdateListDateEntry = {
  description: string
  commits: {
    project: string
    sha: string
  }[]
}

type UpdateListYearEntry = {
  date: string
  dateEntries: UpdateListDateEntry[]
}

type UpdateListYear = {
  year: string
  yearEntries: UpdateListYearEntry[]
}

const GithubLink = ({
  children,
  link,
}: {
  children: ReactNode
  link: string
}) => (
  <a
    className="changelog-update-link"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
)

const ApiPillBadge = () => (
  <span className="badge rounded-pill text-bg-info">api</span>
)
const SocialMediaPillBadge = () => (
  <span className="badge rounded-pill text-bg-warning">social media</span>
)
const WebPillBadge = () => (
  <span className="badge rounded-pill text-bg-secondary">web</span>
)

const Update = ({
  className,
  commits,
  description,
}: {
  className: string
  description: string
  commits: {
    project: string
    sha: string
  }[]
}) => {
  const pillBadgesForUpdate = [
    ...new Set(commits.map((commit) => commit.project)),
  ].map((project: string, index) => getPillBadgeForProject(project, index))

  return (
    <li className={className}>
      <span className="changelog-update-description">{description}</span>
      {commits.map(
        ({ project, sha }: { project: string; sha: string }, index: number) => {
          const leftBracketText = index === 0 ? '[' : ''
          const rightBracketText = index === commits.length - 1 ? ']' : ''

          const interiorText =
            commits.length === 1
              ? 'Github'
              : index < commits.length - 1
                ? `${index + 1}, `
                : `${index + 1}`

          const linkText = `${leftBracketText}${interiorText}${rightBracketText}`

          return (
            <React.Fragment key={sha}>
              <GithubLink link={getCommitLink(project, sha)}>
                {linkText}
              </GithubLink>
            </React.Fragment>
          )
        },
      )}
      {pillBadgesForUpdate}
    </li>
  )
}

const Updates = () => (
  <div className="col-md-12 updates-list-content-container">
    <div className="changelog-update-header">
      <h1>Site Updates</h1>
      <div className="changelog-update-header-description">
        {L10N.pages.updates.header.description.map((descriptionSentence) => (
          <div
            className="changelog-update-header-description-sentence"
            key={descriptionSentence.substring(0, 10)}
          >
            {descriptionSentence}
          </div>
        ))}
      </div>
    </div>
    <div className="changelog-update-list">
      {changelogEntries.map(({ year, yearEntries }: UpdateListYear) => (
        <Card className="bg-light changelog-update-year-list" key={year}>
          <details>
            <summary className="bg-light">{year}</summary>
            {yearEntries.map((yearEntry, dateIndex) => (
              <div className="changelog-update-date" key={dateIndex}>
                <h3>{yearEntry.date}</h3>
                <ul className="changelog-update-date-changelist">
                  {yearEntry.dateEntries.map((dateEntry, dateUpdateIndex) => (
                    <Update
                      className="changelog-update"
                      commits={dateEntry.commits}
                      description={dateEntry.description}
                      key={dateUpdateIndex}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </details>
        </Card>
      ))}
    </div>
  </div>
)

const getPillBadgeForProject = (project: string, index: number): ReactNode => {
  switch (project) {
    case 'hows_my_driving':
      return <SocialMediaPillBadge key={index} />
    case 'hows_my_driving_ny_api':
      return <ApiPillBadge key={index} />
    case 'hows_my_driving_ny_web':
      return <WebPillBadge key={index} />
  }

  throw Error('unknown project')
}

const getCommitLink = (project: string, sha: string) =>
  `${GITHUB_URL}/${project}/commit/${sha}`

export default Updates
