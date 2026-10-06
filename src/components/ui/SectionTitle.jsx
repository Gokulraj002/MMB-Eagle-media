// "OUR FILMS" + short red rule beneath.
export default function SectionTitle({ children, as: Tag = 'h2', className = '', rule = true }) {
  return (
    <div className={className}>
      <Tag className="section-title text-bone lg:whitespace-nowrap">{children}</Tag>
      {rule && <span className="title-rule" />}
    </div>
  )
}
