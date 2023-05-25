import Container from "../Container/Container";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <section className="border-b-slate-600 border-b ">
        <Container>
          <Link href="/">Logo</Link>
        </Container>
      </section>
    </>
  );
}
