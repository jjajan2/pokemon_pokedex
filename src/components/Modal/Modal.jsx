import "./Modal.css";

function Modal({ isShow, data, onClose }) {
  console.log(data);

  const statInfo = {
    hp: data.infoData.stats.find((stat) => stat.stat.name === "hp")?.base_stat,
    attack: data.infoData.stats.find((stat) => stat.stat.name === "attack")
      ?.base_stat,
    defense: data.infoData.stats.find((stat) => stat.stat.name === "defense")
      ?.base_stat,
    specialAttack: data.infoData.stats.find(
      (stat) => stat.stat.name === "special-attack"
    )?.base_stat,
    specialDefense: data.infoData.stats.find(
      (stat) => stat.stat.name === "special-defense"
    )?.base_stat,
    speed: data.infoData.stats.find((stat) => stat.stat.name === "speed")
      ?.base_stat,
  };

  return (
    <div className="modal">
      {isShow && data ? (
        <div className="modal_inner">
          <button onClick={onClose} className="close_button">
            x
          </button>
          <div className="pokemon_info">
            <div className="img">
              <img src={data.gifUrl} alt={data.name} />
            </div>
            <span>No. {data.id}</span>
            <h4>{data.name}</h4>
            <p>
              {
                data.koreanData.flavor_text_entries.findLast(
                  (text) => text.language.name === "ko"
                ).flavor_text
              }
            </p>
            <div className="pokemon_size">
              <p>키 : {data.infoData.height / 10}m</p>
              <p>몸무게 : {data.infoData.weight / 10}kg</p>
            </div>
          </div>
          <div className="pokemon_stat">
            <p>HP : {statInfo.hp}</p>
            <p>공격력 : {statInfo.attack}</p>
            <p>방어력 : {statInfo.defense}</p>
            <p>스페셜 어택 : {statInfo.specialAttack}</p>
            <p>스페셜 디펜스 : {statInfo.specialDefense}</p>
            <p>스피드 : {statInfo.speed}</p>
          </div>
        </div>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default Modal;
