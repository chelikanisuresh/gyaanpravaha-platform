import { Child } from '@/hooks/useChildren'

interface ChildTabsProps {
  children: Child[]
  selectedId: string
  onSelect: (id: string) => void
}

export default function ChildTabs({ children, selectedId, onSelect }: ChildTabsProps) {
  if (children.length <= 1) return null

  return (
    <div style={{ display: 'flex', gap: '4px', background: '#F3F4F6', borderRadius: '10px', padding: '4px', width: 'fit-content', marginBottom: '20px' }}>
      {children.map(child => {
        const isActive = child.id === selectedId
        return (
          <button
            key={child.id}
            onClick={() => onSelect(child.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '8px 16px', borderRadius: '8px', border: 'none',
              cursor: 'pointer', transition: 'all 0.15s',
              background: isActive ? '#2D6A4F' : 'transparent',
              color: isActive ? 'white' : '#6B7280',
              fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px',
            }}
          >
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: isActive ? '#74C69D' : '#D8F3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '11px', color: '#1B4332', flexShrink: 0 }}>
              {child.full_name.charAt(0)}
            </div>
            {child.full_name.split(' ')[0]}
          </button>
        )
      })}
    </div>
  )
}
