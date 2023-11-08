import {render, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';

import Home from '../src/components/Home';
import FormSimple from '../src/components/FormSimple';

describe('Unit testing React components', () => {
  describe('Form simple', () => {
    let text;
    const props = {};

    beforeEach(() => {
      text = render(<FormSimple />);
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
      expect(forms[0].previousSibling).toHaveTextContent('What were your average medical expenses in 2023?')
      expect(forms[0].nextSibling).toHaveTextContent('What were your average medical expenses in 2022?')
      expect(forms[1].nextSibling).toHaveTextContent('What were your average medical expenses in 2021?')
    })

    test('Contains a submit button', async () => {
      const button = await screen.findAllByRole('button')
      expect(button.length).toBe(1);
    });

    test('Functions are invoked on click', async () => {
    });

    // test('Snapshot test', () => {
    //   expect(text).toMatchSnapshot();
    // })
  });
});
