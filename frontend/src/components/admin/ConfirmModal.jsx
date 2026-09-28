export default function ConfirmModal({ isOpen, title = 'Konfirmasi Hapus', message, onConfirm, onCancel, isDeleting = false }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 'var(--space-md)',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--color-surface-low)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-xl)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: 'var(--color-danger)',
            marginBottom: 'var(--space-xs)',
          }}
        >
          {title}
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: 'var(--space-xl)', lineHeight: 1.5 }}>
          {message || 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)' }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            style={{
              padding: '10px 18px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-secondary)',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-danger)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
            }}
          >
            {isDeleting ? 'MENGHAPUS...' : 'YA, HAPUS'}
          </button>
        </div>
      </div>
    </div>
  );
}
