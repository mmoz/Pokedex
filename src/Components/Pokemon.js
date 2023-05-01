import { useState,useEffect } from 'react';

const Pokemon = ({sprites, name, stats,page}) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };
  useEffect(() => {
      setFlipped(false);
    
  }, [page]);

  return (
    <div className={flipped ? "box" : "box flipped"} onClick={handleClick}>
      <div className="card">
        <div className="card-face card-front">
          <div className="card-body">
            <div className={flipped ? "title-flip" : "title"} >
            <img src={sprites?.front_default} alt={name} className={flipped ? "visible" : ""} />
              <h3>{name}</h3>
            </div>
          </div>
        </div>
        {flipped && (
          <div className="card-face card-back">
            <h4>Stats:</h4>
            {stats && stats.length > 0 ? (
              <ul className="stats-list">
                {stats.map(stat => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No stats available.</p>
            )}
          </div>

        )}
      </div>
    </div>
  );
}

export default Pokemon;
