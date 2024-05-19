import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import ProductDescription from '../ProductDescription';
import { FormData } from '../../types/formTypes';

const renderProductDescription = () => {
  const Wrapper: React.FC = () => {
    const methods = useForm<FormData>();
    return (
      <FormProvider {...methods}>
        <ProductDescription control={methods.control} />
      </FormProvider>
    );
  };

  render(<Wrapper />);
};

test('renders ProductDescription component', () => {
  renderProductDescription();
  expect(screen.getByText(/Product Description/i)).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
