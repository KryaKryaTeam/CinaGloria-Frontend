import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../sidebar";
vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

describe("Sidebar Component", () => {
  it("should toggle state (expanded/collapsed) when trigger is clicked", () => {
    const { container } = render(
      <SidebarProvider defaultOpen={true}>
        <SidebarTrigger data-testid="sidebar-toggle" />
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Item 1</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    const sidebar = container.querySelector('[data-slot="sidebar"]');
    expect(sidebar?.getAttribute("data-state")).toBe("expanded");

    const toggle = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggle);

    expect(sidebar?.getAttribute("data-state")).toBe("collapsed");
  });

  it("should render inner content correctly", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <span data-testid="sidebar-inner-text">Sidebar Active</span>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );

    expect(screen.getByTestId("sidebar-inner-text")).toBeDefined();
  });
});
