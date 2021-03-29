import { createAppContainer } from 'react-navigation'; // 1.0.0-beta.27
import { createStackNavigator } from 'react-navigation-stack';

import LoginContainer from './login/LoginContainer';
import CourseContainer from './course/CourseContainer';
import CreateCourseContainer from './course/CreateCourseContainer';

import ClassContainer from './class/ClassContainer'
import CreateClassContainer from './class/CreateClassContainer'

import Welcome from '../components/Welcome'

const RootStack = createStackNavigator(
  {
    LoginContainer: {
      screen: LoginContainer,
    },
    Welcome: {
      screen: Welcome,
    },
    CourseContainer: {
      screen: CourseContainer,
    },
    CreateCourseContainer: {
      screen: CreateCourseContainer,
    },
    ClassContainer: {
      screen: ClassContainer,
    },
    CreateClassContainer: {
      screen: CreateClassContainer,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
