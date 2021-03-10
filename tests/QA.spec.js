/* eslint-disable */
import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from '../pages/index';
import QAs from '../components/QAs-Malcolm/QAs';
import Q from '../components/QAs-Malcolm/components/Q';
import AddMore from '../components/QAs-Malcolm/components/AddMore';
import AddQuestion from '../components/QAs-Malcolm/components/AddQuestion';
import QASearchBar from '../components/QAs-Malcolm/components/SearchBar';
import Questions from '../components/QAs-Malcolm/components/Questions';

describe('QAs test suite', () => {
  describe('Parent Component', () => {
    it('renders QAs component', () => {
      const wrapper = shallow(<QAs productId={1234} productName="prod name" />);
      expect(wrapper.containsMatchingElement(<QASearchBar />)).toEqual(true);
    });
    it('renders Questions component', () => {
      const wrapper = shallow(<QAs productId={1234} productName="prod name" />);
      expect(wrapper.containsMatchingElement(<Questions productId={1234} />)).toEqual(true);
    });
  });

<<<<<<< HEAD
  xdescribe('Test Add Question Button component', () => {
    it('Test click event', () => {
=======
  describe('Test Add Question Button component', () => {
    xit('Test click event', () => {
>>>>>>> 74877e5057d67deaa496531d8ef777476ee25e91
      const mockCallBack = jest.fn();
      const button = shallow((<AddQuestion
        variant="primary"
        show={false}
        onHide={() => { }}
        productId={1234}
        productName='prodname'
      />));
      // console.log(button.debug());
      let butn = button.find('.submitQBtn')
      console.log(butn.debug());
      butn.simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1); //?
    });
  });

  xdescribe('checks for input fields', () => {
    it('question fields for add question', () => {
      const wrapper = shallow((<AddQuestion
        variant="primary"
        show={false}
        onHide={() => { }}
        productId={1234}
        productName='prodname'
      />));
      expect(wrapper.find('textarea#exampleForm.ControlTextarea1')).toHaveLength(1);
    });
  });
});

// it('runs a basic jest test', () => {
//   expect(true).toEqual(true);
// });

// it('renders three <QAs /> components', () => {
//   const mockUseEffect = jest.fn();
//   React.useEffect = mockUseEffect;
//   const question = {
//     product_id: '18445',
//     results: [
//       {
//         question_id: 117660,
//         question_body: 'Reprehenderit ut quibusdam qui.',
//         question_date: '2020-06-17T00:00:00.000Z',
//         asker_name: 'Cody.Boehm',
//         question_helpfulness: 28,
//         reported: false,
//         answers: {
//           1113852: {
//             id: 1113852,
//             body: 'Quos at aperiam dignissimos.',
//             date: '2021-02-17T00:00:00.000Z',
//             answerer_name: 'Zion.Casper',
//             helpfulness: 7,
//             photos: [],
//           },
//         },
//       }],
//   };

//   const answers = {
//     answers: {
//       1113852: {
//         id: 1113852,
//         body: 'Quos at aperiam dignissimos.',
//         date: '2021-02-17T00:00:00.000Z',
//         answerer_name: 'Zion.Casper',
//         helpfulness: 7,
//         photos: [],
//       },
//       1113852: {
//         id: 1113852,
//         body: 'Quos at aperiam dignissimos.',
//         date: '2021-02-17T00:00:00.000Z',
//         answerer_name: 'Zion.Casper',
//         helpfulness: 7,
//         photos: [],
//       },
//     },
//   };

//   const wrapper = mount(<Q question={question} answers={answers} />);
//   const children = wrapper.find('div#questionsContainer');
//   expect(children).toHaveLength(4);
// });
