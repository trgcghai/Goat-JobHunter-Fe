import React, { useState } from 'react';
import { ReportReason } from '@/types/enum';
import { da } from 'date-fns/locale';
import { useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
interface ReportFormInput {
  reason: ReportReason;
  description: string;
}

const ReportTicketDialog = ({ isOpen, onClose }: Props) => {
  const [reason, setReason] = useState<string>('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return setError('Vui lòng chọn một lý do báo cáo.');

    if (reason === ReportReason.OTHER && !description.trim()) {
      return setError('Vui lòng nhập mô tả chi tiết cho lý do khác.');
    }
    const finalDescription = reason === ReportReason.OTHER ? description : `Báo cáo: ${reason}`;

    console.log('Payload chuẩn bị gửi:', {
      type: localStorage.getItem('selectedReportType'),
      id: localStorage.getItem('selectedReportItem'),
      reason: reason,
      description: finalDescription,
    });

    onClose();
    setReason('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[450px]">
        <h3 className="text-lg font-bold mb-4">Báo cáo vi phạm</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground mb-2">Chọn lý do:</p>
            {Object.entries(ReportReason).map(([key, value]) => (
              <label
                key={key}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  reason === value ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent'
                }`}
              >
                <input
                  type="radio"
                  name="reportReason"
                  value={value}
                  checked={reason === value}
                  onChange={() => {
                    setReason(value as ReportReason);
                    setError('');
                  }}
                  className="w-4 h-4 text-primary"
                />
                <span className="ml-3 text-sm font-medium">{value}</span>
              </label>
            ))}
          </div>
          <div
            className={`transition-all duration-300 ${reason === ReportReason.OTHER ? 'opacity-100' : 'opacity-50'}`}
          >
            <label className="block text-sm font-medium mb-2">
              Mô tả chi tiết {reason === ReportReason.OTHER && <span className="text-red-500">*</span>}
            </label>
            <textarea
              className="w-full border border-border bg-background p-3 rounded-lg h-24 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder={
                reason === ReportReason.OTHER ? 'Vui lòng mô tả rõ vi phạm...' : 'Thông tin bổ sung (không bắt buộc)'
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={reason !== '' && reason !== ReportReason.OTHER}
            />
          </div>
          {error && <p className="text-red-500 text-xs font-medium italic">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors shadow-sm"
            >
              Gửi báo cáo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportTicketDialog;
