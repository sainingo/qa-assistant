import { render, screen } from "@testing-library/react";

import { describe, it, vi } from 'vitest'

import App from "../src/App";
import { AppContext } from "../src/context/AppContext";

describe("Renders App component", () => {
  it("renders the App", () => {
    render(<App />);
    screen.debug();
  });
});

describe("App component", () => {
  test("provides context value to Home component", () => {
    const patients = [{ id: "1", name: "John Doe" }];
    const patientData = [{ id: "1", gender: "male" }];
    const searchPatient = vi.fn();
    render(
      <AppContext.Provider value={{ patients:[] as any, patientData:[] as any, searchPatient }}>
          <App />
      </AppContext.Provider>
    );

    const appContextValue = screen.getByTestId("app-context-value");
    expect(appContextValue).toBeInTheDocument();
    expect(appContextValue).toHaveTextContent(
      JSON.stringify({ patients, patientData})
    );
  });
});
