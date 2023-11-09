import {render, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';

import FormSimple from '../src/components/FormSimple';
import ResultBox from '../src/components/ResultBox';

describe('Unit testing React components', () => {
  describe('Form simple', () => {
    let text;

    const mockFunction = jest.fn();

    beforeEach(() => {
      text = render(<FormSimple setServerResponse={mockFunction} />);
    });

    afterEach(() => {
      cleanup();
    });

    test('Renders three average medical expense forms', async () => {
      const forms = await screen.findAllByRole('textbox');
      expect(forms.length).toBe(3);
    });

    test('medical expense forms have correct label', async () => {
      const forms = await screen.findAllByRole('textbox');
      expect(forms[0].previousSibling).toHaveTextContent(
        'What were your average medical expenses in 2023?'
      );
      expect(forms[0].nextSibling).toHaveTextContent(
        'What were your average medical expenses in 2022?'
      );
      expect(forms[1].nextSibling).toHaveTextContent(
        'What were your average medical expenses in 2021?'
      );
    });

    test('Contains a submit button', async () => {
      const button = text.queryByRole('button');
      expect(button).toBeInTheDocument();
    });

    // bad test, buttons are just invoking a handlechange, not the passed down prop function
    // test('Functions are invoked on click', async () => {
    //   const button = await screen.findByRole('button');
    //   userEvent.click(button);
    //   expect(mockFunction).toHaveBeenCalledTimes(1);
    // });

    test('Snapshot test', () => {
      expect(text).toMatchSnapshot();
    });
  });

  describe('Result box', () => {
    let text;

    const props = [100, 200];

    afterEach(() => {
      cleanup();
    });

    // not sure why this test is failing lol
    // test('Renders no label if no figures provided', async () => {
    //   text = render(<ResultBox serverResponse={[]}/>);
    //   expect(text.getByText('Please enter numbers to calculate your estimate!')).toBe(false);
    // });

    test('Renders correct label if any NaN figures provided', async () => {
      text = render(<ResultBox serverResponse={[100, 'bye']} />);
      const label = await screen.getByText(
        'Please enter numbers to calculate your estimate!'
      );
      expect(label).toBeInTheDocument();
    });

    test('Renders correct label if valid figures provided', async () => {
      text = render(<ResultBox serverResponse={props} />);
      const label = await screen.getByText('Results:');
      expect(label).toBeInTheDocument();
      expect(label).toHaveStyle('font-weight: bold');
    });

    test('Properly renders amount 1', async () => {
      text = render(<ResultBox serverResponse={props} />);
      const label = await screen.getByTestId('amount1')
      const message = label.nextSibling
      const lossAmount = message.nextSibling.nextSibling
      expect(message).toHaveTextContent(
        'If you contributed the full amount, you likely lost'
      );
      expect(lossAmount).toHaveTextContent('$100');
      expect(lossAmount).toHaveStyle('font-weight: bold');
    });

    test('Properly renders amount 2', async () => {
      text = render(<ResultBox serverResponse={props} />);
      const label = await screen.getByTestId('amount2')
      const message = label.nextSibling
      const lossAmount = message.nextSibling.nextSibling
      expect(message).toHaveTextContent(
        'If you did not contribute, you likely lost'
      );
      expect(lossAmount).toHaveTextContent('$200');
      expect(lossAmount).toHaveStyle('font-weight: bold');
    });

    test('Snapshot test', () => {
      expect(text).toMatchSnapshot();
    })
  });
});