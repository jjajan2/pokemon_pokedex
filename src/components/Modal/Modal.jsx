import "./Modal.css";
import TypeBox from "../TypeBox/TypeBox";
import StatBar from "../StatBar/StatBar";

function Modal({ isShow, data, onClose }) {
  const { id, name, gifUrl, types, koreanData, infoData } = data;

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

  console.log(gifUrl);

  return (
    <div className="modal">
      {isShow ? (
        <div className="modal_inner">
          <button onClick={onClose} className="close_button">
            x
          </button>
          <div className="pokemon_info">
            <div className="img">
              <img src={gifUrl.front_default} alt={name} />
            </div>
            <span>No.{id}</span>
            <h4 className="pokemon_name">{name}</h4>
            <div className="types">
              {types.map((type) => {
                return <TypeBox key={type.id} data={type} />;
              })}
            </div>
            <div className="pokemon_size">
              <p>키 : {infoData.height / 10}m</p>
              <p>몸무게 : {infoData.weight / 10}kg</p>
            </div>
            <p className="info_text">
              {
                koreanData.flavor_text_entries.findLast(
                  (text) => text.language.name === "ko"
                ).flavor_text
              }
            </p>
          </div>
          <div className="pokemon_stat">
            <h5>기본 능력치</h5>
            <StatBar statName={"HP"} statValue={statInfo.hp} />
            <StatBar statName={"공격력"} statValue={statInfo.attack} />
            <StatBar statName={"방어력"} statValue={statInfo.hp} />
            <StatBar
              statName={"스페셜 어택"}
              statValue={statInfo.specialAttack}
            />
            <StatBar
              statName={"스페셜 디펜스"}
              statValue={statInfo.specialDefense}
            />
            <StatBar statName={"스피드"} statValue={statInfo.speed} />
          </div>
          <div className="img_list">
            <img src={gifUrl.front_default} alt="" />
            <img src={gifUrl.front_shiny} alt="" />
            <img src={gifUrl.back_default} alt="" />
            <img src={gifUrl.back_shiny} alt="" />
          </div>
        </div>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default Modal;
