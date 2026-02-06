export default function ResultCard(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <div className="stack tight">{props.children}</div>
    </div>
  );
}
