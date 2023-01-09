import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Creative } from '../../interfaces/creative';
import { CreativeForm, CreativeFormProps } from './CreativeForm';

const testCreative: Creative = {
  id: '1',
  title: 'Creative title',
  enabled: true,
  description: 'Creative description',
  content: 'Creative content',
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

const defaultProps: CreativeFormProps = {
  creative: testCreative,
  onCancel: () => {},
  onSave: () => {},
  onDelete: () => {},
};

describe('CreativeForm', () => {
  it('should render with creative', () => {
    const { container } = render(<CreativeForm {...defaultProps} />);
    expect(container).toBeVisible();

    const titleInput = screen.getByTestId('title-input').querySelector('input');
    expect(titleInput).toHaveValue(testCreative.title);
    expect(titleInput).toBeRequired();

    const descriptionInput = screen.getByTestId('description-input').querySelector('textarea');
    expect(descriptionInput).toHaveValue(testCreative.description);

    const contentInput = screen.getByTestId('content-input').querySelector('textarea');
    expect(contentInput).toHaveValue(testCreative.content);

    const activeSwitch = screen.getByTestId('active-switch');
    expect(activeSwitch).toHaveClass('Mui-checked');

    const formatChips = screen.getAllByTestId('format-chip');
    expect(formatChips).toHaveLength(2);
  });

  it('should call onSave when save button is clicked', async () => {
    const onSave = jest.fn();
    const { container } = render(<CreativeForm {...defaultProps} onSave={onSave} />);
    expect(container).toBeVisible();

    const saveButton = screen.getByTestId('save-creative-button');
    act(() => {
      saveButton.click();
    });

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        ...testCreative,
        lastModified: expect.any(String),
      });
    });
  });

  it('should update all fields when submit', async () => {
    const onSave = jest.fn();
    const { container } = render(<CreativeForm {...defaultProps} onSave={onSave} />);
    expect(container).toBeVisible();

    const titleInput = screen.getByTestId('title-input').querySelector('input');

    if (titleInput) {
      fireEvent.change(titleInput, { target: { value: 'new title' } });
    }

    const descriptionInput = screen.getByTestId('description-input').querySelector('textarea');

    if (descriptionInput) {
      fireEvent.change(descriptionInput, {
        target: { value: 'new description' },
      });
    }

    const contentInput = screen.getByTestId('content-input').querySelector('textarea');

    if (contentInput) {
      fireEvent.change(contentInput, { target: { value: 'new content' } });
    }

    const switchButton = screen.getByTestId('active-switch').querySelector('input');
    act(() => {
      if (switchButton) switchButton.click();
    });

    const saveButton = screen.getByTestId('save-creative-button');
    act(() => {
      saveButton.click();
    });

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        ...testCreative,
        title: 'new title',
        description: 'new description',
        content: 'new content',
        lastModified: expect.any(String),
        enabled: false,
      });
    });
  });

  it('should call onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    render(<CreativeForm {...defaultProps} onCancel={onCancel} />);

    const cancelButton = screen.getByTestId('cancel-creative-button');
    cancelButton.click();
    expect(onCancel).toHaveBeenCalled();
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<CreativeForm {...defaultProps} onDelete={onDelete} />);

    const deleteButton = screen.getByTestId('delete-creative-button');
    deleteButton.click();
    expect(onDelete).toHaveBeenCalledWith(testCreative.id);
  });
});
