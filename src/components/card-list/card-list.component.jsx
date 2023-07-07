import "./card-list.styles.css";
import Card from "../card/card.component";

const CardList = ({monsters}) => (

  // instead of {monsters} can be done also as below
  // const { monsters } = props;
    <div className="card-list">
      {monsters.map((monster) => {
        return <Card monster={monster}></Card>;
      })}
    </div>
);

export default CardList;
