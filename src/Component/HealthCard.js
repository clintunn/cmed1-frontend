import React from "react";
import { Card } from "react-bootstrap";


function HealthCard({title, data, unit}) {
  return (
    <Card className="mb-3">
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                <h3 className="display-4">{data} {unit}</h3>
            </Card.Text>
        </Card.Body>
    </Card>
  );
}

export default HealthCard;
