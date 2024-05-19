import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import ProductKeywords from "../ProductKeywords";
import { FormData, SelectOption } from "../../types/formTypes";

const selectOptions: SelectOption[] = [];

const renderProductKeywords = () => {
  const Wrapper: React.FC = () => {
    const methods = useForm<FormData>();
    return (
      <FormProvider {...methods}>
        <ProductKeywords
          control={methods.control}
          setValue={methods.setValue}
          options={selectOptions}
        />
      </FormProvider>
    );
  };

  render(<Wrapper />);
};

test("renders ProductKeywords component", () => {
  renderProductKeywords();
  expect(screen.getByLabelText(/Product Keywords/i)).toBeInTheDocument();
});
