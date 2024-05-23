import "./StatBar.css";

function StatBar({ statName, statValue }) {
  const fill = Math.floor((statValue / 255) * 100);

  return (
    <div className="stat">
      <span className="stat_name">{statName}</span>
      <p className="stat_value">{statValue}</p>
      <div className="stat_bar">
        <div className="stat_fill" style={{ width: `${fill}%` }}></div>
      </div>
      <p className="stat_max">255</p>
    </div>
  );
}

export default StatBar;
