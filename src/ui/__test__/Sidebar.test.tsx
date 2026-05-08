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

// Мокаємо хук, щоб не було проблем з медіа-запитами в JSDOM
vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

describe("Sidebar Component", () => {
  it("має змінювати стан (expanded/collapsed) при кліку на тригер", () => {
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

    // Шукаємо через селектор атрибута, бо це надійніше для data-slot
    const sidebar = container.querySelector('[data-slot="sidebar"]');
    expect(sidebar?.getAttribute("data-state")).toBe("expanded");

    const toggle = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggle);

    expect(sidebar?.getAttribute("data-state")).toBe("collapsed");
  });

  it("має відображати внутрішній контент", () => {
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
