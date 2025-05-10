"use client"

export default function CodeExample({ code }) {
  // you CAN now use hooks here if you want
  return (
    <pre style={{ background: '#f5f5f5', padding: '1rem', overflowX: 'auto' }}>
      <code>{code.trim()}</code>
    </pre>
  )
}
