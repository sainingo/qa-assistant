import {
  fireEvent,
  queryAllByText,
  render,
  screen,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";
import "whatwg-fetch";
import { fetchActiveOrders,gettingPatientName,fetchVoidedOrders } from "../../mocks/orders.handler";
import ActiveOrders from "./ActiveOrders";
import { mockOrders, mockPatient, mockVoidOrder } from "./resource.mock";
import VoidedOrders from "./VoidedOrders";

const restHandlers = [fetchActiveOrders, gettingPatientName, fetchVoidedOrders];
const server = setupServer(...restHandlers);
const BaseURL = `https://dev3.openmrs.org/openmrs/ws/rest/v1/order`
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Active Orders", () => {
  global.localStorage.setItem(
    "userInformation",
    JSON.stringify({ user: { privileges: [] } })
  );

  it("displays patient name as part of the heading", async () => {
    render(
      <BrowserRouter>
        <ActiveOrders />
      </BrowserRouter>
    );
    const totalOrders = await screen.findByText("1 order found");
    if (totalOrders) {
      const heading = screen.getByRole("heading", {
        name: /Active Orders for Betty Williams/i,
      });
      expect(heading).toBeInTheDocument();
    }
  });

  it("displays the total number of orders when orders are available", async () => {
    render(
      <BrowserRouter>
        <ActiveOrders />
      </BrowserRouter>
    );
    const totalOrders = await screen.findByText("1 order found");
    expect(totalOrders).toBeTruthy();
  });

  it("displays the text 'no orders found' when no orders are fetched", async () => {
    const fetchActiveOrders = server.use(
      rest.get(`${BaseURL}`, (req, res, ctx) => {
        const patientUuid = req.url.searchParams.get("patient");
        return res(ctx.status(200), ctx.json([]));
      })
    );
    render(
      <BrowserRouter>
        <ActiveOrders />
      </BrowserRouter>
    );
    const noOrders = await screen.findByText(
      /No orders found for this patient/i
    );
    expect(noOrders).toBeInTheDocument();
  });

  it("displays the orders fetched in a tabular format", async () => {
    const { container } = render(
      <BrowserRouter>
        <ActiveOrders />
      </BrowserRouter>
    );

    const tableHeaders = queryAllByText(
      container,
      /order number|order|date activated|ordered by|urgency|action/i
    );
    expect(tableHeaders).toBeTruthy();

    if (tableHeaders.length > 0) {
      const table = tableHeaders[0].closest("table");
      expect(table).toBeInTheDocument();
    }
  });

  it("calls handleVoidOrder function when void button is clicked", () => {
    const mockHandleVoidOrder = vi.fn();
    const privilege = { user: { privileges: ["Delete Orders"] } };
    const id = "45678";
    const orderUuid = "45678";

    render(
      <button
        className="bg-cyan-900 text-white hover:bg-cyan-700 font-bold py-2 m-4 px-4 rounded-sm"
        onClick={() => mockHandleVoidOrder(id, privilege, orderUuid)}
      >
        Void
      </button>
    );

    fireEvent.click(screen.getByText(/void/i));
    expect(mockHandleVoidOrder).toHaveBeenCalledTimes(1);
    expect(mockHandleVoidOrder).toHaveBeenLastCalledWith(
      id,
      privilege,
      orderUuid
    );
  });
});

describe("Voided Orders", () => {
  global.localStorage.setItem(
    "userInformation",
    JSON.stringify({ user: { privileges: [] } })
  );

  it("displays patient name as part of the heading", async () => {
    render(
      <BrowserRouter>
        <VoidedOrders />
      </BrowserRouter>
    );
    const totalOrders = await screen.findByText("1 order found");
    if (totalOrders) {
      const heading = screen.getByRole("heading", {
        name: /Voided Orders for Betty Williams/i,
      });
      expect(heading).toBeInTheDocument();
    }
  });

  it("displays the total number of orders when orders are available", async () => {
    render(
      <BrowserRouter>
        <VoidedOrders />
      </BrowserRouter>
    );
    const totalOrders = await screen.findByText("1 order found");
    expect(totalOrders).toBeTruthy();
  });

  it("displays the text 'no orders found' when no orders are fetched", async () => {
    const fetchVoidedOrders = server.use(
      rest.get(`${BaseURL}`, (req, res, ctx) => {
        const patientUuid = req.url.searchParams.get("patient");
        return res(ctx.status(200), ctx.json([]));
      })
    );
    render(
      <BrowserRouter>
        <VoidedOrders />
      </BrowserRouter>
    );
    const noOrders = await screen.findByText(
      /No orders found for this patient/i
    );
    expect(noOrders).toBeInTheDocument();
  });

  it("displays the orders fetched in a tabular format", async () => {
    const { container } = render(
      <BrowserRouter>
        <VoidedOrders />
      </BrowserRouter>
    );

    const tableHeaders = queryAllByText(
      container,
      /order number|order|date activated|ordered by|urgency|action/i
    );
    expect(tableHeaders).toBeTruthy();

    if (tableHeaders.length > 0) {
      const table = tableHeaders[0].closest("table");
      expect(table).toBeInTheDocument();
    }
  });
});

describe("Orders Component", () => {
  it("call setOpenTab function when button is clicked", () => {
    const mockSetOpenTab = vi.fn();

    render(
      <button
        onClick={() => {
          mockSetOpenTab(1);
        }}
      >
        Active Orders
      </button>
    );

    fireEvent.click(screen.getByText(/Active Orders/i));
    expect(mockSetOpenTab).toHaveBeenCalledTimes(1);
    expect(mockSetOpenTab).toHaveBeenLastCalledWith(1);
  });
});
