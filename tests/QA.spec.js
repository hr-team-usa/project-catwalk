import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from '../pages/index';
import QAs from '../components/QAs-Malcolm/QAs';
import Q from '../components/QAs-Malcolm/components/Q';
import AddQuestion from '../components/QAs-Malcolm/components/AddQuestion';

xdescribe('QAs test suite', () => {
  it('runs a basic jest test', () => {
    expect(true).toEqual(true);
  });

  it('renders three <QAs /> components', () => {
    const mockUseEffect = jest.fn();
    React.useEffect = mockUseEffect;
    const question = {
      product_id: '18445',
      results: [
        {
          question_id: 117660,
          question_body: 'Reprehenderit ut quibusdam qui.',
          question_date: '2020-06-17T00:00:00.000Z',
          asker_name: 'Cody.Boehm',
          question_helpfulness: 28,
          reported: false,
          answers: {
            1113852: {
              id: 1113852,
              body: 'Quos at aperiam dignissimos.',
              date: '2021-02-17T00:00:00.000Z',
              answerer_name: 'Zion.Casper',
              helpfulness: 7,
              photos: [],
            },
          },
        }],
    };

    const answers = {
      answers: {
        1113852: {
          id: 1113852,
          body: 'Quos at aperiam dignissimos.',
          date: '2021-02-17T00:00:00.000Z',
          answerer_name: 'Zion.Casper',
          helpfulness: 7,
          photos: [],
        },
        1113852: {
          id: 1113852,
          body: 'Quos at aperiam dignissimos.',
          date: '2021-02-17T00:00:00.000Z',
          answerer_name: 'Zion.Casper',
          helpfulness: 7,
          photos: [],
        },
      },
    };

    const wrapper = mount(<Q question={question} answers={answers} />);
    const children = wrapper.find('div#questionsContainer');
    expect(children).toHaveLength(4);
  });
});
