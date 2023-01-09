import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Creative } from '../../interfaces/creative';
import { CreativeDetail, CreativeDetailProps } from './CreativeDetail';

const testCreative: Creative = {
  id: '1',
  title: 'Creative title',
  enabled: true,
  contributors: [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Doe' },
  ],
  createdBy: {
    firstName: 'Test-firstName-1',
    lastName: 'Test-lastName-1',
  },
  content: 'Creative content',
  description: 'Creative description',
  lastModified: '2023-01-01T00:00:00.000Z',
  formats: [
    { width: 300, height: 250 },
    { width: 728, height: 90 },
  ],
};

const defaultProps: CreativeDetailProps = {
  creative: testCreative,
};

const renderComponent = (props: CreativeDetailProps) => {
  return render(
    <BrowserRouter>
      <CreativeDetail {...props} />
    </BrowserRouter>,
  );
};

describe('CreativeDetail', () => {
  it('should render  with creative', () => {
    const { container } = renderComponent(defaultProps);
    expect(container).toBeVisible();

    const title = screen.getByTestId('creative-title');
    expect(title).toHaveTextContent(testCreative.title);

    const description = screen.getByTestId('creative-description');
    expect(description).toHaveTextContent('Creative description');

    const content = screen.getByTestId('creative-content');
    expect(content).toHaveTextContent('Creative content');

    const createdBy = screen.getByTestId('creative-createdBy');
    expect(createdBy).toHaveTextContent('Crée par Test-firstName-1 Test-lastName-1');

    const lastModified = screen.getByTestId('creative-lastModified');
    expect(lastModified).toHaveTextContent('Dernière modification le 1 janvier 2023');

    const contributors = screen.getAllByTestId('creative-contributor');
    expect(contributors[0]).toHaveTextContent('John Doe');

    const contributorsList = screen.getAllByTestId('creative-contributor');
    expect(contributorsList).toHaveLength(2);
  });
});
