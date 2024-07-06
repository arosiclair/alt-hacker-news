import { CSSProperties } from 'react';
import spacing from './spacing';

type DebugJSONProps = {
  children: any;
};

export default function DebugJSON({ children }: DebugJSONProps) {
  const style: CSSProperties = {
    backgroundColor: 'lightgray',
    padding: spacing(2),
    margin: spacing(2),
    overflow: 'hidden',
  };
  return <pre style={style}>{JSON.stringify(children, null, 4)}</pre>;
}
