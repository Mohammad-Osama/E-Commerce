import { NativeSelect, TextInput } from '@mantine/core';

const data = [
  { value: 'egp', label: '🇪🇬 EGP' },
  { value: 'eur', label: '🇪🇺 EUR' },
  { value: 'usd', label: '🇺🇸 USD' },
  { value: 'cad', label: '🇨🇦 CAD' },
  { value: 'gbp', label: '🇬🇧 GBP' },
  { value: 'aud', label: '🇦🇺 AUD' },
];


interface InputPriceProps {
  priceData : number
  currencyData :string
  formFuncPrice: (input: number) => void
  formFuncCurrency: (input: string) => void
}
export default function InputPrice(
    { priceData, currencyData, formFuncPrice, formFuncCurrency } :InputPriceProps
    ) {
  const select = (
    <NativeSelect
      data={data}
      value={currencyData}
      onChange={(event) => formFuncCurrency(event.currentTarget.value)}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );

  return (
    <div style={{ width: '100%' }}>
      <TextInput
        type="number"
        placeholder="1000"
        label="Product Price"
        value={priceData}
        onChange={(event) => formFuncPrice(event.currentTarget.value as unknown as number)}
        rightSection={select}
        rightSectionWidth={92}
      />
    </div>
  );
}
