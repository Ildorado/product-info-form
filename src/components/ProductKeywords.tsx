import React from "react";
import { Form } from "react-bootstrap";
import { Controller, Control, UseFormSetValue } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { FormData, SelectOption } from "../types/formTypes";

interface ProductKeywordsProps {
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
  options: SelectOption[];
}

const ProductKeywords: React.FC<ProductKeywordsProps> = ({
  control,
  setValue,
  options,
}) => {
  return (
    <Form.Group className="mb-4">
      <Form.Label htmlFor="productKeywordsInput">Product Keywords</Form.Label>
      <Controller
        name="productKeywords"
        control={control}
        render={() => (
          <CreatableSelect
            isMulti
            inputId="productKeywordsInput"
            options={options}
            onChange={(value) => {
              setValue(
                "productKeywords",
                value ? value.map((v) => v.value) : []
              );
            }}
          />
        )}
      />
    </Form.Group>
  );
};

export default ProductKeywords;
