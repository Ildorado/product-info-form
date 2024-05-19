import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import ProductBullets from "../ProductBullets";
import { FormData } from "../../types/formTypes";

const renderProductBullets = () => {
  const Wrapper: React.FC = () => {
    const methods = useForm<FormData>();
    return (
      <FormProvider {...methods}>
        <ProductBullets
          control={methods.control}
          register={methods.register}
          errors={{}}
        />
      </FormProvider>
    );
  };

  render(<Wrapper />);
};

test("renders ProductBullets component", () => {
  renderProductBullets();
  expect(screen.getByText(/Product Bullets/i)).toBeInTheDocument();
});

test("adds and removes a bullet", () => {
  renderProductBullets();
  fireEvent.click(screen.getByText(/Add Bullet/i));
  expect(screen.getAllByRole("textbox").length).toBe(1);

  fireEvent.click(screen.getByText(/Remove/i));
  expect(screen.queryByRole("textbox")).toBeNull();
});
