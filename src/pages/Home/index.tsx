import { useEffect } from "react";

interface HomeProps {
  title: string;
}

export default function Home({ title }: HomeProps) {
  useEffect(() => {
    document.title = title;
  }, []);

  debugger;

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
