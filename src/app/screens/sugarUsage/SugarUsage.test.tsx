import AsyncStorage from '@react-native-community/async-storage';
import {
  storageKey,
  SugarUsageService,
} from '../../services/sugarUsage/SugarUsageService';
import { act, fireEvent, render } from '@testing-library/react-native';
import { AppProviders } from '../../providers/AppProviders';
import React from 'react';
import { SugarUsage } from './SugarUsage';
import { SugarUsage as SugarUsageType } from '../../services/sugarUsage/types';
import { wait } from '../../../utils/wait';

const usages: SugarUsageType[] = [
  {
    date: new Date().toISOString(),
    amount: 50,
  },
  {
    date: new Date().toISOString(),
    amount: 50,
  },
];

const renderCmp = () =>
  render(
    <AppProviders>
      <SugarUsage />
    </AppProviders>,
  );

jest.mock('moment', () => {
  const actualMoment = jest.requireActual('moment');

  return () => {
    const instance = actualMoment('2020-08-14T23:59:55.000Z');
    instance.diff = () => 3000;

    return instance;
  };
});

describe('Sugar usage screen', () => {
  beforeAll(() => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === storageKey) {
        return JSON.stringify(usages);
      }

      return null;
    });
  });

  it('should display sugar usage details', async () => {
    const cmp = renderCmp();

    const toggleDetails = await cmp.findByTestId('toggle-details');

    await act(async () => {
      fireEvent.press(toggleDetails);

      await wait(300);
    });

    const currentUsage = await cmp.findByTestId('current-usage-value');
    expect(currentUsage).toHaveTextContent('100g');

    const remainingUsage = await cmp.findByTestId('remaining-usage');
    expect(remainingUsage).toHaveTextContent('75g');
  });

  it('details should be cleaned at the end of the week', async () => {
    const spy = jest.spyOn(SugarUsageService.prototype, 'reset');

    const cmp = renderCmp();

    const toggleDetails = await cmp.findByTestId('toggle-details');

    await act(async () => {
      fireEvent.press(toggleDetails);

      await wait(100);
    });

    await wait(3000);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should handle adding new sugar usage', async () => {
    const cmp = renderCmp();
    const btn = await cmp.findByTestId('add-sugar-usage');

    await act(async () => {
      fireEvent.press(btn);

      await wait(100);
    });

    const input = await cmp.findByTestId('sugar-usage-value');

    act(() => {
      fireEvent.changeText(input, '25');
    });

    const saveUsage = await cmp.findByTestId('save-usage');

    act(async () => {
      fireEvent.press(saveUsage);

      await wait(200);
    });

    const toggleDetails = await cmp.findByTestId('toggle-details');

    await act(async () => {
      fireEvent.press(toggleDetails);

      await wait(300);
    });

    const currentUsage = await cmp.findByTestId('current-usage-value');
    expect(currentUsage).toHaveTextContent('125g');

    const remainingUsage = await cmp.findByTestId('remaining-usage');
    expect(remainingUsage).toHaveTextContent('50g');
  });
});
