interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header style={{
      padding: '20px 0',
      marginBottom: '40px',
      borderBottom: '1px solid #eee'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>{title}</h1>
        </a>
      </div>
    </header>
  )
}
