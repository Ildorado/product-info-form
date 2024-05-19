// hooks
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { Button, Form, Container } from "react-bootstrap";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductBullets from "./ProductBullets";
import ProductKeywords from "./ProductKeywords";

// css
import "../styles/ProductForm.css";
import "bootstrap/dist/css/bootstrap.min.css";

// types
import { SelectOption, schema, FormData } from "../types/formTypes";

const selectOptions: SelectOption[] = [];

const ProductForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productTitle: "",
      productDescription: "",
      productBullets: [],
      productKeywords: [],
    },
  });

  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      console.log(data);
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage("Form submitted successfully");
    } catch (error) {
      setMessage("Form submission failed");
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
    []
  );

  return (
    <Container className="mt-4">
      {message && (
        <div
          className={`alert ${
            message.includes("success") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
      <Form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        <ProductTitle register={register} errors={errors} />
        <ProductDescription control={control} />
        <ProductBullets control={control} register={register} errors={errors} />
        <ProductKeywords
          control={control}
          setValue={setValue}
          options={selectOptions}
        />
        <Button variant="success" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
