type DebugJSONProps = {
  children: any;
};

export default function DebugJSON({ children }: DebugJSONProps) {
  return <pre>{JSON.stringify(children, null, 4)}</pre>;
}
