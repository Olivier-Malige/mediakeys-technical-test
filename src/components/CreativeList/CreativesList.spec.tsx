import { render, screen } from '@testing-library/react';
import { Creative } from '../../interfaces/creative';
import { CreativesList, CreativesListProps } from './CreativesList';

const testCreative1: Creative = {
  id: '1',
  title: 'Test Creative',
  enabled: true,
  contributors: [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Doe' },
  ],
  createdBy: {
    firstName: 'Test-firstName-1',
    lastName: 'Test-lastName-1',
  },
  lastModified: '2023-01-01T00:00:00.000Z',
  formats: [
    { width: 300, height: 250 },
    { width: 728, height: 90 },
  ],
};

const testCreative2: Creative = {
  id: '2',
  title: 'Test Creative 2',
  enabled: true,
  contributors: [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Doe' },
  ],
  createdBy: {
    firstName: 'Test-firstName-2',
    lastName: 'Test-lastName-2',
  },
  lastModified: '2023-01-01T00:00:00.000Z',
  formats: [
    { width: 300, height: 250 },
    { width: 728, height: 90 },
  ],
};

const defaultProps: CreativesListProps = {
  creatives: [testCreative1, testCreative2],
  onEnable: () => {},
  selectedCreativeId: '',
  setSelectedCreative: () => null,
};

describe('CreativeList', () => {
  it('should render with creatives', () => {
    const { container } = render(<CreativesList {...defaultProps} />);
    expect(container).toBeVisible();

    const creatives = screen.getAllByTestId(/^creative-item-/);
    expect(creatives).toHaveLength(2);
  });

  it('should setSelectedCreative be called with the creative id when clicked', () => {
    const setSelectedCreative = jest.fn();
    render(<CreativesList {...defaultProps} setSelectedCreative={setSelectedCreative} />);

    const creative = screen.getByTestId('creative-item-2');
    creative.click();

    expect(setSelectedCreative).toBeCalledWith(testCreative2);
  });
});
