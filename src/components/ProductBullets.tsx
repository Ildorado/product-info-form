import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import {
  useFieldArray,
  UseFormRegister,
  Control,
  FieldErrors,
} from "react-hook-form";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FormData } from "../types/formTypes";

interface ProductBulletsProps {
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const ProductBullets: React.FC<ProductBulletsProps> = ({
  control,
  register,
  errors,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "productBullets",
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Product Bullets</Form.Label>
      <DragDropContext onDragEnd={onDragEnd}>
        {isMounted && (
          <Droppable droppableId="droppable-productBullets">
            {(provided) => (
              <ListGroup
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mb-3"
              >
                {fields.map((item, index) => {
                  console.log("item:", item);
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <ListGroup.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="d-flex align-items-center mb-2"
                        >
                          <Row className="w-100">
                            <Col>
                              <Form.Control
                                {...register(
                                  `productBullets.${index}.value` as const
                                )}
                                defaultValue={item.value}
                                isInvalid={
                                  !!errors.productBullets?.[index]?.value
                                }
                              />
                              {errors.productBullets?.[index]?.value && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.productBullets[index]?.value?.message}
                                </Form.Control.Feedback>
                              )}
                            </Col>
                            <Col xs="auto">
                              <Button
                                variant="danger"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ListGroup>
            )}
          </Droppable>
        )}
      </DragDropContext>
      <Button variant="primary" onClick={() => append({ value: "" })}>
        Add Bullet
      </Button>
    </Form.Group>
  );
};

export default ProductBullets;
