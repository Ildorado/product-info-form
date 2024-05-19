import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormData } from '../../types/formTypes';
import ProductTitle from '../ProductTitle';

const renderProductTitle = (errors = {}) => {
  const Wrapper: React.FC = () => {
    const methods = useForm<FormData>();
    return (
      <FormProvider {...methods}>
        <ProductTitle register={methods.register} errors={errors} />
      </FormProvider>
    );
  };
  
  render(<Wrapper />);
};

test('renders ProductTitle component', () => {
  renderProductTitle();
  expect(screen.getByLabelText(/Product Title/i)).toBeInTheDocument();
});

test('displays error message when title is missing', () => {
  renderProductTitle({ productTitle: { message: 'Product title is required' } });
  expect(screen.getByText(/Product title is required/i)).toBeInTheDocument();
});
