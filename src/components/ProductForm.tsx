// src/components/ProductForm.tsx
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import CreatableSelect from "react-select/creatable";
import { Button, Form, Container, Row, Col, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Define the schema
const schema = z.object({
  productTitle: z.string().min(1, "Product title is required"),
  productDescription: z.string().optional(),
  productBullets: z.array(z.object({ value: z.string() })).optional(),
  productKeywords: z.array(z.string()).optional(),
});

// Define the types
type FormData = z.infer<typeof schema>;

// // Define a specific type for the product bullets field
// type ProductBullet = {
//   id: string;
//   value: string;
// };

interface SelectOption {
  label: string;
  value: string;
}

const selectOptions: SelectOption[] = [];

const ProductForm: React.FC = () => {
  const { control, handleSubmit, register, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productTitle: "",
      productDescription: "",
      productBullets: [],
      productKeywords: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "productBullets",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="productTitle">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            {...register("productTitle")}
            placeholder="Enter product title"
          />
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Controller
            name="productDescription"
            control={control}
            render={({ field }) => <ReactQuill {...field} />}
          />
        </Form.Group>

        <Form.Group controlId="productBullets">
          <Form.Label>Product Bullets</Form.Label>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="productBullets">
              {(provided) => (
                <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((item, index) => (
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
                        >
                          <Row>
                            <Col>
                              <Form.Control
                                {...register(
                                  `productBullets.${index}.value` as const
                                )}
                                defaultValue={item.value}
                              />
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
                  ))}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
          </DragDropContext>
          <Button variant="primary" onClick={() => append({ value: "" })}>
            Add Bullet
          </Button>
        </Form.Group>

        <Form.Group controlId="productKeywords">
          <Form.Label>Product Keywords</Form.Label>
          <Controller
            name="productKeywords"
            control={control}
            render={() => (
              <CreatableSelect
                isMulti
                options={selectOptions}
                onChange={(value) => {
                  setValue(
                    "productKeywords",
                    value.map((v) => v.value)
                  );
                }}
              />
            )}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
