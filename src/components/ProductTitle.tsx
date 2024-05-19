import React from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "../types/formTypes";

interface ProductTitleProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const ProductTitle: React.FC<ProductTitleProps> = ({ register, errors }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Product Title</Form.Label>
      <Form.Control
        {...register("productTitle")}
        placeholder="Enter product title"
        isInvalid={!!errors.productTitle}
      />
      {errors.productTitle && (
        <Form.Control.Feedback type="invalid">
          {errors.productTitle.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default ProductTitle;
