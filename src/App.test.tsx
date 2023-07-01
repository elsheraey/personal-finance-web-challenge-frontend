import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { login } from "./api/auth";
import App from "./App";
import { setAccessToken, setIsLoggedIn, setRefreshToken } from "./store/auth";
import { calculateMonthlyAmount } from "./utils";

// NOTE: Remaining month are calculated by the number of months between the current date and the goal date which is at the beginning of the month.
describe("calculateMonthlyAmount", () => {
  test("should calculate the correct monthly amount for the example scenario", () => {
    const totalAmount = 30000;
    const currentDate = new Date("2023-10-01");
    const goalDate = new Date("2025-10-01");

    const result = calculateMonthlyAmount(totalAmount, currentDate, goalDate);

    expect(result).toBe(1250);
  });

  test("should return 0 when goal date is in the past or current month", () => {
    const totalAmount = 1000;
    const currentDate = new Date("2023-07-01");
    const goalDate = new Date("2023-06-01");
    const result = calculateMonthlyAmount(totalAmount, currentDate, goalDate);
    expect(result).toBe(0);
  });

  test("should handle cases where the goal date is in the same year as the current date", () => {
    const totalAmount = 5000;
    const currentDate = new Date("2023-07-01");
    const goalDate = new Date("2023-12-01");
    const result = calculateMonthlyAmount(totalAmount, currentDate, goalDate);
    expect(result).toBe(1000);
  });
});

// Mock the API functions
jest.mock("./api/auth", () => ({
  login: jest.fn(),
}));

// Create a mock Redux store
// NOTE: We're not testing reducer behaviors
const mockStore = configureStore([]);

describe("Check for landing page login and register buttons", () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: false,
        accessToken: "",
        refreshToken: "",
      },
    });
  });

  test("Home page login button", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  test("Home page register button", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("register-button")).toBeInTheDocument();
  });
});

describe("Login", () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: false,
        accessToken: "",
        refreshToken: "",
      },
    });
  });

  test("submits the form and dispatches the login action", async () => {
    // Mock the API response
    const mockAccessToken = "mockAccessToken";
    const mockRefreshToken = "mockRefreshToken";

    (login as jest.Mock).mockResolvedValueOnce({
      data: {
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken",
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("login-button"));

    fireEvent.change(screen.getByTestId("login-email-input"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByTestId("login-password-input"), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("login-submit-button"));
    });

    // Assert that the login API function was called with the correct arguments
    expect(login).toHaveBeenCalledWith("test@example.com", "password123");

    // Assert that the Redux actions were dispatched
    expect(store.getActions()).toEqual([
      setIsLoggedIn(true),
      setAccessToken(mockAccessToken),
      setRefreshToken(mockRefreshToken),
    ]);

    // REFACTOR: Override render to do the following behavior in one go

    // Manually update the store
    store = mockStore({
      auth: {
        isLoggedIn: true,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      },
    });

    // Re-render
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId("home-title")).toBeInTheDocument();
  });
});
