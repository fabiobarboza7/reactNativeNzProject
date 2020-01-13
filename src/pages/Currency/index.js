import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { conversion } from '../../services/currency.service';
import {
  LabelText,
  Amount,
  ExchangeInput,
  ExchangeButton,
  ExchangeButtonText,
} from './currency.styles';

export default function Currency() {
  const [amount, setAmount] = useState(1);
  const [conversionNz, setConversionNz] = useState({ rates: { NZD: 0 } });
  const [conversionBrl, setConversionBrl] = useState({ rates: { BRL: 0 } });
  const [currency, setCurrency] = useState(['BRL', 'NZD']);

  function handleConvertionResult() {
    if (currency[0] === 'BRL') {
      return conversionNz.rates.NZD.toFixed(2);
    }
    return conversionBrl.rates.BRL.toFixed(2);
  }

  function handleSetAmount(e) {
    setAmount(e);
  }

  function handleExchangeCurrency() {
    if (currency[0] === 'BRL') {
      setCurrency(['NZD', 'BRL']);
    } else {
      setCurrency(['BRL', 'NZD']);
    }
  }

  useEffect(() => {
    async function loadConvertion() {
      const data = await conversion(amount, currency[0], currency[1]);
      if (currency[0] === 'BRL') {
        setConversionNz(data);
      } else {
        setConversionBrl(data);
      }
    }

    loadConvertion();
  }, [amount, currency]);

  return (
    <View>
      <LabelText>
        Quantidade:
        <Amount>
          {currency[0]} {amount}
        </Amount>
      </LabelText>
      <ExchangeInput
        inlineImageLeft="search_icon"
        keyboardType="numeric"
        onChangeText={e => handleSetAmount(e)}
        value={amount.toString()}
      />
      <ExchangeButton onPress={handleExchangeCurrency}>
        <ExchangeButtonText>Inverter</ExchangeButtonText>
      </ExchangeButton>
      <LabelText>
        Vale:{' '}
        <Amount>
          {currency[1]} {handleConvertionResult()}
        </Amount>
      </LabelText>
    </View>
  );
}
