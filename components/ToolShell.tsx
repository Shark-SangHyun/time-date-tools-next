export default function ToolShell(props: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="stack">
      <div className="stack tight">
        <h1>{props.title}</h1>
        {props.subtitle ? <p className="muted">{props.subtitle}</p> : null}
      </div>
      {props.children}
    </section>
  );
}
