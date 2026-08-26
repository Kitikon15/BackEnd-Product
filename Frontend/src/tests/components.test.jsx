import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toast from '../components/common/Toast';
import ConfirmModal from '../components/common/ConfirmModal';

// ─── Toast Tests ──────────────────────────────────────────────────────────────
describe('Toast Component', () => {
  it('should not render when toast is null', () => {
    const { container } = render(<Toast toast={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render success toast with correct message', () => {
    render(<Toast toast={{ type: 'success', message: 'เพิ่มสินค้าสำเร็จ' }} />);
    expect(screen.getByText('เพิ่มสินค้าสำเร็จ')).toBeInTheDocument();
  });

  it('should render error toast with correct message', () => {
    render(<Toast toast={{ type: 'error', message: 'เกิดข้อผิดพลาด' }} />);
    expect(screen.getByText('เกิดข้อผิดพลาด')).toBeInTheDocument();
  });

  it('should have correct color class for success type', () => {
    const { container } = render(<Toast toast={{ type: 'success', message: 'ok' }} />);
    const el = container.firstChild;
    expect(el.className).toContain('emerald');
  });

  it('should have correct color class for error type', () => {
    const { container } = render(<Toast toast={{ type: 'error', message: 'fail' }} />);
    const el = container.firstChild;
    expect(el.className).toContain('red');
  });
});

// ─── ConfirmModal Tests ───────────────────────────────────────────────────────
describe('ConfirmModal Component', () => {
  const defaultProps = {
    isOpen: true,
    productName: 'iPhone 15 Pro',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    loading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(<ConfirmModal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render product name in modal', () => {
    render(<ConfirmModal {...defaultProps} />);
    expect(screen.getByText(/"iPhone 15 Pro"/)).toBeInTheDocument();
  });

  it('should show dialog title', () => {
    render(<ConfirmModal {...defaultProps} />);
    expect(screen.getByText('ยืนยันการลบสินค้า')).toBeInTheDocument();
  });

  it('should call onConfirm when confirm button clicked', async () => {
    render(<ConfirmModal {...defaultProps} />);
    const confirmBtn = screen.getByText('ยืนยันการลบ');
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(defaultProps.onConfirm).toHaveBeenCalledOnce();
    });
  });

  it('should call onCancel when cancel button clicked', async () => {
    render(<ConfirmModal {...defaultProps} />);
    const cancelBtn = screen.getByText('ยกเลิก');
    fireEvent.click(cancelBtn);
    await waitFor(() => {
      expect(defaultProps.onCancel).toHaveBeenCalledOnce();
    });
  });

  it('should show loading state when loading=true', () => {
    render(<ConfirmModal {...defaultProps} loading={true} />);
    expect(screen.getByText('กำลังลบ...')).toBeInTheDocument();
  });

  it('should disable buttons when loading=true', () => {
    render(<ConfirmModal {...defaultProps} loading={true} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
