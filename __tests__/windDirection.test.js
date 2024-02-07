import { getWindDirectionIcon } from "../utils/windDirection";

describe("getWindDirectionIcon", () => {
  it("should return the correct wind direction icon for each direction", () => {
    expect(getWindDirectionIcon("N")).toBe("↑");
    expect(getWindDirectionIcon("NNE")).toBe("↗");
    expect(getWindDirectionIcon("NE")).toBe("↗");
    expect(getWindDirectionIcon("ENE")).toBe("↗");
    expect(getWindDirectionIcon("E")).toBe("→");
    expect(getWindDirectionIcon("ESE")).toBe("↘");
    expect(getWindDirectionIcon("SE")).toBe("↘");
    expect(getWindDirectionIcon("SSE")).toBe("↘");
    expect(getWindDirectionIcon("S")).toBe("↓");
    expect(getWindDirectionIcon("SSW")).toBe("↙");
    expect(getWindDirectionIcon("SW")).toBe("↙");
    expect(getWindDirectionIcon("WSW")).toBe("↙");
    expect(getWindDirectionIcon("W")).toBe("←");
    expect(getWindDirectionIcon("WNW")).toBe("↖");
    expect(getWindDirectionIcon("NW")).toBe("↖");
    expect(getWindDirectionIcon("NNW")).toBe("↖");
  });

  it("should return an empty string for unknown wind directions", () => {
    expect(getWindDirectionIcon("")).toBe("");
    expect(getWindDirectionIcon("XYZ")).toBe("");

  });
});