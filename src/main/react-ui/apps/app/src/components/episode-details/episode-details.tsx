import MDEditor from "@uiw/react-md-editor";
import React from 'react';
import { Link } from 'react-router-dom';
import { Episode } from 'types/episode';
import './episode-details.scss';

interface EpisodeDetailsProps {
  episode: Episode
}

export const EpisodeDetails = ({
  episode
}: EpisodeDetailsProps) => {
  return (
    <div className="episode-details">
      <img className="episode-details-thumbnail" alt="thumbnail" src={`/api/episode/${episode.id}/thumbnail`} />
      <div className="flex-grow-1">
        <h1 className="heading-main">{episode.title}</h1>
        {episode.seriesId && (
          <p><strong>Series: </strong> <Link to={`/series/${episode.seriesId}`}>{episode.seriesTitle}</Link></p>
        )}
        {episode.description && <MDEditor.Markdown source={episode.description} />}
      </div>
      <div className="side">
        <span><strong>Details</strong></span>
        <div className="mb-4">
          <div className="mb-2">
            <div>{`Release Date: ${episode.releaseDate.toLocaleDateString()}`}</div>
          </div>
          <hr />
        </div>

        {episode.links.length > 0 && (
          <>
            <span><strong>Relevant Links</strong></span>
            <div className="mb-4">
              {episode.links.map((link) => (
                <div key={link.url}>
                  <Link to={{ pathname: link.url }} target="_blank">{link.description}</Link>
                </div>
              ))}
            </div>
          </>
        )}
        
      </div>
    </div>
  )
}

export default EpisodeDetails;