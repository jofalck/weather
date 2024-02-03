// import React from "react";
// import renderer from "react-test-renderer";

// import App from "../App";


// jest.mock("@react-navigation/native", () => ({
//   NavigationContainer: jest.fn(({ children }) => <>{children}</>),
// }));

// // jest.mock("@react-navigation/stack", () => ({
// //   createStackNavigator: jest.fn(() => ({
// //     Navigator: jest.fn(({ children }) => <>{children}</>),
// //     Screen: jest.fn(({ component }) => component),
// //   })),
// // }));

// jest.mock("../screens/LoginScreen", () => jest.fn());
// jest.mock("../screens/TabNavigator", () => jest.fn());

// describe("App", () => {
//   test("renders correctly", () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });