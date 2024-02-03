import React from "react";
import { render } from "@testing-library/react-native";
import MainBackgroundImage from "../components/background";

describe("MainBackgroundImage", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<MainBackgroundImage />);
    const backgroundImage = getByTestId("background-image");
    expect(backgroundImage).toBeTruthy();
  });
});