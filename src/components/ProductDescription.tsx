import React from "react";
import { Form } from "react-bootstrap";
import { Controller, Control } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormData } from "../types/formTypes";

interface ProductDescriptionProps {
  control: Control<FormData>;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ control }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Product Description</Form.Label>
      <Controller
        name="productDescription"
        control={control}
        render={({ field }) => (
          <ReactQuill
            {...field}
            modules={{ toolbar: ["bold", "italic", "underline"] }}
            aria-label="Product Description"
          />
        )}
      />
    </Form.Group>
  );
};

export default ProductDescription;
