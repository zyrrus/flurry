interface Props {
  children?: unknown;
}

export default function Json({ children }: Props) {
  return <pre>{JSON.stringify(children, undefined, 2)}</pre>;
}
