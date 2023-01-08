import { CreativeItem, CreativeItemProps } from "./CreativeItem";
import { render, screen } from "@testing-library/react";

const defaultProps: CreativeItemProps = {
  creative: {
    id: "1",
    title: "Test Creative",
    enabled: true,
    contributors: [
      { id: "1", firstName: "John", lastName: "Doe" },
      { id: "2", firstName: "Jane", lastName: "Doe" },
    ],
    createdBy: {
      firstName: "Test-firstName",
      lastName: "Test-lastName",
    },
    lastModified: "2023-01-01T00:00:00.000Z",
    formats: [
      { width: 300, height: 250 },
      { width: 728, height: 90 },
    ],
  },
  isLast: false,
  isSelected: false,
  onEnable: () => {},
};

describe("CreativeItem", () => {
  it("should render with title, contributors and formats'", () => {
    const { container } = render(<CreativeItem {...defaultProps} />);
    expect(container).toBeVisible();

    expect(
      container.querySelector(
        `[data-testid="creative-item-${defaultProps.creative.id}"]`
      )
    ).toBeVisible();

    const title = container.querySelector("h6");
    expect(title).toHaveTextContent(defaultProps.creative.title);
    expect(title).toHaveStyle("font-weight: 500");

    const contributors = screen.getAllByTestId(/^avatar-/);
    expect(contributors).toHaveLength(
      defaultProps.creative.contributors.length
    );
    expect(contributors[0]).toHaveTextContent(
      `${defaultProps.creative.contributors[0]?.firstName[0]}${defaultProps.creative.contributors[0]?.lastName[0]}`
    );

    const formats = screen.getAllByTestId(/^format-/);
    expect(formats).toHaveLength(defaultProps.creative.formats.length);
    expect(formats[0]).toHaveTextContent(
      `${defaultProps.creative.formats[0]?.width} / ${defaultProps.creative.formats[0]?.height}`
    );
  });

  it("should render with bold title if selected", () => {
    const { container } = render(
      <CreativeItem {...defaultProps} isSelected={true} />
    );

    const title = container.querySelector("h6");
    expect(title).toHaveStyle("font-weight: 700");
  });

  it("should call onEnable when click on switch", () => {
    const onEnable = jest.fn();
    render(<CreativeItem {...defaultProps} onEnable={onEnable} />);

    const switchButton = screen.getByTestId("active-switch");
    switchButton.click();

    expect(onEnable).toHaveBeenCalled();
  });
});
