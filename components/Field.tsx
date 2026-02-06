export function Field(props: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field">
      <div className="fieldTop">
        <span className="fieldLabel">{props.label}</span>
        {props.hint ? <span className="fieldHint">{props.hint}</span> : null}
      </div>
      {props.children}
    </label>
  );
}
