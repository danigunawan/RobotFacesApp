import React from "react";
import Card from "./card";

const CardList = ({ robots }) => {
  return robots.map(robot => (
    <Card key={robot.id} id={robot.id} name={robot.name} email={robot.email} />
  ));
};

export default CardList;
